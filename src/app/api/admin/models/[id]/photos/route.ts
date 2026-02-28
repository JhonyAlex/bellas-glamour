import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// POST /api/admin/models/[id]/photos — Subir foto a un modelo (admin)
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = await requireAdmin(request);
        if (!admin) {
            return NextResponse.json({ error: "No autorizado" }, { status: 403 });
        }

        const { id: profileId } = await params;

        // Verificar que el perfil existe
        const profile = await db.profile.findUnique({
            where: { id: profileId },
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

        // Validar tipo de archivo
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Tipo de archivo no permitido. Use JPG, PNG o WebP" },
                { status: 400 }
            );
        }

        // Validar tamaño (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: "El archivo es demasiado grande. Máximo 5MB" },
                { status: 400 }
            );
        }

        // Generar nombre único
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const extension = file.name.split(".").pop();
        const filename = `${timestamp}-${randomString}.${extension}`;

        // Crear directorio de uploads si no existe
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadsDir, { recursive: true });

        // Guardar archivo
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(uploadsDir, filename);
        await writeFile(filePath, buffer);

        // Obtener orden actual
        const photoCount = await db.photo.count({
            where: { profileId },
        });

        // Crear registro — las fotos subidas por admin se aprueban directamente
        const photo = await db.photo.create({
            data: {
                profileId,
                uploaderId: admin.id,
                url: `/uploads/${filename}`,
                filename: file.name,
                mimeType: file.type,
                size: file.size,
                title: title || undefined,
                category: category || undefined,
                isProfilePhoto,
                order: photoCount,
                status: "APPROVED",
                approvedAt: new Date(),
            },
        });

        // Si es foto de perfil, desmarcar las demás
        if (isProfilePhoto) {
            await db.photo.updateMany({
                where: {
                    profileId,
                    id: { not: photo.id },
                },
                data: {
                    isProfilePhoto: false,
                },
            });
        }

        return NextResponse.json(photo);
    } catch (error) {
        console.error("Admin upload photo error:", error);
        return NextResponse.json(
            { error: "Error al subir foto" },
            { status: 500 }
        );
    }
}
