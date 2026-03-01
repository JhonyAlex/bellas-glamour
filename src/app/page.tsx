"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/bellas/Navbar";
import { Footer } from "@/components/bellas/Footer";
import { HeroSection } from "@/components/bellas/HeroSection";
import { ModelGrid } from "@/components/bellas/ModelGrid";
import { AuthModal } from "@/components/bellas/AuthModal";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { Diamond, Crown, Gem, Award, Heart } from "lucide-react";

export default function HomePage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { data: settings } = useSiteSettings();

  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onLoginClick={handleLoginClick} />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onJoinClick={handleLoginClick}
          tagline={settings?.heroTagline}
          ctaText={settings?.heroCtaText}
        />

        {/* Featured Models Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-black to-background">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Diamond className="w-8 h-8 mx-auto text-gold-400 mb-4" />
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                Modelos <span className="text-gold-gradient">Exclusivas</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Descubre nuestra selección de talento premium
              </p>
            </motion.div>
          </div>
        </section>

        {/* Models Grid */}
        <ModelGrid />

        {/* About Section */}
        <section id="nosotros" className="py-20 px-4 bg-card">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
                  {settings?.aboutTitle || (
                    <>Sobre <span className="text-gold-gradient">Bellas Glamour</span></>
                  )}
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {settings?.aboutText1 ||
                    "Somos una agencia de modelos premium exclusiva para adultos, dedicada a representar el talento más sofisticado y elegante del país. Con más de una década de experiencia, trabajamos con las marcas más prestigiosas del mundo de la moda de lujo, publicidad de alta gama y entretenimiento para adultos."}
                </p>
                <p className="text-gray-400 mb-8">
                  {settings?.aboutText2 ||
                    "Nuestra misión es descubrir, desarrollar y promover modelos que destaquen por su belleza refinada, profesionalismo y carisma único, ofreciendo experiencias exclusivas para nuestros clientes más exigentes."}
                </p>

                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <Crown className="w-8 h-8 mx-auto text-gold-400 mb-2" />
                    <p className="text-3xl font-bold text-gold-400">{settings?.stat1Value || "150+"}</p>
                    <p className="text-gray-400 text-sm">{settings?.stat1Label || "Modelos"}</p>
                  </div>
                  <div className="text-center">
                    <Gem className="w-8 h-8 mx-auto text-gold-400 mb-2" />
                    <p className="text-3xl font-bold text-gold-400">{settings?.stat2Value || "500+"}</p>
                    <p className="text-gray-400 text-sm">{settings?.stat2Label || "Proyectos"}</p>
                  </div>
                  <div className="text-center">
                    <Award className="w-8 h-8 mx-auto text-gold-400 mb-2" />
                    <p className="text-3xl font-bold text-gold-400">{settings?.stat3Value || "10+"}</p>
                    <p className="text-gray-400 text-sm">{settings?.stat3Label || "Años"}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden"
              >
                <div className="aspect-[4/5] relative rounded-lg overflow-hidden">
                  <img
                    src={settings?.aboutImageUrl || "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80"}
                    alt="Fashion"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 md:-bottom-6 md:-left-6 bg-gold-500 p-4 md:p-6 rounded-lg md:rounded-lg rounded-tl-none rounded-bl-none md:rounded-tl-lg">
                  <Crown className="w-6 h-6 md:w-8 md:h-8 text-black mb-1 md:mb-2" />
                  <p className="text-black font-bold text-sm md:text-base">Exclusividad</p>
                  <p className="text-black/70 text-xs md:text-sm">para adultos</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Gem className="w-8 h-8 mx-auto text-gold-400 mb-4" />
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                {settings?.servicesTitle || (<>Servicios <span className="text-gold-gradient">Premium</span></>)}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {settings?.servicesSubtitle || "Experiencias exclusivas para nuestros clientes más distinguidos"}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: settings?.service1Title || "Eventos Exclusivos",
                  description: settings?.service1Desc || "Presencia de alto nivel para eventos privados y galas VIP.",
                  icon: settings?.service1Icon || "🥂",
                },
                {
                  title: settings?.service2Title || "Campañas de Lujo",
                  description: settings?.service2Desc || "Fotografía artística y campañas publicitarias premium para marcas exclusivas.",
                  icon: settings?.service2Icon || "📸",
                },
                {
                  title: settings?.service3Title || "Experiencias VIP",
                  description: settings?.service3Desc || "Servicios personalizados para clientes selectos y eventos corporativos de alto nivel.",
                  icon: settings?.service3Icon || "💎",
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-gold-500/20 rounded-lg p-6 text-center hover:border-gold-500/40 transition-colors card-hover"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="font-serif text-xl text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Banner */}
        <section className="py-20 px-4 bg-gradient-to-r from-gold-900/20 via-gold-800/10 to-gold-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Crown className="w-12 h-12 mx-auto text-gold-400 mb-6" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                {settings?.membershipTitle || (<>Acceso <span className="text-gold-gradient">VIP</span></>)}
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                {settings?.membershipText ||
                  "Únete a nuestra comunidad exclusiva y accede a contenido premium, eventos privados y oportunidades únicas con nuestras modelos más solicitadas."}
              </p>
              <button onClick={handleLoginClick} className="btn-luxury text-lg px-10 py-4">
                Solicitar Membresía
              </button>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-20 px-4 bg-card">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Heart className="w-8 h-8 mx-auto text-gold-400 mb-4" />
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                ¿Listo para <span className="text-gold-gradient">Comenzar</span>?
              </h2>
              <p className="text-gray-400">
                Contáctanos para discutir tu próximo proyecto exclusivo
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-black/50 border border-gold-500/20 rounded-lg p-8 text-center"
            >
              <p className="text-gray-300 mb-4">
                <strong className="text-gold-400">Email:</strong>{" "}
                {settings?.contactEmail || "vip@bellasglamour.com"}
              </p>
              <p className="text-gray-300 mb-4">
                <strong className="text-gold-400">Teléfono:</strong>{" "}
                {settings?.contactPhone || "+52 (55) 1234-5678"}
              </p>
              <p className="text-gray-300 mb-6">
                <strong className="text-gold-400">Ubicación:</strong>{" "}
                {settings?.contactLocation || "Ciudad de México, México"}
              </p>
              <button onClick={handleLoginClick} className="btn-luxury">
                Únete como Modelo
              </button>
            </motion.div>
          </div>
        </section>

        {/* Age Restriction Footer */}
        <div className="py-4 px-4 bg-black border-t border-gold-500/10">
          <p className="text-center text-gray-500 text-xs">
            ⚠️ Este sitio contiene material para adultos mayores de 18 años.
            Al navegar confirmas ser mayor de edad según tu jurisdicción local.
          </p>
        </div>
      </main>

      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}
