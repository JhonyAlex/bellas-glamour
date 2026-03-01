"use client";

import { motion } from "framer-motion";
import { Eye, Heart, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ModelCardProps {
  model: {
    id: string;
    artisticName: string | null;
    bio: string | null;
    height: number | null;
    eyeColor: string | null;
    hairColor: string | null;
    location: string | null;
    featured: boolean;
    views: number;
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
    photos: Array<{
      id: string;
      url: string;
      isProfilePhoto: boolean;
    }>;
  };
  index?: number;
}

export function ModelCard({ model, index = 0 }: ModelCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const profilePhoto = model.photos.find((p) => p.isProfilePhoto) || model.photos[0];
  const displayName = model.artisticName || model.user.name || "Modelo";

  const placeholderImage = `https://picsum.photos/seed/${model.id}/400/600`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/modelos/${model.id}`}>
        {/* Card Container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-900">
          {/* Image */}
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={imageError ? placeholderImage : (profilePhoto?.url || placeholderImage)}
              alt={displayName}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onError={() => setImageError(true)}
            />
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

          {/* Featured Badge */}
          {model.featured && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-4 left-4"
            >
              <div className="bg-gold-500 text-black text-xs font-bold px-3 py-1 rounded-sm">
                DESTACADA
              </div>
            </motion.div>
          )}

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            {/* Name */}
            <motion.h3
              layout
              className="font-serif text-xl md:text-2xl text-white font-bold"
            >
              {displayName}
            </motion.h3>

            {/* Stats - Show on hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              className="mt-2 space-y-1"
            >
              {model.height && (
                <p className="text-gray-300 text-sm">
                  {model.height} cm
                </p>
              )}
              {model.eyeColor && (
                <p className="text-gray-300 text-sm capitalize">
                  Ojos {model.eyeColor}
                </p>
              )}
              {model.location && (
                <div className="flex items-center text-gray-400 text-sm mt-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  {model.location}
                </div>
              )}
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="flex items-center justify-between mt-4 pt-4 border-t border-white/20"
            >
              <div className="flex items-center text-gray-400 text-sm">
                <Eye className="w-4 h-4 mr-1" />
                {model.views} vistas
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-gold-400"
              >
                <Heart className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </div>

          {/* Gold Border on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 border-2 border-gold-500 rounded-sm pointer-events-none"
          />
        </div>
      </Link>
    </motion.div>
  );
}
