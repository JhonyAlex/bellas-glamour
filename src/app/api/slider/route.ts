import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/slider — Fotos del slider del home (público)
export async function GET() {
    try {
        const photos = await db.photo.findMany({
            where: {
                isSliderPhoto: true,
                status: "APPROVED",
            },
            orderBy: {
                sliderOrder: "asc",
            },
            include: {
                profile: {
                    select: {
                        artisticName: true,
                        user: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        const slides = photos.map((photo) => ({
            id: photo.id,
            image: photo.url,
            title: photo.profile.artisticName || photo.profile.user.name || "Modelo",
            subtitle: photo.title || "Bellas Glamour",
        }));

        return NextResponse.json(slides);
    } catch (error) {
        console.error("Get slider photos error:", error);
        return NextResponse.json(
            { error: "Error al obtener fotos del slider" },
            { status: 500 }
        );
    }
}
