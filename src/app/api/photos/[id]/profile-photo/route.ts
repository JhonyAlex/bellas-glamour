import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

// PATCH /api/photos/[id]/profile-photo — Marcar como foto principal
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getCurrentUser(request);
        if (!user) {
            return NextResponse.json(
                { error: "No autenticado" },
                { status: 401 }
            );
        }

        const { id } = await params;

        // Buscar la foto
        const photo = await db.photo.findUnique({
            where: { id },
            include: { profile: true },
        });

        if (!photo) {
            return NextResponse.json(
                { error: "Foto no encontrada" },
                { status: 404 }
            );
        }

        // Solo el dueño del perfil o un admin pueden cambiar la foto principal
        if (photo.uploaderId !== user.id && user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "No tienes permiso para realizar esta acción" },
                { status: 403 }
            );
        }

        // Desmarcar todas las fotos del perfil como principal
        await db.photo.updateMany({
            where: {
                profileId: photo.profileId,
                isProfilePhoto: true,
            },
            data: { isProfilePhoto: false },
        });

        // Marcar esta como principal
        const updated = await db.photo.update({
            where: { id },
            data: { isProfilePhoto: true },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Set profile photo error:", error);
        return NextResponse.json(
            { error: "Error al establecer foto principal" },
            { status: 500 }
        );
    }
}
