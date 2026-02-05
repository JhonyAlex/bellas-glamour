import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { getApprovedModels, Model, ModelPhoto } from '../../lib/supabase';

interface DisplayModel {
  id: string;
  artistic_name: string;
  age?: number;
  nationality: string;
  height_cm?: number;
  mainPhoto?: string;
  measurements?: {
    bust: number;
    waist: number;
    hips: number;
  };
  model_photos?: ModelPhoto[];
}

interface ModelCardProps {
  model: DisplayModel;
  index: number;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, index }) => {
  const mainPhoto = model.model_photos?.find(p => p.is_approved && p.is_primary)?.photo_url || 
                   model.model_photos?.find(p => p.is_approved)?.photo_url;
  
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
          src={mainPhoto ? `${mainPhoto}&width=500&quality=80&format=webp` : 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
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
        {model.height_cm && model.measurements && (
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
        )}
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
            {model.height_cm && <span>{model.height_cm}cm</span>}
            {model.height_cm && model.nationality && <span>•</span>}
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
  const [models, setModels] = useState<DisplayModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const { data, error } = await getApprovedModels(6, 0);
        
        if (error) {
          setError('Error al cargar modelos');
          console.error('Error fetching models:', error);
        } else if (data) {
          setModels(data);
        }
      } catch (err) {
        setError('Error al cargar modelos');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-jet-black to-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-playfair text-display text-platinum mb-4">
              Modelos <span className="text-deep-magenta">Destacadas</span>
            </h2>
            <div className="text-platinum/70">Cargando modelos...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-jet-black to-dark-gray">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-playfair text-display text-platinum mb-4">
              Modelos <span className="text-deep-magenta">Destacadas</span>
            </h2>
            <div className="text-red-500">{error}</div>
          </div>
        </div>
      </section>
    );
  }

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
          {models.map((model, index) => (
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