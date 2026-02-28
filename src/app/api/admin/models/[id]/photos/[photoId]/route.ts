import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { photoStatusSchema } from "@/lib/admin-validations";
import { z } from "zod";
import { unlink } from "fs/promises";
import { join } from "path";

// PATCH /api/admin/models/[id]/photos/[photoId] — Cambiar estado de una foto
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; photoId: string }> }
) {
    try {
        const admin = await requireAdmin(request);
        if (!admin) {
            return NextResponse.json({ error: "No autorizado" }, { status: 403 });
        }

        const { id, photoId } = await params;
        const body = await request.json();
        const { status } = photoStatusSchema.parse(body);

        // Verificar que la foto pertenece al perfil
        const photo = await db.photo.findFirst({
            where: { id: photoId, profileId: id },
        });

        if (!photo) {
            return NextResponse.json(
                { error: "Foto no encontrada" },
                { status: 404 }
            );
        }

        const updateData: Record<string, unknown> = { status };
        if (status === "APPROVED") {
            updateData.approvedAt = new Date();
        }

        const updatedPhoto = await db.photo.update({
            where: { id: photoId },
            data: updateData,
        });

        return NextResponse.json(updatedPhoto);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0]?.message || "Estado inválido" },
                { status: 400 }
            );
        }

        console.error("Admin update photo status error:", error);
        return NextResponse.json(
            { error: "Error al actualizar estado de foto" },
            { status: 500 }
        );
    }
}

// DELETE /api/admin/models/[id]/photos/[photoId] — Eliminar foto
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; photoId: string }> }
) {
    try {
        const admin = await requireAdmin(request);
        if (!admin) {
            return NextResponse.json({ error: "No autorizado" }, { status: 403 });
        }

        const { id, photoId } = await params;

        // Verificar que la foto pertenece al perfil
        const photo = await db.photo.findFirst({
            where: { id: photoId, profileId: id },
        });

        if (!photo) {
            return NextResponse.json(
                { error: "Foto no encontrada" },
                { status: 404 }
            );
        }

        // Intentar eliminar el archivo físico
        try {
            if (photo.url.startsWith("/uploads/")) {
                const filePath = join(process.cwd(), "public", photo.url);
                await unlink(filePath);
            }
        } catch {
            // Si no se puede eliminar el archivo, continuar con la eliminación de la DB
            console.warn(`No se pudo eliminar archivo: ${photo.url}`);
        }

        // Eliminar registro de la BD
        await db.photo.delete({ where: { id: photoId } });

        return NextResponse.json({ success: true, message: "Foto eliminada" });
    } catch (error) {
        console.error("Admin delete photo error:", error);
        return NextResponse.json(
            { error: "Error al eliminar foto" },
            { status: 500 }
        );
    }
}
