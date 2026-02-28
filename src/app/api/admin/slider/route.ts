import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/admin/slider — Listado de fotos del slider (admin)
export async function GET(request: NextRequest) {
    try {
        const admin = await requireAdmin(request);
        if (!admin) {
            return NextResponse.json({ error: "No autorizado" }, { status: 403 });
        }

        const photos = await db.photo.findMany({
            where: { isSliderPhoto: true },
            orderBy: { sliderOrder: "asc" },
            include: {
                profile: {
                    select: {
                        id: true,
                        artisticName: true,
                        user: { select: { name: true, email: true } },
                    },
                },
            },
        });

        return NextResponse.json(photos);
    } catch (error) {
        console.error("Admin get slider error:", error);
        return NextResponse.json(
            { error: "Error al obtener slider" },
            { status: 500 }
        );
    }
}

// POST /api/admin/slider — Agregar foto al slider
export async function POST(request: NextRequest) {
    try {
        const admin = await requireAdmin(request);
        if (!admin) {
            return NextResponse.json({ error: "No autorizado" }, { status: 403 });
        }

        const { photoId } = await request.json();
        if (!photoId) {
            return NextResponse.json(
                { error: "photoId es requerido" },
                { status: 400 }
            );
        }

        // Verificar que la foto existe y está aprobada
        const photo = await db.photo.findUnique({ where: { id: photoId } });
        if (!photo) {
            return NextResponse.json(
                { error: "Foto no encontrada" },
                { status: 404 }
            );
        }
        if (photo.status !== "APPROVED") {
            return NextResponse.json(
                { error: "Solo se pueden agregar fotos aprobadas al slider" },
                { status: 400 }
            );
        }
        if (photo.isSliderPhoto) {
            return NextResponse.json(
                { error: "Esta foto ya está en el slider" },
                { status: 400 }
            );
        }

        // Calcular el siguiente orden
        const maxOrder = await db.photo.aggregate({
            where: { isSliderPhoto: true },
            _max: { sliderOrder: true },
        });
        const nextOrder = (maxOrder._max.sliderOrder ?? -1) + 1;

        const updated = await db.photo.update({
            where: { id: photoId },
            data: { isSliderPhoto: true, sliderOrder: nextOrder },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Admin add to slider error:", error);
        return NextResponse.json(
            { error: "Error al agregar al slider" },
            { status: 500 }
        );
    }
}

// PATCH /api/admin/slider — Reordenar fotos del slider
export async function PATCH(request: NextRequest) {
    try {
        const admin = await requireAdmin(request);
        if (!admin) {
            return NextResponse.json({ error: "No autorizado" }, { status: 403 });
        }

        const { orderedIds } = await request.json();
        if (!Array.isArray(orderedIds)) {
            return NextResponse.json(
                { error: "orderedIds debe ser un array" },
                { status: 400 }
            );
        }

        // Actualizar el orden de cada foto
        await Promise.all(
            orderedIds.map((id: string, index: number) =>
                db.photo.update({
                    where: { id },
                    data: { sliderOrder: index },
                })
            )
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Admin reorder slider error:", error);
        return NextResponse.json(
            { error: "Error al reordenar slider" },
            { status: 500 }
        );
    }
}
