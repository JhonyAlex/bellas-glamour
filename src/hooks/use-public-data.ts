import { useQuery } from "@tanstack/react-query";

// Tipos para el grid público de modelos
interface PublicModel {
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

// Tipos para el slider
interface SliderSlide {
  id: number | string;
  image: string;
  title: string;
  subtitle: string;
}

// Hook para modelos públicos (usado en ModelGrid)
export function usePublicModels() {
  return useQuery<PublicModel[]>({
    queryKey: ["public-models"],
    queryFn: async () => {
      const res = await fetch("/api/models");
      if (!res.ok) throw new Error("Error al cargar modelos");
      return res.json();
    },
    staleTime: 15_000,
    refetchInterval: 30_000, // Auto-refresca cada 30s
  });
}

// Hook para el slider del hero (usado en HeroSection)
export function useSlider() {
  return useQuery<SliderSlide[]>({
    queryKey: ["slider"],
    queryFn: async () => {
      const res = await fetch("/api/slider");
      if (!res.ok) throw new Error("Error al cargar slider");
      return res.json();
    },
    staleTime: 15_000,
    refetchInterval: 30_000, // Auto-refresca cada 30s
  });
}
