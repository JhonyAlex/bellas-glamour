import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { exportParamsSchema } from "@/lib/admin-validations";

// GET /api/admin/models/export — Exportar datos de modelos en CSV o JSON
export async function GET(request: NextRequest) {
    try {
        const admin = await requireAdmin(request);
        if (!admin) {
            return NextResponse.json({ error: "No autorizado" }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const params = exportParamsSchema.parse({
            format: searchParams.get("format") ?? undefined,
            status: searchParams.get("status") ?? undefined,
            featured: searchParams.get("featured") ?? undefined,
        });

        // Construir filtro
        const where: Record<string, unknown> = {};

        if (params.status !== "ALL") {
            where.status = params.status;
        }

        if (params.featured !== "all") {
            where.featured = params.featured === "true";
        }

        const profiles = await db.profile.findMany({
            where,
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                _count: {
                    select: { photos: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        if (params.format === "json") {
            const jsonData = profiles.map((p) => ({
                id: p.id,
                nombreArtistico: p.artisticName,
                nombreReal: p.user.name,
                email: p.user.email,
                estado: p.status,
                destacada: p.featured,
                ubicacion: p.location,
                nacionalidad: p.nationality,
                altura: p.height,
                peso: p.weight,
                colorOjos: p.eyeColor,
                colorCabello: p.hairColor,
                tonoPiel: p.skinTone,
                medidas: p.measurements,
                tallaZapato: p.shoeSize,
                biografia: p.bio,
                experiencia: p.experience,
                especialidades: p.specialties,
                disponibilidad: p.availability,
                idiomas: p.languages,
                habilidades: p.skills,
                hobbies: p.hobbies,
                instagram: p.instagram,
                twitter: p.twitter,
                tiktok: p.tiktok,
                vistas: p.views,
                totalFotos: p._count.photos,
                creadoEn: p.createdAt,
                aprobadoEn: p.approvedAt,
            }));

            return new NextResponse(JSON.stringify(jsonData, null, 2), {
                headers: {
                    "Content-Type": "application/json",
                    "Content-Disposition": `attachment; filename="modelos_${new Date().toISOString().split("T")[0]}.json"`,
                },
            });
        }

        // CSV format
        const headers = [
            "ID", "Nombre Artístico", "Nombre Real", "Email", "Estado", "Destacada",
            "Ubicación", "Nacionalidad", "Altura (cm)", "Peso (kg)", "Color Ojos",
            "Color Cabello", "Tono Piel", "Medidas", "Talla Zapato", "Experiencia",
            "Especialidades", "Disponibilidad", "Idiomas", "Instagram", "Twitter",
            "TikTok", "Vistas", "Total Fotos", "Creado", "Aprobado",
        ];

        const csvRows = [headers.join(",")];

        for (const p of profiles) {
            const row = [
                p.id,
                escapeCSV(p.artisticName),
                escapeCSV(p.user.name),
                escapeCSV(p.user.email),
                p.status,
                p.featured ? "Sí" : "No",
                escapeCSV(p.location),
                escapeCSV(p.nationality),
                p.height ?? "",
                p.weight ?? "",
                escapeCSV(p.eyeColor),
                escapeCSV(p.hairColor),
                escapeCSV(p.skinTone),
                escapeCSV(p.measurements),
                p.shoeSize ?? "",
                escapeCSV(p.experience),
                escapeCSV(p.specialties),
                escapeCSV(p.availability),
                escapeCSV(p.languages),
                escapeCSV(p.instagram),
                escapeCSV(p.twitter),
                escapeCSV(p.tiktok),
                p.views,
                p._count.photos,
                p.createdAt ? new Date(p.createdAt).toLocaleDateString("es-ES") : "",
                p.approvedAt ? new Date(p.approvedAt).toLocaleDateString("es-ES") : "",
            ];
            csvRows.push(row.join(","));
        }

        const csvContent = "\uFEFF" + csvRows.join("\n"); // BOM para compatibilidad Excel

        return new NextResponse(csvContent, {
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": `attachment; filename="modelos_${new Date().toISOString().split("T")[0]}.csv"`,
            },
        });
    } catch (error) {
        console.error("Admin export error:", error);
        return NextResponse.json(
            { error: "Error al exportar datos" },
            { status: 500 }
        );
    }
}

function escapeCSV(value: string | null | undefined): string {
    if (value == null) return "";
    const str = String(value);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}
