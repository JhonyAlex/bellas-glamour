import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { statusChangeSchema } from "@/lib/admin-validations";
import { z } from "zod";

// PATCH /api/admin/models/[id]/status — Cambiar estado del perfil
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
        const { status } = statusChangeSchema.parse(body);

        const existing = await db.profile.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json(
                { error: "Perfil no encontrado" },
                { status: 404 }
            );
        }

        const updateData: Record<string, unknown> = { status };

        // Si se aprueba, registrar fecha de aprobación
        if (status === "APPROVED") {
            updateData.approvedAt = new Date();
        }

        // Si se rechaza o se pone pendiente, limpiar fecha de aprobación
        if (status === "PENDING" || status === "REJECTED") {
            updateData.approvedAt = null;
        }

        const profile = await db.profile.update({
            where: { id },
            data: updateData,
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
                { error: error.issues[0]?.message || "Estado inválido" },
                { status: 400 }
            );
        }

        console.error("Admin change status error:", error);
        return NextResponse.json(
            { error: "Error al cambiar estado" },
            { status: 500 }
        );
    }
}
