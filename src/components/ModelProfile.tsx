'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Ruler, Instagram, Twitter, Eye, Calendar, Globe, Award, Heart } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ModelType } from './ModelCard';

interface ModelProfileProps {
  model: ModelType | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModelProfile({ model, isOpen, onClose }: ModelProfileProps) {
  if (!model) return null;

  const profilePhoto = model.photos.find((p) => p.isProfilePhoto)?.url ||
    model.photos[0]?.url ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80';

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl w-full bg-black border-[#D4AF37]/30 text-white p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-[#D4AF37] hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
            {/* Image Section */}
            <div className="relative">
              <img
                src={profilePhoto}
                alt={model.artisticName || 'Model'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              {/* Featured Badge */}
              {model.featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#D4AF37] text-black">
                    <Award className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-8 overflow-y-auto max-h-[80vh] scrollbar-luxury">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                  {model.artisticName || 'Anonymous'}
                </h2>

                {model.location && (
                  <div className="flex items-center gap-2 text-[#D4AF37] mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-gray-300">{model.location}</span>
                  </div>
                )}

                {/* Stats */}
                <div className="flex gap-6 mb-6 text-sm">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Eye className="w-4 h-4" />
                    <span>{model.views} views</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Heart className="w-4 h-4" />
                    <span>Like</span>
                  </div>
                </div>

                {/* Bio */}
                {model.bio && (
                  <div className="mb-6">
                    <h3 className="text-[#D4AF37] font-semibold mb-2">About</h3>
                    <p className="text-gray-300 leading-relaxed">{model.bio}</p>
                  </div>
                )}

                {/* Physical Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {model.height && (
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <Ruler className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wide">Height</span>
                      </div>
                      <p className="text-white font-semibold">
                        {Math.floor(model.height / 100)}&apos;{(model.height % 100).toFixed(0)}&quot;
                      </p>
                    </div>
                  )}
                </div>

                {/* Specialties */}
                {model.specialties && (
                  <div className="mb-6">
                    <h3 className="text-[#D4AF37] font-semibold mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {model.specialties.split(',').map((specialty, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="border-[#D4AF37]/50 text-[#D4AF37]"
                        >
                          {specialty.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Links */}
                <div className="mb-6">
                  <h3 className="text-[#D4AF37] font-semibold mb-2">Social Media</h3>
                  <div className="flex gap-3">
                    {model.instagram && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                        asChild
                      >
                        <a
                          href={`https://instagram.com/${model.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Instagram className="w-4 h-4 mr-2" />
                          Instagram
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Photo Gallery */}
                {model.photos.length > 1 && (
                  <div>
                    <h3 className="text-[#D4AF37] font-semibold mb-2">Gallery</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {model.photos.slice(0, 6).map((photo, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="aspect-square overflow-hidden rounded-lg"
                        >
                          <img
                            src={photo.url}
                            alt={`Photo ${i + 1}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Button */}
                <div className="mt-8">
                  <Button
                    className="w-full bg-[#D4AF37] text-black hover:bg-[#B8860B] font-semibold py-6"
                  >
                    Request Booking
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
