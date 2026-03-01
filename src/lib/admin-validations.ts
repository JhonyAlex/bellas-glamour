// Validaciones Zod para el módulo de administración de modelos
import { z } from "zod";

// Schema para edición de perfil por admin
export const adminProfileUpdateSchema = z.object({
  artisticName: z.string().min(1, "El nombre artístico es requerido").nullish(),
  bio: z.string().max(2000, "La biografía no puede exceder 2000 caracteres").nullish(),
  birthDate: z.string().nullish(),
  nationality: z.string().nullish(),
  location: z.string().nullish(),
  height: z.coerce.number().min(100, "Altura mínima: 100 cm").max(250, "Altura máxima: 250 cm").nullish(),
  weight: z.coerce.number().min(30, "Peso mínimo: 30 kg").max(200, "Peso máximo: 200 kg").nullish(),
  eyeColor: z.string().nullish(),
  hairColor: z.string().nullish(),
  skinTone: z.string().nullish(),
  measurements: z.string().regex(/^\d{2,3}-\d{2,3}-\d{2,3}$/, "Formato: 90-60-90").nullish().or(z.literal("")),
  shoeSize: z.coerce.number().min(20).max(55).nullish(),
  hobbies: z.string().nullish(),
  languages: z.string().nullish(),
  skills: z.string().nullish(),
  experience: z.string().nullish(),
  specialties: z.string().nullish(),
  availability: z.string().nullish(),
  instagram: z.string().url("URL de Instagram inválida").nullish().or(z.literal("")),
  twitter: z.string().url("URL de Twitter inválida").nullish().or(z.literal("")),
  tiktok: z.string().url("URL de TikTok inválida").nullish().or(z.literal("")),
  phoneNumber: z.string().regex(/^\+?\d{7,15}$/, "Formato de teléfono inválido (ej: +521234567890)").nullish().or(z.literal("")),
  whatsappAvailable: z.boolean().nullish(),
});

export type AdminProfileUpdateInput = z.infer<typeof adminProfileUpdateSchema>;

// Schema para cambio de estado
export const statusChangeSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

export type StatusChangeInput = z.infer<typeof statusChangeSchema>;

// Schema para toggle featured
export const featuredToggleSchema = z.object({
  featured: z.boolean(),
});

export type FeaturedToggleInput = z.infer<typeof featuredToggleSchema>;

// Schema para cambio de estado de foto
export const photoStatusSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

export type PhotoStatusInput = z.infer<typeof photoStatusSchema>;

// Schema para parámetros de exportación
export const exportParamsSchema = z.object({
  format: z.enum(["csv", "json"]).default("csv"),
  status: z.enum(["PENDING", "APPROVED", "REJECTED", "ALL"]).default("ALL"),
  featured: z.enum(["true", "false", "all"]).default("all"),
});

export type ExportParamsInput = z.infer<typeof exportParamsSchema>;

// Schema para parámetros de listado (query params)
export const listModelsParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED", "ALL"]).default("ALL"),
  featured: z.enum(["true", "false", "all"]).default("all"),
  sortBy: z.enum(["createdAt", "artisticName", "views", "status", "updatedAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type ListModelsParamsInput = z.infer<typeof listModelsParamsSchema>;
