"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ModelCard } from "./ModelCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Model {
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
}

interface ModelGridProps {
  onModelClick: (model: Model) => void;
}

const eyeColors = [
  { value: "all", label: "Todos" },
  { value: "negro", label: "Negro" },
  { value: "marrón", label: "Marrón" },
  { value: "verde", label: "Verde" },
  { value: "azul", label: "Azul" },
  { value: "gris", label: "Gris" },
  { value: "miel", label: "Miel" },
];

const heightRanges = [
  { value: "all", label: "Todas" },
  { value: "150-160", label: "150 - 160 cm" },
  { value: "160-170", label: "160 - 170 cm" },
  { value: "170-180", label: "170 - 180 cm" },
  { value: "180-190", label: "180 - 190 cm" },
  { value: "190-200", label: "190+ cm" },
];

const hairColors = [
  { value: "all", label: "Todos" },
  { value: "negro", label: "Negro" },
  { value: "castaño", label: "Castaño" },
  { value: "rubio", label: "Rubio" },
  { value: "pelirrojo", label: "Pelirrojo" },
  { value: "gris", label: "Gris" },
];

export function ModelGrid({ onModelClick }: ModelGridProps) {
  const [models, setModels] = useState<Model[]>([]);
  const [filteredModels, setFilteredModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEyeColor, setSelectedEyeColor] = useState("all");
  const [selectedHeight, setSelectedHeight] = useState("all");
  const [selectedHairColor, setSelectedHairColor] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchModels();
  }, []);

  useEffect(() => {
    filterModels();
  }, [models, searchQuery, selectedEyeColor, selectedHeight, selectedHairColor]);

  const fetchModels = async () => {
    try {
      const response = await fetch("/api/models");
      if (response.ok) {
        const data = await response.json();
        setModels(data);
        setFilteredModels(data);
      }
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterModels = () => {
    let filtered = [...models];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (model) =>
          model.artisticName?.toLowerCase().includes(query) ||
          model.user.name?.toLowerCase().includes(query)
      );
    }

    // Eye color filter
    if (selectedEyeColor !== "all") {
      filtered = filtered.filter(
        (model) => model.eyeColor?.toLowerCase() === selectedEyeColor
      );
    }

    // Height filter
    if (selectedHeight !== "all") {
      const [min, max] = selectedHeight.split("-").map(Number);
      filtered = filtered.filter(
        (model) => model.height && model.height >= min && model.height <= max
      );
    }

    // Hair color filter
    if (selectedHairColor !== "all") {
      filtered = filtered.filter(
        (model) => model.hairColor?.toLowerCase() === selectedHairColor
      );
    }

    setFilteredModels(filtered);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedEyeColor("all");
    setSelectedHeight("all");
    setSelectedHairColor("all");
  };

  const hasActiveFilters =
    searchQuery ||
    selectedEyeColor !== "all" ||
    selectedHeight !== "all" ||
    selectedHairColor !== "all";

  return (
    <section id="modelos" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestras <span className="text-gold-gradient">Modelos</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Descubre el talento más exclusivo. Cada modelo aporta su esencia única 
            a nuestros proyectos de moda y publicidad.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar modelo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/50 border-gold-500/30 focus:border-gold-500 text-white"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`border-gold-500/30 ${
                showFilters ? "bg-gold-500/10 text-gold-400" : "text-gray-300"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filtros
              {hasActiveFilters && (
                <span className="ml-2 w-2 h-2 bg-gold-400 rounded-full" />
              )}
            </Button>
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-black/30 rounded-lg border border-gold-500/20">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Color de Ojos</label>
                    <Select value={selectedEyeColor} onValueChange={setSelectedEyeColor}>
                      <SelectTrigger className="bg-black/50 border-gold-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {eyeColors.map((color) => (
                          <SelectItem key={color.value} value={color.value}>
                            {color.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Altura</label>
                    <Select value={selectedHeight} onValueChange={setSelectedHeight}>
                      <SelectTrigger className="bg-black/50 border-gold-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {heightRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Color de Cabello</label>
                    <Select value={selectedHairColor} onValueChange={setSelectedHairColor}>
                      <SelectTrigger className="bg-black/50 border-gold-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {hairColors.map((color) => (
                          <SelectItem key={color.value} value={color.value}>
                            {color.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {hasActiveFilters && (
                    <div className="sm:col-span-3 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Limpiar filtros
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-400 text-sm">
            {filteredModels.length} {filteredModels.length === 1 ? "modelo encontrada" : "modelos encontradas"}
          </p>
        </div>

        {/* Models Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-gray-800 rounded-sm animate-pulse" />
            ))}
          </div>
        ) : filteredModels.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-400 text-lg mb-4">
              No se encontraron modelos con los filtros seleccionados.
            </p>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="border-gold-500/30 text-gold-400"
            >
              Limpiar filtros
            </Button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            <AnimatePresence>
              {filteredModels.map((model, index) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  onClick={() => onModelClick(model)}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
