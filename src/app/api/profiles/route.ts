import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { z } from "zod";

const profileUpdateSchema = z.object({
  artisticName: z.string().nullish(),
  bio: z.string().nullish(),
  birthDate: z.string().nullish(),
  nationality: z.string().nullish(),
  location: z.string().nullish(),
  height: z.number().nullish(),
  weight: z.number().nullish(),
  eyeColor: z.string().nullish(),
  hairColor: z.string().nullish(),
  skinTone: z.string().nullish(),
  measurements: z.string().nullish(),
  shoeSize: z.number().nullish(),
  hobbies: z.string().nullish(),
  languages: z.string().nullish(),
  skills: z.string().nullish(),
  experience: z.string().nullish(),
  specialties: z.string().nullish(),
  availability: z.string().nullish(),
  instagram: z.string().nullish(),
  twitter: z.string().nullish(),
  tiktok: z.string().nullish(),
});

// GET /api/profiles - Get current user's profile
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }
    
    const profile = await db.profile.findUnique({
      where: { userId: user.id },
      include: {
        photos: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });
    
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { error: "Error al obtener perfil" },
      { status: 500 }
    );
  }
}

// PUT /api/profiles - Update current user's profile
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }
    
    if (user.role !== "MODEL") {
      return NextResponse.json(
        { error: "Solo las modelos pueden editar su perfil" },
        { status: 403 }
      );
    }
    
    // Verify profile exists
    const existingProfile = await db.profile.findUnique({
      where: { userId: user.id },
    });

    if (!existingProfile) {
      return NextResponse.json(
        { error: "Perfil no encontrado. Completa el registro primero." },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validatedData = profileUpdateSchema.parse(body);

    // Prepare update data with proper date handling
    const updateData: Record<string, unknown> = { ...validatedData };
    if (validatedData.birthDate) {
      updateData.birthDate = new Date(validatedData.birthDate);
    }

    const profile = await db.profile.update({
      where: { userId: user.id },
      data: updateData,
    });
    
    return NextResponse.json(profile);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors?.[0]?.message || "Datos inválidos" },
        { status: 400 }
      );
    }
    
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Error al actualizar perfil" },
      { status: 500 }
    );
  }
}
