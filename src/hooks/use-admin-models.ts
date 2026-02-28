// Hooks de React Query para el módulo de administración de modelos
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

// ==================== TIPOS ====================

export interface AdminModelListItem {
    id: string;
    artisticName: string | null;
    bio: string | null;
    birthDate: string | null;
    nationality: string | null;
    location: string | null;
    height: number | null;
    weight: number | null;
    eyeColor: string | null;
    hairColor: string | null;
    skinTone: string | null;
    measurements: string | null;
    shoeSize: number | null;
    hobbies: string | null;
    languages: string | null;
    skills: string | null;
    experience: string | null;
    specialties: string | null;
    availability: string | null;
    instagram: string | null;
    twitter: string | null;
    tiktok: string | null;
    status: "PENDING" | "APPROVED" | "REJECTED";
    featured: boolean;
    views: number;
    createdAt: string;
    updatedAt: string;
    approvedAt: string | null;
    user: {
        id: string;
        name: string | null;
        email: string;
        image: string | null;
        createdAt: string;
    };
    _count: {
        photos: number;
    };
}

export interface AdminModelDetail extends Omit<AdminModelListItem, "_count"> {
    photos: AdminPhoto[];
}

export interface AdminPhoto {
    id: string;
    profileId: string;
    uploaderId: string;
    url: string;
    publicId: string | null;
    filename: string | null;
    mimeType: string | null;
    size: number | null;
    title: string | null;
    description: string | null;
    category: string | null;
    isProfilePhoto: boolean;
    isSliderPhoto: boolean;
    order: number;
    status: "PENDING" | "APPROVED" | "REJECTED";
    rejectionReason: string | null;
    uploadedAt: string;
    approvedAt: string | null;
}

export interface AdminModelsListResponse {
    data: AdminModelListItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface AdminModelsFilters {
    page?: number;
    limit?: number;
    search?: string;
    status?: "PENDING" | "APPROVED" | "REJECTED" | "ALL";
    featured?: "true" | "false" | "all";
    sortBy?: "createdAt" | "artisticName" | "views" | "status" | "updatedAt";
    sortOrder?: "asc" | "desc";
}

// ==================== FUNCIONES FETCH ====================

async function fetchAdminModels(filters: AdminModelsFilters): Promise<AdminModelsListResponse> {
    const params = new URLSearchParams();
    if (filters.page) params.set("page", String(filters.page));
    if (filters.limit) params.set("limit", String(filters.limit));
    if (filters.search) params.set("search", filters.search);
    if (filters.status && filters.status !== "ALL") params.set("status", filters.status);
    if (filters.featured && filters.featured !== "all") params.set("featured", filters.featured);
    if (filters.sortBy) params.set("sortBy", filters.sortBy);
    if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);

    const res = await fetch(`/api/admin/models?${params.toString()}`);
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Error al cargar modelos");
    }
    return res.json();
}

async function fetchAdminModel(id: string): Promise<AdminModelDetail> {
    const res = await fetch(`/api/admin/models/${id}`);
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Error al cargar modelo");
    }
    return res.json();
}

// ==================== HOOKS DE CONSULTA ====================

export function useAdminModels(filters: AdminModelsFilters) {
    return useQuery({
        queryKey: ["admin-models", filters],
        queryFn: () => fetchAdminModels(filters),
        staleTime: 30_000,
        placeholderData: (previousData) => previousData,
    });
}

export function useAdminModel(id: string | null) {
    return useQuery({
        queryKey: ["admin-model", id],
        queryFn: () => fetchAdminModel(id!),
        enabled: !!id,
        staleTime: 15_000,
    });
}

// ==================== HOOKS DE MUTACIÓN ====================

export function useUpdateModel() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Record<string, unknown> }) => {
            const res = await fetch(`/api/admin/models/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || "Error al actualizar modelo");
            }
            return res.json();
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["admin-models"] });
            queryClient.invalidateQueries({ queryKey: ["admin-model", variables.id] });
        },
    });
}

export function useUpdateModelStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            const res = await fetch(`/api/admin/models/${id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || "Error al cambiar estado");
            }
            return res.json();
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["admin-models"] });
            queryClient.invalidateQueries({ queryKey: ["admin-model", variables.id] });
        },
    });
}

export function useToggleFeatured() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, featured }: { id: string; featured: boolean }) => {
            const res = await fetch(`/api/admin/models/${id}/featured`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ featured }),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || "Error al cambiar destacado");
            }
            return res.json();
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["admin-models"] });
            queryClient.invalidateQueries({ queryKey: ["admin-model", variables.id] });
        },
    });
}

export function useUpdatePhotoStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ profileId, photoId, status }: { profileId: string; photoId: string; status: string }) => {
            const res = await fetch(`/api/admin/models/${profileId}/photos/${photoId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || "Error al actualizar foto");
            }
            return res.json();
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["admin-model", variables.profileId] });
        },
    });
}

export function useDeletePhoto() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ profileId, photoId }: { profileId: string; photoId: string }) => {
            const res = await fetch(`/api/admin/models/${profileId}/photos/${photoId}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || "Error al eliminar foto");
            }
            return res.json();
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["admin-models"] });
            queryClient.invalidateQueries({ queryKey: ["admin-model", variables.profileId] });
        },
    });
}

export function useUploadAdminPhoto() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            profileId,
            file,
            title,
            category,
            isProfilePhoto,
        }: {
            profileId: string;
            file: File;
            title?: string;
            category?: string;
            isProfilePhoto?: boolean;
        }) => {
            const formData = new FormData();
            formData.append("file", file);
            if (title) formData.append("title", title);
            if (category) formData.append("category", category);
            if (isProfilePhoto) formData.append("isProfilePhoto", "true");

            const res = await fetch(`/api/admin/models/${profileId}/photos`, {
                method: "POST",
                body: formData,
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || "Error al subir foto");
            }
            return res.json();
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["admin-models"] });
            queryClient.invalidateQueries({ queryKey: ["admin-model", variables.profileId] });
        },
    });
}

// ==================== EXPORTACIÓN ====================

export function useExportModels() {
    const exportModels = useCallback(async (format: "csv" | "json", status?: string, featured?: string) => {
        const params = new URLSearchParams();
        params.set("format", format);
        if (status) params.set("status", status);
        if (featured) params.set("featured", featured);

        const res = await fetch(`/api/admin/models/export?${params.toString()}`);
        if (!res.ok) {
            throw new Error("Error al exportar datos");
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `modelos_${new Date().toISOString().split("T")[0]}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, []);

    return { exportModels };
}
