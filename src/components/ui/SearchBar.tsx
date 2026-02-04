import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  placeholder?: string;
}

export interface SearchFilters {
  age_min?: number;
  age_max?: number;
  height_min?: number;
  height_max?: number;
  nationality?: string;
  eye_color?: string;
  hair_color?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Buscar modelos por nombre o características..." 
}) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, filters);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const nationalities = ['Francesa', 'Española', 'Italiana', 'Argentina', 'Colombiana', 'Brasileña', 'Alemana', 'Rusa'];
  const eyeColors = ['Marrón', 'Verde', 'Azul', 'Gris', 'Avellana'];
  const hairColors = ['Negro', 'Castaño', 'Rubio', 'Pelirrojo', 'Gris'];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-dark-gray/80 backdrop-blur-sm border border-medium-gray rounded-sm overflow-hidden focus-within:border-deep-magenta focus-within:ring-1 focus-within:ring-deep-magenta transition-all duration-300">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 border-0 bg-transparent text-platinum placeholder-light-gray focus:ring-0"
            leftIcon={<Search className="w-5 h-5 text-light-gray" />}
          />
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="border-l border-medium-gray rounded-none"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Filtros</span>
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="rounded-none"
          >
            Buscar
          </Button>
        </div>

        {/* Filtros desplegables */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-full left-0 right-0 bg-dark-gray border border-medium-gray rounded-sm mt-2 p-6 z-50"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-playfair text-platinum text-lg font-semibold">Filtros Avanzados</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                  >
                    Limpiar
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Edad */}
                <div className="space-y-3">
                  <label className="font-montserrat text-sm font-medium text-platinum">Edad</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.age_min || ''}
                      onChange={(e) => handleFilterChange('age_min', e.target.value ? parseInt(e.target.value) : undefined)}
                      className="text-sm"
                    />
                    <span className="text-light-gray">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.age_max || ''}
                      onChange={(e) => handleFilterChange('age_max', e.target.value ? parseInt(e.target.value) : undefined)}
                      className="text-sm"
                    />
                  </div>
                </div>

                {/* Estatura */}
                <div className="space-y-3">
                  <label className="font-montserrat text-sm font-medium text-platinum">Estatura (cm)</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.height_min || ''}
                      onChange={(e) => handleFilterChange('height_min', e.target.value ? parseInt(e.target.value) : undefined)}
                      className="text-sm"
                    />
                    <span className="text-light-gray">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.height_max || ''}
                      onChange={(e) => handleFilterChange('height_max', e.target.value ? parseInt(e.target.value) : undefined)}
                      className="text-sm"
                    />
                  </div>
                </div>

                {/* Nacionalidad */}
                <div className="space-y-3">
                  <label className="font-montserrat text-sm font-medium text-platinum">Nacionalidad</label>
                  <select
                    value={filters.nationality || ''}
                    onChange={(e) => handleFilterChange('nationality', e.target.value || undefined)}
                    className="input-luxury w-full text-sm"
                  >
                    <option value="">Todas</option>
                    {nationalities.map(nat => (
                      <option key={nat} value={nat}>{nat}</option>
                    ))}
                  </select>
                </div>

                {/* Color de ojos */}
                <div className="space-y-3">
                  <label className="font-montserrat text-sm font-medium text-platinum">Color de Ojos</label>
                  <select
                    value={filters.eye_color || ''}
                    onChange={(e) => handleFilterChange('eye_color', e.target.value || undefined)}
                    className="input-luxury w-full text-sm"
                  >
                    <option value="">Todos</option>
                    {eyeColors.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>

                {/* Color de cabello */}
                <div className="space-y-3">
                  <label className="font-montserrat text-sm font-medium text-platinum">Color de Cabello</label>
                  <select
                    value={filters.hair_color || ''}
                    onChange={(e) => handleFilterChange('hair_color', e.target.value || undefined)}
                    className="input-luxury w-full text-sm"
                  >
                    <option value="">Todos</option>
                    {hairColors.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-medium-gray">
                <Button type="submit" variant="primary">
                  Aplicar Filtros
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};