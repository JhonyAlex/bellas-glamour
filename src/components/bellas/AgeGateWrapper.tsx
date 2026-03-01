"use client";

import { useState, useEffect } from "react";
import { AgeGate } from "./AgeGate";

interface AgeGateWrapperProps {
  children: React.ReactNode;
}

export function AgeGateWrapper({ children }: AgeGateWrapperProps) {
  const [isVerified, setIsVerified] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verified = localStorage.getItem("bellas-glamour-age-verified");
    if (verified === "true") {
      setIsVerified(true);
    }
    setIsChecking(false);
  }, []);

  const handleVerified = () => {
    setIsVerified(true);
  };

  if (isChecking) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center">
          <span className="font-serif text-3xl font-bold text-gold-gradient">Bellas</span>
          <span className="font-serif text-sm tracking-[0.3em] text-gold-400 block -mt-1">GLAMOUR</span>
        </div>
      </div>
    );
  }

  if (!isVerified) {
    return <AgeGate onVerified={handleVerified} />;
  }

  return <>{children}</>;
}
