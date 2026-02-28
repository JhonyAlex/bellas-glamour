import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { z } from "zod";

const profileUpdateSchema = z.object({
  artisticName: z.string().optional(),
  bio: z.string().optional(),
  birthDate: z.string().optional(),
  nationality: z.string().optional(),
  location: z.string().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  eyeColor: z.string().optional(),
  hairColor: z.string().optional(),
  skinTone: z.string().optional(),
  measurements: z.string().optional(),
  shoeSize: z.number().optional(),
  hobbies: z.string().optional(),
  languages: z.string().optional(),
  skills: z.string().optional(),
  experience: z.string().optional(),
  specialties: z.string().optional(),
  availability: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  tiktok: z.string().optional(),
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
        { error: error.errors[0].message },
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
