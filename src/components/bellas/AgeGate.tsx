"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, Wine } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AgeGateProps {
  onVerified: () => void;
}

export function AgeGate({ onVerified }: AgeGateProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleVerify = (isAdult: boolean) => {
    if (isAdult) {
      setIsLoading(true);
      // Save verification to localStorage
      localStorage.setItem("bellas-glamour-age-verified", "true");
      setTimeout(() => {
        onVerified();
      }, 500);
    } else {
      // Redirect to a safe site
      window.location.href = "https://www.google.com";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern opacity-50" />
      
      {/* Gold Lines */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative max-w-lg w-full"
      >
        <div className="bg-card border border-gold-500/30 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="p-8 text-center border-b border-gold-500/20 bg-gradient-to-b from-gold-500/5 to-transparent">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-gold-500/50 flex items-center justify-center bg-black/50"
            >
              <Shield className="w-10 h-10 text-gold-400" />
            </motion.div>

            {/* Logo */}
            <div className="mb-4">
              <span className="font-serif text-3xl font-bold text-gold-gradient">
                Bellas
              </span>
              <span className="font-serif text-lg tracking-[0.3em] text-gold-400 block -mt-1">
                GLAMOUR
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl text-white mb-2">
              Verificación de Edad
            </h1>
          </div>

          {/* Body */}
          <div className="p-8 text-center">
            {/* Warning */}
            <div className="flex items-center justify-center mb-6 text-yellow-400/80">
              <AlertTriangle className="w-5 h-5 mr-2" />
              <span className="text-sm">Contenido exclusivo para adultos</span>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-4 leading-relaxed">
              Este sitio web contiene material destinado únicamente a personas 
              mayores de <strong className="text-gold-400">18 años</strong>.
            </p>

            <p className="text-gray-400 text-sm mb-6">
              Al continuar, confirmas que eres mayor de edad según las leyes 
              de tu país de residencia y aceptas ver contenido para adultos.
            </p>

            {/* Age Restriction Badge */}
            <div className="inline-flex items-center bg-gold-500/10 border border-gold-500/30 rounded-lg px-4 py-2 mb-8">
              <Wine className="w-5 h-5 text-gold-400 mr-2" />
              <span className="text-gold-400 font-bold text-lg">18+</span>
              <span className="text-gray-400 ml-2 text-sm">Años</span>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => handleVerify(true)}
                disabled={isLoading}
                className="w-full btn-luxury text-lg py-6"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                  />
                ) : (
                  "Soy mayor de 18 años - Entrar"
                )}
              </Button>

              <Button
                onClick={() => handleVerify(false)}
                variant="ghost"
                className="w-full text-gray-400 hover:text-white hover:bg-white/5 py-4"
              >
                Soy menor de edad - Salir
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-black/30 border-t border-gold-500/10">
            <p className="text-gray-500 text-xs text-center">
              © {new Date().getFullYear()} Bellas Glamour. Todos los derechos reservados.
            </p>
          </div>
        </div>

        {/* Terms */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-500 text-xs mt-6 px-4"
        >
          Al acceder a este sitio, aceptas nuestros{" "}
          <span className="text-gray-400">Términos de Servicio</span> y{" "}
          <span className="text-gray-400">Política de Privacidad</span>.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
