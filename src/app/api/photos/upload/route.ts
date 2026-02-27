import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// POST /api/photos/upload - Upload a photo
export async function POST(request: NextRequest) {
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
        { error: "Solo las modelos pueden subir fotos" },
        { status: 403 }
      );
    }
    
    const profile = await db.profile.findUnique({
      where: { userId: user.id },
    });
    
    if (!profile) {
      return NextResponse.json(
        { error: "Perfil no encontrado" },
        { status: 404 }
      );
    }
    
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string | null;
    const category = formData.get("category") as string | null;
    const isProfilePhoto = formData.get("isProfilePhoto") === "true";
    
    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó archivo" },
        { status: 400 }
      );
    }
    
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de archivo no permitido. Use JPG, PNG o WebP" },
        { status: 400 }
      );
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "El archivo es demasiado grande. Máximo 5MB" },
        { status: 400 }
      );
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const extension = file.name.split(".").pop();
    const filename = `${timestamp}-${randomString}.${extension}`;
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    
    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadsDir, filename);
    await writeFile(filePath, buffer);
    
    // Get current photo count for ordering
    const photoCount = await db.photo.count({
      where: { profileId: profile.id },
    });
    
    // Create photo record
    const photo = await db.photo.create({
      data: {
        profileId: profile.id,
        uploaderId: user.id,
        url: `/uploads/${filename}`,
        filename: file.name,
        mimeType: file.type,
        size: file.size,
        title: title || undefined,
        category: category || undefined,
        isProfilePhoto,
        order: photoCount,
        status: "PENDING",
      },
    });
    
    // If this is a profile photo, unset other profile photos
    if (isProfilePhoto) {
      await db.photo.updateMany({
        where: {
          profileId: profile.id,
          id: { not: photo.id },
        },
        data: {
          isProfilePhoto: false,
        },
      });
    }
    
    return NextResponse.json(photo);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Error al subir foto" },
      { status: 500 }
    );
  }
}
