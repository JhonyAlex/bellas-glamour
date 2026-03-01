"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface AgeGateProps {
  onVerified: () => void;
}

export function AgeGate({ onVerified }: AgeGateProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = (isAdult: boolean) => {
    if (isAdult) {
      setIsLoading(true);
      localStorage.setItem("bellas-glamour-age-verified", "true");
      setTimeout(() => {
        onVerified();
      }, 300);
    } else {
      window.location.href = "https://www.google.com";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4"
    >
      <div className="text-center max-w-sm w-full">
        {/* Logo */}
        <div className="mb-8">
          <span className="font-serif text-4xl font-bold text-gold-gradient">
            Bellas
          </span>
          <span className="font-serif text-lg tracking-[0.3em] text-gold-400 block -mt-1">
            GLAMOUR
          </span>
        </div>

        {/* 18+ Warning */}
        <div className="mb-8">
          <div className="text-6xl font-bold text-gold-400 mb-4">18+</div>
          <p className="text-gray-300 text-lg">
            Este sitio contiene contenido exclusivo para adultos.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => handleVerify(true)}
            disabled={isLoading}
            className="w-full btn-luxury text-lg py-6"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              "Soy mayor de 18 años"
            )}
          </Button>

          <Button
            onClick={() => handleVerify(false)}
            variant="ghost"
            className="w-full text-gray-400 hover:text-white hover:bg-white/5 py-4 text-base"
          >
            Salir
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
