import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ModelProfilePage } from "@/components/bellas/ModelProfilePage";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Busca perfil por slug o por id (retrocompatibilidad con links anteriores)
async function findProfile(slug: string) {
  return db.profile.findFirst({
    where: {
      OR: [{ slug }, { id: slug }],
      status: "APPROVED",
    },
    include: {
      user: { select: { id: true, name: true, image: true } },
      photos: {
        where: { status: "APPROVED" },
        orderBy: { order: "asc" },
      },
    },
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = await db.profile.findFirst({
    where: { OR: [{ slug }, { id: slug }] },
    select: { artisticName: true, bio: true },
  });

  if (!profile) {
    return { title: "Modelo no encontrada | Bellas Glamour" };
  }

  return {
    title: `${profile.artisticName || "Modelo"} | Bellas Glamour`,
    description: profile.bio || "Perfil de modelo en Bellas Glamour - Agencia de Modelos Premium",
  };
}

export default async function ModeloPage({ params }: PageProps) {
  const { slug } = await params;

  const profile = await findProfile(slug);

  if (!profile) notFound();

  // Incrementar vistas (fire and forget)
  db.profile.update({ where: { id: profile.id }, data: { views: { increment: 1 } } }).catch(() => {});

  const model = {
    id: profile.id,
    slug: profile.slug,
    artisticName: profile.artisticName,
    bio: profile.bio,
    height: profile.height,
    weight: profile.weight,
    eyeColor: profile.eyeColor,
    hairColor: profile.hairColor,
    skinTone: profile.skinTone,
    measurements: profile.measurements,
    shoeSize: profile.shoeSize,
    hobbies: profile.hobbies,
    languages: profile.languages,
    skills: profile.skills,
    experience: profile.experience,
    specialties: profile.specialties,
    availability: profile.availability,
    location: profile.location,
    nationality: profile.nationality,
    instagram: profile.instagram,
    twitter: profile.twitter,
    tiktok: profile.tiktok,
    phoneNumber: profile.phoneNumber,
    whatsappAvailable: profile.whatsappAvailable,
    featured: profile.featured,
    views: profile.views,
    user: profile.user,
    photos: profile.photos.map((p) => ({
      id: p.id,
      url: p.url,
      title: p.title,
      isProfilePhoto: p.isProfilePhoto,
    })),
  };

  return <ModelProfilePage model={model} />;
}
