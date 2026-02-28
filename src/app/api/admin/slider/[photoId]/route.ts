import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// DELETE /api/admin/slider/[photoId] — Quitar foto del slider
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ photoId: string }> }
) {
    try {
        const admin = await requireAdmin(request);
        if (!admin) {
            return NextResponse.json({ error: "No autorizado" }, { status: 403 });
        }

        const { photoId } = await params;

        const photo = await db.photo.findUnique({ where: { id: photoId } });
        if (!photo) {
            return NextResponse.json(
                { error: "Foto no encontrada" },
                { status: 404 }
            );
        }

        await db.photo.update({
            where: { id: photoId },
            data: { isSliderPhoto: false, sliderOrder: 0 },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Admin remove from slider error:", error);
        return NextResponse.json(
            { error: "Error al quitar del slider" },
            { status: 500 }
        );
    }
}
