import { db } from "../src/lib/db";
import { hashPassword } from "../src/lib/auth";

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await hashPassword("admin123");
  const admin = await db.user.upsert({
    where: { email: "admin@bellasglamour.com" },
    update: {},
    create: {
      email: "admin@bellasglamour.com",
      password: adminPassword,
      name: "Admin",
      role: "ADMIN",
    },
  });
  console.log("✅ Created admin user:", admin.email);

  // Create demo models
  const modelData = [
    {
      email: "valentina@demo.com",
      name: "Valentina Torres",
      artisticName: "Valentina Rose",
      bio: "Modelo profesional con 5 años de experiencia en pasarela y fotografía comercial. Apasionada por la moda sostenible y el fitness.",
      height: 178,
      weight: 58,
      eyeColor: "verde",
      hairColor: "castaño",
      measurements: "86-62-90",
      location: "Ciudad de México, México",
      nationality: "Mexicana",
      hobbies: "Yoga, fotografía, viajes, cocina",
      languages: "Español, Inglés, Portugués",
      instagram: "@valentina.rose",
      status: "APPROVED" as const,
      featured: true,
    },
    {
      email: "camila@demo.com",
      name: "Camila Hernández",
      artisticName: "Camila Star",
      bio: "Especialista en fotografía editorial y campañas de belleza. Rostro de reconocidas marcas de cosméticos.",
      height: 172,
      weight: 55,
      eyeColor: "marrón",
      hairColor: "negro",
      measurements: "84-60-88",
      location: "Guadalajara, México",
      nationality: "Mexicana",
      hobbies: "Maquillaje, danza, lectura",
      languages: "Español, Inglés",
      instagram: "@camila.star",
      status: "APPROVED" as const,
      featured: true,
    },
    {
      email: "isabella@demo.com",
      name: "Isabella García",
      artisticName: "Isabella Luxe",
      bio: "Modelo de alta costura con experiencia en las principales capitales de la moda. Colaboraciones con diseñadores internacionales.",
      height: 180,
      weight: 60,
      eyeColor: "azul",
      hairColor: "rubio",
      measurements: "88-64-92",
      location: "Monterrey, México",
      nationality: "Mexicana",
      hobbies: "Arte, música, natación",
      languages: "Español, Inglés, Francés",
      instagram: "@isabella.luxe",
      twitter: "@isabellaluxe",
      status: "APPROVED" as const,
      featured: true,
    },
    {
      email: "sofia@demo.com",
      name: "Sofía Ramírez",
      artisticName: "Sofía Moon",
      bio: "Modelo comercial versátil con presencia en televisión y publicidad. Energía positiva y profesionalismo garantizado.",
      height: 168,
      weight: 52,
      eyeColor: "miel",
      hairColor: "castaño",
      measurements: "82-58-86",
      location: "Cancún, México",
      nationality: "Mexicana",
      hobbies: "Surf, meditación, escritura",
      languages: "Español, Inglés",
      instagram: "@sofia.moon",
      status: "APPROVED" as const,
      featured: false,
    },
    {
      email: "lucia@demo.com",
      name: "Lucía Castillo",
      artisticName: "Lucía Divine",
      bio: "Modelo plus size rompiendo estereotipos. Embajadora de la belleza real y la autoaceptación.",
      height: 175,
      weight: 72,
      eyeColor: "negro",
      hairColor: "negro",
      measurements: "100-82-108",
      location: "Ciudad de México, México",
      nationality: "Mexicana",
      hobbies: "Body positive activism, moda, música",
      languages: "Español, Inglés",
      instagram: "@lucia.divine",
      status: "APPROVED" as const,
      featured: false,
    },
    {
      email: "mariana@demo.com",
      name: "Mariana López",
      artisticName: "Mariana Belle",
      bio: "Modelo emergente con gran potencial. Experiencia en editoriales de moda y campañas de lifestyle.",
      height: 170,
      weight: 54,
      eyeColor: "verde",
      hairColor: "pelirrojo",
      measurements: "84-60-88",
      location: "Puebla, México",
      nationality: "Mexicana",
      hobbies: "Pintura, equitación, cine",
      languages: "Español, Inglés",
      instagram: "@mariana.belle",
      status: "APPROVED" as const,
      featured: false,
    },
    {
      email: "pending1@demo.com",
      name: "Ana Martínez",
      artisticName: "Ana Grace",
      bio: "Nueva modelo buscando oportunidad en el mundo de la moda.",
      height: 165,
      weight: 50,
      eyeColor: "marrón",
      hairColor: "negro",
      measurements: "80-58-84",
      location: "Querétaro, México",
      nationality: "Mexicana",
      hobbies: "Baile, lectura",
      languages: "Español",
      status: "PENDING" as const,
      featured: false,
    },
    {
      email: "pending2@demo.com",
      name: "Paula Sánchez",
      artisticName: "Paula Shine",
      bio: "Modelo principiante con muchas ganas de aprender y crecer.",
      height: 173,
      weight: 56,
      eyeColor: "azul",
      hairColor: "rubio",
      measurements: "86-62-90",
      location: "Tijuana, México",
      nationality: "Mexicana",
      hobbies: "Gimnasio, playa",
      languages: "Español, Inglés",
      status: "PENDING" as const,
      featured: false,
    },
  ];

  const modelPassword = await hashPassword("demo123");

  for (const data of modelData) {
    const user = await db.user.upsert({
      where: { email: data.email },
      update: {},
      create: {
        email: data.email,
        password: modelPassword,
        name: data.name,
        role: "MODEL",
      },
    });

    const profile = await db.profile.upsert({
      where: { userId: user.id },
      update: {
        artisticName: data.artisticName,
        bio: data.bio,
        height: data.height,
        weight: data.weight,
        eyeColor: data.eyeColor,
        hairColor: data.hairColor,
        measurements: data.measurements,
        location: data.location,
        nationality: data.nationality,
        hobbies: data.hobbies,
        languages: data.languages,
        instagram: data.instagram,
        twitter: data.twitter,
        status: data.status,
        featured: data.featured,
      },
      create: {
        userId: user.id,
        artisticName: data.artisticName,
        bio: data.bio,
        height: data.height,
        weight: data.weight,
        eyeColor: data.eyeColor,
        hairColor: data.hairColor,
        measurements: data.measurements,
        location: data.location,
        nationality: data.nationality,
        hobbies: data.hobbies,
        languages: data.languages,
        instagram: data.instagram,
        twitter: data.twitter,
        status: data.status,
        featured: data.featured,
      },
    });

    // Create demo photos for approved models
    if (data.status === "APPROVED") {
      const existingPhotos = await db.photo.count({
        where: { profileId: profile.id },
      });

      if (existingPhotos === 0) {
        // Create 3-5 demo photos
        const photoCount = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < photoCount; i++) {
          await db.photo.create({
            data: {
              profileId: profile.id,
              uploaderId: user.id,
              url: `https://picsum.photos/seed/${user.id}-${i}/800/1200`,
              status: "APPROVED",
              isProfilePhoto: i === 0,
              order: i,
            },
          });
        }
      }
    } else if (data.status === "PENDING") {
      // Create 1 pending photo for pending models
      const existingPhotos = await db.photo.count({
        where: { profileId: profile.id },
      });

      if (existingPhotos === 0) {
        await db.photo.create({
          data: {
            profileId: profile.id,
            uploaderId: user.id,
            url: `https://picsum.photos/seed/${user.id}-pending/800/1200`,
            status: "PENDING",
            isProfilePhoto: true,
            order: 0,
          },
        });
      }
    }

    console.log(`✅ Created model: ${data.artisticName} (${data.status})`);
  }

  console.log("\n🎉 Seed completed!");
  console.log("\n📋 Demo Accounts:");
  console.log("  Admin: admin@bellasglamour.com / admin123");
  console.log("  Approved Model: valentina@demo.com / demo123");
  console.log("  Pending Model: pending1@demo.com / demo123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
