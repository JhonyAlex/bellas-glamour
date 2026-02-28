import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { featuredToggleSchema } from "@/lib/admin-validations";
import { z } from "zod";

// PATCH /api/admin/models/[id]/featured — Toggle destacado
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = await requireAdmin(request);
        if (!admin) {
            return NextResponse.json({ error: "No autorizado" }, { status: 403 });
        }

        const { id } = await params;
        const body = await request.json();
        const { featured } = featuredToggleSchema.parse(body);

        const existing = await db.profile.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json(
                { error: "Perfil no encontrado" },
                { status: 404 }
            );
        }

        const profile = await db.profile.update({
            where: { id },
            data: { featured },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json(profile);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0]?.message || "Datos inválidos" },
                { status: 400 }
            );
        }

        console.error("Admin toggle featured error:", error);
        return NextResponse.json(
            { error: "Error al cambiar destacado" },
            { status: 500 }
        );
    }
}
