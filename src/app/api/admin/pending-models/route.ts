import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/admin/pending-models - Get all pending profiles (admin only)
export async function GET(request: NextRequest) {
  try {
    const admin = await requireAdmin(request);
    
    if (!admin) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 403 }
      );
    }
    
    const pendingModels = await db.profile.findMany({
      where: {
        status: "PENDING",
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            createdAt: true,
          },
        },
        photos: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    return NextResponse.json(pendingModels);
  } catch (error) {
    console.error("Get pending models error:", error);
    return NextResponse.json(
      { error: "Error al obtener modelos pendientes" },
      { status: 500 }
    );
  }
}
