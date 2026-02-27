import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/models - Get all approved models (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const height = searchParams.get("height");
    const eyeColor = searchParams.get("eyeColor");
    const hairColor = searchParams.get("hairColor");
    const featured = searchParams.get("featured");
    
    const where: Record<string, unknown> = {
      status: "APPROVED",
    };
    
    if (height) {
      const [min, max] = height.split("-").map(Number);
      if (min && max) {
        where.height = {
          gte: min,
          lte: max,
        };
      }
    }
    
    if (eyeColor) {
      where.eyeColor = eyeColor.toLowerCase();
    }
    
    if (hairColor) {
      where.hairColor = hairColor.toLowerCase();
    }
    
    if (featured === "true") {
      where.featured = true;
    }
    
    const models = await db.profile.findMany({
      where,
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
          take: 5,
        },
      },
      orderBy: {
        featured: "desc",
      },
    });
    
    return NextResponse.json(models);
  } catch (error) {
    console.error("Get models error:", error);
    return NextResponse.json(
      { error: "Error al obtener modelos" },
      { status: 500 }
    );
  }
}
