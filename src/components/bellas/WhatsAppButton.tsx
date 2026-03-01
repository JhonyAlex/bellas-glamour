"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhatsAppButtonProps {
  phoneNumber: string;
  modelName?: string;
}

export function WhatsAppButton({ phoneNumber, modelName }: WhatsAppButtonProps) {
  const cleanNumber = phoneNumber.replace(/[^\d]/g, "");
  const message = encodeURIComponent(
    `Hola, me interesa contactar a ${modelName || "la modelo"} a través de Bellas Glamour.`
  );
  const url = `https://wa.me/${cleanNumber}?text=${message}`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3">
        <MessageCircle className="w-5 h-5 mr-2" />
        Contactar por WhatsApp
      </Button>
    </a>
  );
}
