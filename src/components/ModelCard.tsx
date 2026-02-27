'use client';

import { motion } from 'framer-motion';
import { MapPin, Instagram, Star, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface ModelType {
  id: string;
  artisticName: string | null;
  bio: string | null;
  location: string | null;
  height: number | null;
  specialties: string | null;
  instagram: string | null;
  featured: boolean;
  views: number;
  photos: { url: string; isProfilePhoto: boolean }[];
}

interface ModelCardProps {
  model: ModelType;
  index: number;
  onClick: () => void;
}

export default function ModelCard({ model, index, onClick }: ModelCardProps) {
  const profilePhoto = model.photos.find((p) => p.isProfilePhoto)?.url || 
    model.photos[0]?.url || 
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        onClick={onClick}
        className="group relative overflow-hidden bg-black border border-[#D4AF37]/20 rounded-lg cursor-pointer transition-all duration-500 hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={profilePhoto}
            alt={model.artisticName || 'Model'}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          {/* Featured Badge */}
          {model.featured && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-3 left-3"
            >
              <Badge className="bg-[#D4AF37] text-black border-0">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </motion.div>
          )}

          {/* Views */}
          <div className="absolute top-3 right-3 flex items-center gap-1 text-white/70 text-sm">
            <Eye className="w-3 h-3" />
            {model.views}
          </div>

          {/* Quick Info on Hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-16 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {model.specialties && (
              <div className="flex flex-wrap gap-1">
                {model.specialties.split(',').slice(0, 3).map((specialty, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="bg-black/50 border-[#D4AF37]/50 text-[#D4AF37] text-xs"
                  >
                    {specialty.trim()}
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-4 bg-gradient-to-t from-black to-transparent">
          <h3 className="font-serif text-xl font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
            {model.artisticName || 'Anonymous'}
          </h3>
          
          {model.location && (
            <div className="flex items-center gap-1 text-gray-400 text-sm mb-2">
              <MapPin className="w-3 h-3" />
              <span>{model.location}</span>
            </div>
          )}

          {model.height && (
            <p className="text-gray-500 text-xs">
              {Math.floor(model.height / 100)}m {(model.height % 100).toFixed(0)}cm
            </p>
          )}

          {/* Social Links */}
          {model.instagram && (
            <motion.a
              href={`https://instagram.com/${model.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[#D4AF37] text-sm mt-2 hover:underline"
              whileHover={{ scale: 1.05 }}
            >
              <Instagram className="w-3 h-3" />
              {model.instagram}
            </motion.a>
          )}
        </div>

        {/* Gold Accent Line */}
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-500" />
      </Card>
    </motion.div>
  );
}
