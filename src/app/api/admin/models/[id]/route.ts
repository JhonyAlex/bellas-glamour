import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { adminProfileUpdateSchema } from "@/lib/admin-validations";
import { slugify } from "@/lib/slugify";
import { z } from "zod";

// GET /api/admin/models/[id] — Obtener detalle completo de un modelo
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = await requireAdmin(request);
        if (!admin) {
            return NextResponse.json({ error: "No autorizado" }, { status: 403 });
        }

        const { id } = await params;

        const profile = await db.profile.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                        role: true,
                        createdAt: true,
                    },
                },
                photos: {
                    orderBy: { order: "asc" },
                },
            },
        });

        if (!profile) {
            return NextResponse.json(
                { error: "Perfil no encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(profile);
    } catch (error) {
        console.error("Admin get model error:", error);
        return NextResponse.json(
            { error: "Error al obtener modelo" },
            { status: 500 }
        );
    }
}

// PUT /api/admin/models/[id] — Editar perfil de modelo (admin)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = await requireAdmin(request);
        if (!admin) {
            return NextResponse.json({ error: "No autorizado" }, { status: 403 });
        }

        const { id } = await params;

        // Verificar que el perfil existe
        const existing = await db.profile.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json(
                { error: "Perfil no encontrado" },
                { status: 404 }
            );
        }

        const body = await request.json();
        const validatedData = adminProfileUpdateSchema.parse(body);

        // Preparar datos con manejo de fecha
        const updateData: Record<string, unknown> = { ...validatedData };
        if (validatedData.birthDate) {
            updateData.birthDate = new Date(validatedData.birthDate);
        }

        // Generar slug si se actualió el nombre artístico
        if (validatedData.artisticName) {
            const baseSlug = slugify(validatedData.artisticName);
            // Verificar unicidad del slug excluyendo el perfil actual
            const existing = await db.profile.findFirst({
                where: { slug: baseSlug, NOT: { id } },
            });
            updateData.slug = existing ? `${baseSlug}-${id.slice(-6)}` : baseSlug;
        }

        // Limpiar campos vacíos (strings vacíos → null)
        for (const key of Object.keys(updateData)) {
            if (updateData[key] === "") {
                updateData[key] = null;
            }
        }

        const profile = await db.profile.update({
            where: { id },
            data: updateData,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                photos: {
                    orderBy: { order: "asc" },
                },
            },
        });

        return NextResponse.json(profile);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0]?.message || "Datos inválidos", details: error.issues },
                { status: 400 }
            );
        }

        console.error("Admin update model error:", error);
        return NextResponse.json(
            { error: "Error al actualizar modelo" },
            { status: 500 }
        );
    }
}

// DELETE /api/admin/models/[id] — Eliminar modelo completo (perfil + fotos + cuenta)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = await requireAdmin(request);
        if (!admin) {
            return NextResponse.json({ error: "No autorizado" }, { status: 403 });
        }

        const { id } = await params;

        // Obtener perfil con fotos y usuario
        const profile = await db.profile.findUnique({
            where: { id },
            include: {
                photos: { select: { filename: true } },
                user: { select: { id: true } },
            },
        });

        if (!profile) {
            return NextResponse.json({ error: "Perfil no encontrado" }, { status: 404 });
        }

        // Eliminar archivos físicos del volumen
        const { unlink } = await import("fs/promises");
        const path = await import("path");
        for (const photo of profile.photos) {
            if (photo.filename) {
                try {
                    await unlink(path.join(process.cwd(), "public", "uploads", photo.filename));
                } catch {
                    // Ignorar archivo no encontrado
                }
            }
        }

        // Eliminar usuario (cascade en Prisma elimina profile, photos, sessions)
        await db.user.delete({ where: { id: profile.userId } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Admin delete model error:", error);
        return NextResponse.json(
            { error: "Error al eliminar modelo" },
            { status: 500 }
        );
    }
}
