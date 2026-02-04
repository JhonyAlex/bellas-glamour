import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

interface Model {
  id: string;
  artistic_name: string;
  age: number;
  nationality: string;
  height_cm: number;
  main_photo: string;
  measurements: {
    bust: number;
    waist: number;
    hips: number;
  };
}

// Mock data con imágenes reales de Unsplash
const featuredModels: Model[] = [
  {
    id: '1',
    artistic_name: 'Valentina Rouge',
    age: 24,
    nationality: 'Francesa',
    height_cm: 178,
    main_photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    measurements: { bust: 90, waist: 62, hips: 92 }
  },
  {
    id: '2',
    artistic_name: 'Sofia Noche',
    age: 22,
    nationality: 'Española',
    height_cm: 175,
    main_photo: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    measurements: { bust: 88, waist: 60, hips: 90 }
  },
  {
    id: '3',
    artistic_name: 'Isabella Luna',
    age: 26,
    nationality: 'Italiana',
    height_cm: 180,
    main_photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    measurements: { bust: 92, waist: 64, hips: 94 }
  },
  {
    id: '4',
    artistic_name: 'Carmen Estrella',
    age: 23,
    nationality: 'Argentina',
    height_cm: 176,
    main_photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    measurements: { bust: 89, waist: 61, hips: 91 }
  }
];

interface ModelCardProps {
  model: Model;
  index: number;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="model-card group cursor-pointer"
    >
      {/* Imagen con optimización de Supabase CDN */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={`${model.main_photo}&width=500&quality=80&format=webp`}
          alt={model.artistic_name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay gradient */}
        <div className="model-card-overlay" />
        
        {/* Hover overlay con información */}
        <div className="absolute inset-0 bg-overlay-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center space-y-2">
            <Eye className="w-8 h-8 text-platinum mx-auto" />
            <span className="font-montserrat text-platinum text-sm">Ver Perfil</span>
          </div>
        </div>
        
        {/* Stats overlay en hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-jet-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="space-y-1 text-xs font-montserrat text-platinum/90">
            <div className="flex justify-between">
              <span>Estatura:</span>
              <span className="text-deep-magenta font-semibold">{model.height_cm}cm</span>
            </div>
            <div className="flex justify-between">
              <span>Medidas:</span>
              <span className="text-deep-magenta font-semibold">
                {model.measurements.bust}-{model.measurements.waist}-{model.measurements.hips}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Información del modelo */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-playfair text-platinum text-lg font-semibold group-hover:text-deep-magenta transition-colors">
            {model.artistic_name}
          </h3>
          <p className="font-montserrat text-light-gray text-sm">
            {model.age} años • {model.nationality}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs font-montserrat text-light-gray">
            <span>{model.height_cm}cm</span>
            <span>•</span>
            <span>{model.nationality}</span>
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            className="text-deep-magenta hover:text-platinum"
            onClick={() => window.location.href = `/model/${model.id}`}
          >
            Ver Perfil
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export const FeaturedModels: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-jet-black to-dark-gray">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-display text-platinum mb-4">
            Modelos <span className="text-deep-magenta">Destacadas</span>
          </h2>
          <p className="font-montserrat text-xl text-platinum/70 max-w-2xl mx-auto">
            Descubre a las modelos más exclusivas de nuestra plataforma. 
            Belleza, elegancia y profesionalismo en cada perfil.
          </p>
        </motion.div>
        
        {/* Grid Masonry */}
        <div className="masonry-grid">
          {featuredModels.map((model, index) => (
            <div key={model.id} className="masonry-item">
              <ModelCard model={model} index={index} />
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-transparent border-2 border-deep-magenta text-deep-magenta hover:bg-deep-magenta hover:text-platinum"
            onClick={() => window.location.href = '/search'}
          >
            Ver Todas las Modelos
          </Button>
        </motion.div>
      </div>
    </section>
  );
};