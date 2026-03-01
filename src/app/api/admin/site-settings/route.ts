import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { z } from "zod";

const siteSettingsUpdateSchema = z.object({
  heroTagline: z.string().max(500).nullish(),
  heroCtaText: z.string().max(100).nullish(),
  aboutTitle: z.string().max(200).nullish(),
  aboutText1: z.string().max(2000).nullish(),
  aboutText2: z.string().max(2000).nullish(),
  aboutImageUrl: z.string().max(500).nullish(),
  stat1Value: z.string().max(20).nullish(),
  stat1Label: z.string().max(50).nullish(),
  stat2Value: z.string().max(20).nullish(),
  stat2Label: z.string().max(50).nullish(),
  stat3Value: z.string().max(20).nullish(),
  stat3Label: z.string().max(50).nullish(),
  servicesTitle: z.string().max(200).nullish(),
  servicesSubtitle: z.string().max(500).nullish(),
  service1Title: z.string().max(100).nullish(),
  service1Desc: z.string().max(500).nullish(),
  service1Icon: z.string().max(10).nullish(),
  service2Title: z.string().max(100).nullish(),
  service2Desc: z.string().max(500).nullish(),
  service2Icon: z.string().max(10).nullish(),
  service3Title: z.string().max(100).nullish(),
  service3Desc: z.string().max(500).nullish(),
  service3Icon: z.string().max(10).nullish(),
  contactEmail: z.string().max(200).nullish(),
  contactPhone: z.string().max(30).nullish(),
  contactLocation: z.string().max(200).nullish(),
  membershipTitle: z.string().max(200).nullish(),
  membershipText: z.string().max(1000).nullish(),
});

// GET /api/admin/site-settings
export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const settings = await db.siteSettings.findUnique({
      where: { id: "singleton" },
    });

    return NextResponse.json(settings || { id: "singleton" });
  } catch {
    return NextResponse.json({ id: "singleton" });
  }
}

// PUT /api/admin/site-settings
export async function PUT(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const data = siteSettingsUpdateSchema.parse(body);

    const settings = await db.siteSettings.upsert({
      where: { id: "singleton" },
      create: { id: "singleton", ...data },
      update: data,
    });

    return NextResponse.json(settings);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues?.[0]?.message || "Datos inválidos" },
        { status: 400 }
      );
    }

    console.error("Update site settings error:", error);
    return NextResponse.json(
      { error: "Error al actualizar configuración" },
      { status: 500 }
    );
  }
}
