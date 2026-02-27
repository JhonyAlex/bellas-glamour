'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ModelCard, { ModelType } from './ModelCard';
import ModelProfile from './ModelProfile';

interface ModelGridProps {
  models: ModelType[];
  isLoading: boolean;
}

const specialties = [
  'All',
  'Fashion',
  'Commercial',
  'Editorial',
  'Runway',
  'Fitness',
  'Glamour',
  'Plus Size',
  'Petite',
];

const locations = [
  'All',
  'New York',
  'Los Angeles',
  'Paris',
  'Milan',
  'London',
  'Tokyo',
  'São Paulo',
];

export default function ModelGrid({ models, isLoading }: ModelGridProps) {
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelType | null>(null);

  const filteredModels = models.filter((model) => {
    const matchesSearch =
      !search ||
      model.artisticName?.toLowerCase().includes(search.toLowerCase()) ||
      model.location?.toLowerCase().includes(search.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === 'All' ||
      model.specialties?.toLowerCase().includes(selectedSpecialty.toLowerCase());

    const matchesLocation =
      selectedLocation === 'All' ||
      model.location?.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  return (
    <section id="models" className="py-20 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-[#D4AF37] tracking-[0.3em] uppercase text-sm">
              Our Talents
            </span>
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Our <span className="text-[#D4AF37]">Models</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our curated selection of elite models, each bringing their unique
            elegance and professional excellence to every project.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                placeholder="Search models by name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-black/50 border-[#D4AF37]/30 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              <ChevronDown
                className={`w-4 h-4 ml-2 transition-transform ${
                  showFilters ? 'rotate-180' : ''
                }`}
              />
            </Button>
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-black/50 border border-[#D4AF37]/20 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Specialty Filter */}
                  <div>
                    <Label className="text-gray-400 mb-2 block">Specialty</Label>
                    <Select
                      value={selectedSpecialty}
                      onValueChange={setSelectedSpecialty}
                    >
                      <SelectTrigger className="bg-black border-[#D4AF37]/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-[#D4AF37]/30">
                        {specialties.map((s) => (
                          <SelectItem
                            key={s}
                            value={s}
                            className="text-white focus:bg-[#D4AF37]/20 focus:text-[#D4AF37]"
                          >
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <Label className="text-gray-400 mb-2 block">Location</Label>
                    <Select
                      value={selectedLocation}
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger className="bg-black border-[#D4AF37]/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-[#D4AF37]/30">
                        {locations.map((l) => (
                          <SelectItem
                            key={l}
                            value={l}
                            className="text-white focus:bg-[#D4AF37]/20 focus:text-[#D4AF37]"
                          >
                            {l}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <Button
                      onClick={() => {
                        setSearch('');
                        setSelectedSpecialty('All');
                        setSelectedLocation('All');
                      }}
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-gray-400"
        >
          Showing {filteredModels.length} of {models.length} models
        </motion.div>

        {/* Models Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-gray-900 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : filteredModels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredModels.map((model, index) => (
              <ModelCard
                key={model.id}
                model={model}
                index={index}
                onClick={() => setSelectedModel(model)}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">
              No models found matching your criteria.
            </p>
            <Button
              onClick={() => {
                setSearch('');
                setSelectedSpecialty('All');
                setSelectedLocation('All');
              }}
              variant="outline"
              className="mt-4 border-[#D4AF37] text-[#D4AF37]"
            >
              Reset Filters
            </Button>
          </motion.div>
        )}

        {/* Model Profile Modal */}
        <ModelProfile
          model={selectedModel}
          isOpen={!!selectedModel}
          onClose={() => setSelectedModel(null)}
        />
      </div>
    </section>
  );
}
