"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Crown, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSlider } from "@/hooks/use-public-data";

interface HeroSectionProps {
  onJoinClick: () => void;
  tagline?: string | null;
  ctaText?: string | null;
}

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1920&q=80",
    title: "Exclusividad",
    subtitle: "Sin Límites",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1920&q=80",
    title: "Belleza",
    subtitle: "Refinada",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=1920&q=80",
    title: "Elegancia",
    subtitle: "Premium",
  },
];

export function HeroSection({ onJoinClick, tagline, ctaText }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: sliderData } = useSlider();

  // Usar fotos dinámicas del slider si existen, sino fallback a defaults
  const slides = sliderData && sliderData.length > 0 ? sliderData : heroSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="inicio" className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
            scale: currentSlide === index ? 1 : 1.1,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </motion.div>
      ))}

      {/* Decorative Elements */}
      <div className="absolute inset-0 hero-pattern pointer-events-none" />

      {/* Gold Lines */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />

      {/* 18+ Badge - Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute top-24 right-6 z-20"
      >
        <div className="flex items-center bg-black/60 backdrop-blur-sm border border-gold-500/30 rounded-full px-4 py-2">
          <Shield className="w-4 h-4 text-gold-400 mr-2" />
          <span className="text-gold-400 font-bold text-sm">18+</span>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          {/* Decorative Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 rounded-full border border-gold-500/50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <Crown className="w-8 h-8 text-gold-400" />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
          >
            <span className="text-gold-gradient">{slides[currentSlide]?.title}</span>
          </motion.h1>

          <motion.p
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 tracking-[0.3em] uppercase mb-8"
          >
            {slides[currentSlide]?.subtitle}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-4"
          >
            {tagline || "Agencia de modelos premium exclusiva para adultos. Descubre el talento más sofisticado y elegante."}
          </motion.p>

          {/* Age Notice */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="text-gold-400/80 text-sm mb-12 flex items-center justify-center"
          >
            <Shield className="w-4 h-4 mr-2" />
            Solo para mayores de 18 años
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#modelos">
              <Button size="lg" className="btn-luxury text-lg px-8 py-6">
                Explorar Modelos
              </Button>
            </a>
            <Button
              variant="outline"
              size="lg"
              onClick={onJoinClick}
              className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10 text-lg px-8 py-6"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Acceso VIP
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center text-gold-400"
          >
            <span className="text-sm tracking-wider mb-2">Descubre</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 right-8 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index
                  ? "bg-gold-400 w-8"
                  : "bg-gray-600 hover:bg-gray-500"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
