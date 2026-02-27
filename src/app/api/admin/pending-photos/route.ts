import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/admin/pending-photos - Get all pending photos (admin only)
export async function GET(request: NextRequest) {
  try {
    const admin = await requireAdmin(request);
    
    if (!admin) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 403 }
      );
    }
    
    const pendingPhotos = await db.photo.findMany({
      where: {
        status: "PENDING",
      },
      include: {
        profile: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        uploadedAt: "desc",
      },
    });
    
    return NextResponse.json(pendingPhotos);
  } catch (error) {
    console.error("Get pending photos error:", error);
    return NextResponse.json(
      { error: "Error al obtener fotos pendientes" },
      { status: 500 }
    );
  }
}
