import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/models/[id] - Get single model by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const model = await db.profile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        photos: {
          where: {
            status: "APPROVED",
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });
    
    if (!model || model.status !== "APPROVED") {
      return NextResponse.json(
        { error: "Modelo no encontrado" },
        { status: 404 }
      );
    }
    
    // Increment view count
    await db.profile.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    
    return NextResponse.json(model);
  } catch (error) {
    console.error("Get model error:", error);
    return NextResponse.json(
      { error: "Error al obtener modelo" },
      { status: 500 }
    );
  }
}
