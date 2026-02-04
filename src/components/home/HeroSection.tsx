import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  useEffect(() => {
    // Simular carga de video con delay para efecto de transición
    const timer = setTimeout(() => setIsVideoLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  
  return (
    <section className="hero-section">
      {/* Video Background con Lazy Loading */}
      <div className="absolute inset-0">
        {/* Poster estático mientras carga el video */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80)`,
            opacity: isVideoLoaded ? 0 : 1
          }}
        />
        
        {/* Video WebM optimizado */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="hero-video transition-opacity duration-1000"
          style={{ opacity: isVideoLoaded ? 1 : 0 }}
          poster="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
        >
          <source 
            src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" 
            type="video/mp4"
          />
          {/* Fallback a imagen si el video no carga */}
          <img 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Fashion Model" 
            className="w-full h-full object-cover"
          />
        </video>
      </div>
      
      {/* Overlay gradient */}
      <div className="hero-overlay" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-8"
        >
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-deep-magenta font-montserrat text-lg tracking-widest uppercase"
          >
            Elite Fashion Models
          </motion.p>
          
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-platinum font-playfair text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-shadow-lg"
          >
            Bellas
            <span className="block text-deep-magenta">Glamour</span>
          </motion.h1>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="text-platinum/80 font-montserrat text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed"
          >
            La plataforma exclusiva donde el lujo encuentra la perfección. 
            Descubre modelos de élite para tus campañas más exclusivas.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Button 
              size="lg" 
              className="pulse-glow min-w-[200px]"
              onClick={() => window.location.href = '/search'}
            >
              Explorar Modelos
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="min-w-[200px] border-platinum text-platinum hover:bg-platinum hover:text-jet-black"
              onClick={() => window.location.href = '/register?type=model'}
            >
              Soy Modelo
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={scrollToContent}
          className="flex flex-col items-center space-y-2 text-platinum/60 hover:text-platinum transition-colors group"
        >
          <span className="font-montserrat text-sm tracking-widest uppercase">Descubrir</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 group-hover:text-deep-magenta transition-colors" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};