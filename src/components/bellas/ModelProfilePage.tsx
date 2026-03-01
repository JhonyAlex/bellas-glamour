"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, MapPin, Eye, Instagram, Twitter, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AuthModal } from "./AuthModal";
import { WhatsAppButton } from "./WhatsAppButton";
import type { Model } from "@/types/models";

interface ModelProfilePageProps {
  model: Model;
}

export function ModelProfilePage({ model }: ModelProfilePageProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const displayName = model.artisticName || model.user.name || "Modelo";
  const placeholderImage = `https://picsum.photos/seed/${model.id}/800/1200`;

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % model.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + model.photos.length) % model.photos.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onLoginClick={() => setShowAuthModal(true)} />

      <main className="flex-1 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Link href="/">
            <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Photo Section */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-900">
                {model.photos.length > 0 ? (
                  <>
                    <Image
                      src={model.photos[currentPhotoIndex]?.url || placeholderImage}
                      alt={displayName}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />

                    {/* Photo Navigation */}
                    {model.photos.length > 1 && (
                      <>
                        <button
                          onClick={prevPhoto}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextPhoto}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        {/* Photo Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                          {currentPhotoIndex + 1} / {model.photos.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <Image
                    src={placeholderImage}
                    alt={displayName}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>

              {/* Thumbnail Gallery */}
              {model.photos.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShowGallery(!showGallery)}
                    className="w-full mt-4 border-gold-500/30 text-gold-400 hover:bg-gold-500/10"
                  >
                    Ver todas las fotos ({model.photos.length})
                  </Button>

                  <AnimatePresence>
                    {showGallery && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 grid grid-cols-4 gap-2"
                      >
                        {model.photos.map((photo, index) => (
                          <button
                            key={photo.id}
                            onClick={() => setCurrentPhotoIndex(index)}
                            className={`aspect-square rounded overflow-hidden relative ${
                              currentPhotoIndex === index
                                ? "ring-2 ring-gold-500"
                                : "opacity-60 hover:opacity-100"
                            }`}
                          >
                            <Image
                              src={photo.url}
                              alt={`Foto ${index + 1}`}
                              fill
                              unoptimized
                              className="object-cover"
                              sizes="100px"
                            />
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>

            {/* Info Section */}
            <div className="flex-1">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">
                    {displayName}
                  </h1>
                  {model.featured && (
                    <span className="bg-gold-500 text-black text-xs font-bold px-3 py-1 rounded-sm">
                      DESTACADA
                    </span>
                  )}
                </div>

                {model.location && (
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-1 text-gold-400" />
                    {model.location}
                  </div>
                )}
              </div>

              {/* Bio */}
              {model.bio && (
                <div className="mb-6">
                  <p className="text-gray-300 leading-relaxed">{model.bio}</p>
                </div>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {model.height && (
                  <div className="bg-black/30 rounded-lg p-4 border border-gold-500/20">
                    <p className="text-gray-400 text-sm mb-1">Altura</p>
                    <p className="text-white font-semibold">{model.height} cm</p>
                  </div>
                )}
                {model.eyeColor && (
                  <div className="bg-black/30 rounded-lg p-4 border border-gold-500/20">
                    <p className="text-gray-400 text-sm mb-1">Color de Ojos</p>
                    <p className="text-white font-semibold capitalize">{model.eyeColor}</p>
                  </div>
                )}
                {model.hairColor && (
                  <div className="bg-black/30 rounded-lg p-4 border border-gold-500/20">
                    <p className="text-gray-400 text-sm mb-1">Color de Cabello</p>
                    <p className="text-white font-semibold capitalize">{model.hairColor}</p>
                  </div>
                )}
                {model.measurements && (
                  <div className="bg-black/30 rounded-lg p-4 border border-gold-500/20">
                    <p className="text-gray-400 text-sm mb-1">Medidas</p>
                    <p className="text-white font-semibold">{model.measurements}</p>
                  </div>
                )}
              </div>

              {/* Additional Info */}
              {(model.hobbies || model.languages || model.skills) && (
                <div className="mb-6 space-y-3">
                  {model.hobbies && (
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Intereses</p>
                      <p className="text-white">{model.hobbies}</p>
                    </div>
                  )}
                  {model.languages && (
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Idiomas</p>
                      <p className="text-white">{model.languages}</p>
                    </div>
                  )}
                  {model.skills && (
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Habilidades</p>
                      <p className="text-white">{model.skills}</p>
                    </div>
                  )}
                </div>
              )}

              {/* WhatsApp Button */}
              {model.whatsappAvailable && model.phoneNumber && (
                <div className="mb-6">
                  <WhatsAppButton phoneNumber={model.phoneNumber} modelName={displayName} />
                </div>
              )}

              {/* Social Links */}
              {(model.instagram || model.twitter || model.tiktok) && (
                <div className="flex space-x-3 mb-6">
                  {model.instagram && (
                    <a
                      href={`https://instagram.com/${model.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {model.twitter && (
                    <a
                      href={`https://twitter.com/${model.twitter.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center space-x-6 text-gray-400 text-sm pt-4 border-t border-gold-500/20">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {model.views} vistas
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
