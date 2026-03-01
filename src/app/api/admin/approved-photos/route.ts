import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/admin/approved-photos - Returns all approved photos grouped by model
export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const profiles = await db.profile.findMany({
      where: {
        status: "APPROVED",
        photos: { some: { status: "APPROVED" } },
      },
      select: {
        id: true,
        artisticName: true,
        user: { select: { name: true } },
        photos: {
          where: { status: "APPROVED" },
          orderBy: { order: "asc" },
          select: { id: true, url: true, isProfilePhoto: true },
        },
      },
      orderBy: { artisticName: "asc" },
    });

    // Flatten into a list with model info
    const photos = profiles.flatMap((profile) =>
      profile.photos.map((photo) => ({
        id: photo.id,
        url: photo.url,
        isProfilePhoto: photo.isProfilePhoto,
        modelName: profile.artisticName || profile.user.name || "Modelo",
        profileId: profile.id,
      }))
    );

    return NextResponse.json(photos);
  } catch (error) {
    console.error("Get approved photos error:", error);
    return NextResponse.json(
      { error: "Error al obtener fotos" },
      { status: 500 }
    );
  }
}
