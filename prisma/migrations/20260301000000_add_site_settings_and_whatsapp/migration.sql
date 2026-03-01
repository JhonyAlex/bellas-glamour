-- AlterTable: Añadir campos de WhatsApp al perfil
ALTER TABLE "profiles" ADD COLUMN "phoneNumber" TEXT;
ALTER TABLE "profiles" ADD COLUMN "whatsappAvailable" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable: Configuración del sitio (singleton)
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "heroTagline" TEXT,
    "heroCtaText" TEXT,
    "aboutTitle" TEXT,
    "aboutText1" TEXT,
    "aboutText2" TEXT,
    "aboutImageUrl" TEXT,
    "stat1Value" TEXT,
    "stat1Label" TEXT,
    "stat2Value" TEXT,
    "stat2Label" TEXT,
    "stat3Value" TEXT,
    "stat3Label" TEXT,
    "servicesTitle" TEXT,
    "servicesSubtitle" TEXT,
    "service1Title" TEXT,
    "service1Desc" TEXT,
    "service1Icon" TEXT,
    "service2Title" TEXT,
    "service2Desc" TEXT,
    "service2Icon" TEXT,
    "service3Title" TEXT,
    "service3Desc" TEXT,
    "service3Icon" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "contactLocation" TEXT,
    "membershipTitle" TEXT,
    "membershipText" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);
