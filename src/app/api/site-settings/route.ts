import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Valores por defecto cuando no hay configuración en la DB
const defaults = {
  id: "singleton",
  heroTagline: null,
  heroCtaText: null,
  aboutTitle: null,
  aboutText1: null,
  aboutText2: null,
  aboutImageUrl: null,
  stat1Value: "150+",
  stat1Label: "Modelos",
  stat2Value: "500+",
  stat2Label: "Proyectos",
  stat3Value: "10+",
  stat3Label: "Años",
  servicesTitle: null,
  servicesSubtitle: null,
  service1Title: "Eventos Exclusivos",
  service1Desc: "Presencia de alto nivel para eventos privados y galas VIP.",
  service1Icon: "🥂",
  service2Title: "Campañas de Lujo",
  service2Desc: "Fotografía artística y campañas publicitarias premium para marcas exclusivas.",
  service2Icon: "📸",
  service3Title: "Experiencias VIP",
  service3Desc: "Servicios personalizados para clientes selectos y eventos corporativos de alto nivel.",
  service3Icon: "💎",
  contactEmail: "vip@bellasglamour.com",
  contactPhone: "+52 (55) 1234-5678",
  contactLocation: "Ciudad de México, México",
  membershipTitle: null,
  membershipText: null,
};

// GET /api/site-settings - Configuración pública del sitio
export async function GET() {
  try {
    const settings = await db.siteSettings.findUnique({
      where: { id: "singleton" },
    });

    return NextResponse.json(settings || defaults);
  } catch {
    return NextResponse.json(defaults);
  }
}
