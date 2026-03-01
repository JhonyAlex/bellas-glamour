// Genera un slug URL-friendly desde un texto
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // eliminar tildes/acentos
    .replace(/[^a-z0-9\s-]/g, "")    // solo letras, números, espacios, guiones
    .trim()
    .replace(/\s+/g, "-")             // espacios → guiones
    .replace(/-+/g, "-")              // guiones múltiples → uno
    .slice(0, 60);                    // máximo 60 caracteres
}
