"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Ruler, Eye, Heart, Instagram, Twitter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Photo {
  id: string;
  url: string;
  title?: string | null;
  isProfilePhoto: boolean;
}

interface Model {
  id: string;
  artisticName: string | null;
  bio: string | null;
  height: number | null;
  weight: number | null;
  eyeColor: string | null;
  hairColor: string | null;
  skinTone?: string | null;
  measurements: string | null;
  shoeSize?: number | null;
  hobbies?: string | null;
  languages?: string | null;
  skills?: string | null;
  location: string | null;
  nationality?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  tiktok?: string | null;
  featured: boolean;
  views: number;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  photos: Photo[];
}

interface ModelProfileProps {
  model: Model | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ModelProfile({ model, isOpen, onClose }: ModelProfileProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  if (!model) return null;

  const displayName = model.artisticName || model.user.name || "Modelo";
  const placeholderImage = `https://picsum.photos/seed/${model.id}/800/1200`;

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % model.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + model.photos.length) % model.photos.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full h-full md:h-auto md:max-w-5xl md:max-h-[90vh] bg-card md:rounded-lg overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo Section */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto flex-shrink-0">
              {model.photos.length > 0 ? (
                <>
                  <img
                    src={model.photos[currentPhotoIndex]?.url || placeholderImage}
                    alt={displayName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = placeholderImage;
                    }}
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
                <img
                  src={placeholderImage}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Info Section */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
                    {displayName}
                  </h2>
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

              {/* Social Links */}
              {(model.instagram || model.twitter || model.tiktok) && (
                <div className="flex space-x-3 mb-6">
                  {model.instagram && (
                    <a
                      href={`https://instagram.com/${model.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {model.twitter && (
                    <a
                      href={`https://twitter.com/${model.twitter.replace('@', '')}`}
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

              {/* Photo Gallery Toggle */}
              {model.photos.length > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setShowGallery(!showGallery)}
                  className="w-full mt-6 border-gold-500/30 text-gold-400 hover:bg-gold-500/10"
                >
                  Ver todas las fotos ({model.photos.length})
                </Button>
              )}

              {/* Thumbnail Gallery */}
              <AnimatePresence>
                {showGallery && model.photos.length > 1 && (
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
                        className={`aspect-square rounded overflow-hidden ${
                          currentPhotoIndex === index
                            ? "ring-2 ring-gold-500"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={photo.url}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = placeholderImage;
                          }}
                        />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
