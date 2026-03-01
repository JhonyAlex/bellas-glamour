import { useQuery } from "@tanstack/react-query";
import type { SiteSettings } from "@/types/models";

export function useSiteSettings() {
  return useQuery<SiteSettings>({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const res = await fetch("/api/site-settings");
      if (!res.ok) throw new Error("Error al cargar configuración del sitio");
      return res.json();
    },
    staleTime: 15_000,
    refetchInterval: 30_000, // Auto-refresca cada 30s para cambios en tiempo real
  });
}
