import { revalidatePath } from "next/cache";

/**
 * Invalida las rutas de caché de Next.js cuando se mutan datos públicos.
 * Llama a esto después de aprobar/rechazar perfiles o fotos.
 */
export function revalidatePublicData() {
    // La home muestra modelos destacados y la grid
    revalidatePath("/", "page");
}
