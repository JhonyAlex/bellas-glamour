import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { listModelsParamsSchema } from "@/lib/admin-validations";

// GET /api/admin/models — Listar todos los modelos con paginación, búsqueda y filtros
export async function GET(request: NextRequest) {
    try {
        const admin = await requireAdmin(request);
        if (!admin) {
            return NextResponse.json({ error: "No autorizado" }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const params = listModelsParamsSchema.parse({
            page: searchParams.get("page") ?? undefined,
            limit: searchParams.get("limit") ?? undefined,
            search: searchParams.get("search") ?? undefined,
            status: searchParams.get("status") ?? undefined,
            featured: searchParams.get("featured") ?? undefined,
            sortBy: searchParams.get("sortBy") ?? undefined,
            sortOrder: searchParams.get("sortOrder") ?? undefined,
        });

        // Construir where clause
        const where: Record<string, unknown> = {};

        if (params.status !== "ALL") {
            where.status = params.status;
        }

        if (params.featured !== "all") {
            where.featured = params.featured === "true";
        }

        if (params.search) {
            const searchTerm = params.search.trim();
            where.OR = [
                { artisticName: { contains: searchTerm, mode: "insensitive" } },
                { user: { name: { contains: searchTerm, mode: "insensitive" } } },
                { user: { email: { contains: searchTerm, mode: "insensitive" } } },
                { location: { contains: searchTerm, mode: "insensitive" } },
            ];
        }

        // Construir orderBy
        const orderBy: Record<string, unknown> =
            params.sortBy === "artisticName"
                ? { artisticName: params.sortOrder }
                : { [params.sortBy]: params.sortOrder };

        const skip = (params.page - 1) * params.limit;

        const [data, total] = await Promise.all([
            db.profile.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true,
                            createdAt: true,
                        },
                    },
                    photos: {
                        take: 4,
                        select: {
                            id: true,
                            url: true,
                        },
                        orderBy: { order: "asc" },
                    },
                    _count: {
                        select: { photos: true },
                    },
                },
                orderBy,
                skip,
                take: params.limit,
            }),
            db.profile.count({ where }),
        ]);

        return NextResponse.json({
            data,
            total,
            page: params.page,
            limit: params.limit,
            totalPages: Math.ceil(total / params.limit),
        });
    } catch (error) {
        console.error("Admin list models error:", error);
        return NextResponse.json(
            { error: "Error al listar modelos" },
            { status: 500 }
        );
    }
}
