"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check, X, Trash2, Loader2, AlertCircle, Eye,
    ImageOff, ZoomIn, Upload, Image as ImageIcon, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Dialog, DialogContent, DialogDescription, DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
    useUpdatePhotoStatus, useDeletePhoto,
    type AdminPhoto,
} from "@/hooks/use-admin-models";
import { StatusBadge } from "./AdminModelStatusControl";
import { AdminPhotoUpload } from "./AdminPhotoUpload";

interface AdminModelGalleryProps {
    profileId: string;
    photos: AdminPhoto[];
    modelName: string;
}

export function AdminModelGallery({ profileId, photos, modelName }: AdminModelGalleryProps) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const updateStatus = useUpdatePhotoStatus();
    const deletePhoto = useDeletePhoto();
    const [lightboxPhoto, setLightboxPhoto] = useState<AdminPhoto | null>(null);
    const [loadingPhotoId, setLoadingPhotoId] = useState<string | null>(null);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [sliderLoadingId, setSliderLoadingId] = useState<string | null>(null);
    const [profilePhotoLoadingId, setProfilePhotoLoadingId] = useState<string | null>(null);

    // Mapa local para rastrear fotos añadidas al slider en esta sesión
    const [addedToSlider, setAddedToSlider] = useState<Set<string>>(new Set());

    const handleStatusChange = async (photoId: string, status: "APPROVED" | "REJECTED") => {
        setLoadingPhotoId(photoId);
        try {
            await updateStatus.mutateAsync({ profileId, photoId, status });
            toast({
                title: status === "APPROVED" ? "Foto aprobada" : "Foto rechazada",
                description: status === "APPROVED"
                    ? "La foto ahora es visible públicamente."
                    : "La foto ha sido rechazada.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "No se pudo actualizar la foto.",
                variant: "destructive",
            });
        } finally {
            setLoadingPhotoId(null);
        }
    };

    const handleDelete = async (photoId: string) => {
        setLoadingPhotoId(photoId);
        try {
            await deletePhoto.mutateAsync({ profileId, photoId });
            toast({
                title: "Foto eliminada",
                description: "La foto ha sido eliminada permanentemente.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "No se pudo eliminar la foto.",
                variant: "destructive",
            });
        } finally {
            setLoadingPhotoId(null);
        }
    };

    const handleAddToSlider = async (photoId: string) => {
        setSliderLoadingId(photoId);
        try {
            const res = await fetch("/api/admin/slider", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ photoId }),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || "Error al agregar al slider");
            }
            setAddedToSlider((prev) => new Set(prev).add(photoId));
            queryClient.invalidateQueries({ queryKey: ["slider"] });
            toast({
                title: "Agregada al slider",
                description: "La foto ahora aparecerá en el slider del home.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "No se pudo agregar al slider.",
                variant: "destructive",
            });
        } finally {
            setSliderLoadingId(null);
        }
    };

    const handleSetProfilePhoto = async (photoId: string) => {
        setProfilePhotoLoadingId(photoId);
        try {
            const res = await fetch(`/api/photos/${photoId}/profile-photo`, {
                method: "PATCH",
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || "Error al establecer foto principal");
            }
            // Invalidar queries para actualizar en tiempo real sin recargar
            queryClient.invalidateQueries({ queryKey: ["admin-model", profileId] });
            queryClient.invalidateQueries({ queryKey: ["admin-models"] });
            queryClient.invalidateQueries({ queryKey: ["public-models"] });
            toast({
                title: "Foto principal actualizada",
                description: "La foto ha sido marcada como foto de perfil.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "No se pudo establecer la foto principal.",
                variant: "destructive",
            });
        } finally {
            setProfilePhotoLoadingId(null);
        }
    };

    if (photos.length === 0) {
        return (
            <>
                <div className="text-center py-12 bg-card border border-gold-500/10 rounded-lg">
                    <ImageOff className="w-10 h-10 mx-auto text-gray-500 mb-3" />
                    <p className="text-gray-400 text-sm mb-4">No hay fotos en este perfil</p>
                    <Button
                        className="bg-gold-500 hover:bg-gold-600 text-black font-medium"
                        onClick={() => setUploadOpen(true)}
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Subir primera foto
                    </Button>
                </div>
                <AdminPhotoUpload
                    profileId={profileId}
                    modelName={modelName}
                    open={uploadOpen}
                    onOpenChange={setUploadOpen}
                />
            </>
        );
    }

    const approved = photos.filter((p) => p.status === "APPROVED");
    const pending = photos.filter((p) => p.status === "PENDING");
    const rejected = photos.filter((p) => p.status === "REJECTED");

    return (
        <div className="space-y-6">
            {/* Estadísticas + botón subir */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-3 text-sm">
                    <span className="text-gray-400">
                        Total: <span className="text-white font-medium">{photos.length}</span>
                    </span>
                    <span className="text-green-400">
                        Aprobadas: <span className="font-medium">{approved.length}</span>
                    </span>
                    <span className="text-yellow-400">
                        Pendientes: <span className="font-medium">{pending.length}</span>
                    </span>
                    <span className="text-red-400">
                        Rechazadas: <span className="font-medium">{rejected.length}</span>
                    </span>
                </div>
                <Button
                    className="bg-gold-500 hover:bg-gold-600 text-black font-medium"
                    size="sm"
                    onClick={() => setUploadOpen(true)}
                >
                    <Upload className="w-4 h-4 mr-2" />
                    Subir foto
                </Button>
            </div>

            {/* Grid de fotos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                <AnimatePresence mode="popLayout">
                    {photos.map((photo) => (
                        <motion.div
                            key={photo.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="group relative aspect-square rounded-lg overflow-hidden bg-secondary border border-gold-500/10"
                        >
                            {/* Imagen */}
                            <img
                                src={photo.url}
                                alt={photo.title || "Foto de modelo"}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            />

                            {/* Overlay superior — badge de estado */}
                            <div className="absolute top-2 left-2 z-10">
                                <StatusBadge status={photo.status} />
                            </div>

                            {/* Badges de estado (siempre visibles) */}
                            <div className="absolute bottom-2 left-2 right-2 z-10 flex gap-1 pointer-events-none">
                                {photo.isProfilePhoto && (
                                    <span className="bg-gold-500 text-black text-[10px] font-bold px-2 py-0.5 rounded">
                                        PERFIL
                                    </span>
                                )}
                                {(photo.isSliderPhoto || addedToSlider.has(photo.id)) && (
                                    <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                        SLIDER
                                    </span>
                                )}
                            </div>

                            {/* Overlay de acciones (hover) */}
                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-2">
                                {/* Fila superior: Ver ampliada */}
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setLightboxPhoto(photo)}
                                        className="flex items-center gap-1 bg-white/15 hover:bg-white/25 text-white text-[11px] font-medium px-2 py-1 rounded transition-colors"
                                    >
                                        <ZoomIn className="w-3.5 h-3.5" />
                                        Ver
                                    </button>
                                </div>

                                {/* Filas inferiores: Acciones principales */}
                                <div className="flex flex-col gap-1.5">
                                    {/* Moderación: Aprobar / Rechazar */}
                                    <div className="flex gap-1.5">
                                        {photo.status !== "APPROVED" && (
                                            <button
                                                onClick={() => handleStatusChange(photo.id, "APPROVED")}
                                                disabled={loadingPhotoId === photo.id}
                                                className="flex-1 flex items-center justify-center gap-1 bg-green-500/25 hover:bg-green-500/45 text-green-400 text-[11px] font-medium py-1.5 rounded transition-colors disabled:opacity-50"
                                            >
                                                {loadingPhotoId === photo.id ? (
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                ) : (
                                                    <Check className="w-3 h-3" />
                                                )}
                                                Aprobar
                                            </button>
                                        )}
                                        {photo.status !== "REJECTED" && (
                                            <button
                                                onClick={() => handleStatusChange(photo.id, "REJECTED")}
                                                disabled={loadingPhotoId === photo.id}
                                                className="flex-1 flex items-center justify-center gap-1 bg-red-500/25 hover:bg-red-500/45 text-red-400 text-[11px] font-medium py-1.5 rounded transition-colors disabled:opacity-50"
                                            >
                                                <X className="w-3 h-3" />
                                                Rechazar
                                            </button>
                                        )}
                                    </div>

                                    {/* Funciones extra: Slider / Foto de perfil (solo aprobadas) */}
                                    {photo.status === "APPROVED" && (
                                        <div className="flex gap-1.5">
                                            {!photo.isSliderPhoto && !addedToSlider.has(photo.id) && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleAddToSlider(photo.id); }}
                                                    disabled={sliderLoadingId === photo.id}
                                                    className="flex-1 flex items-center justify-center gap-1 bg-blue-500/25 hover:bg-blue-500/45 text-blue-400 text-[11px] font-medium py-1.5 rounded transition-colors disabled:opacity-50"
                                                >
                                                    {sliderLoadingId === photo.id ? (
                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                    ) : (
                                                        <ImageIcon className="w-3 h-3" />
                                                    )}
                                                    Slider
                                                </button>
                                            )}
                                            {!photo.isProfilePhoto && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleSetProfilePhoto(photo.id); }}
                                                    disabled={profilePhotoLoadingId === photo.id}
                                                    className="flex-1 flex items-center justify-center gap-1 bg-gold-500/25 hover:bg-gold-500/45 text-gold-400 text-[11px] font-medium py-1.5 rounded transition-colors disabled:opacity-50"
                                                >
                                                    {profilePhotoLoadingId === photo.id ? (
                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                    ) : (
                                                        <Star className="w-3 h-3" />
                                                    )}
                                                    Perfil
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    {/* Eliminar */}
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button
                                                disabled={loadingPhotoId === photo.id}
                                                className="flex items-center justify-center gap-1 bg-red-500/15 hover:bg-red-500/35 text-red-400/80 hover:text-red-400 text-[11px] font-medium py-1.5 rounded transition-colors disabled:opacity-50"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                                Eliminar
                                            </button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="bg-card border-gold-500/20">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="text-white">¿Eliminar foto?</AlertDialogTitle>
                                                <AlertDialogDescription className="text-gray-400">
                                                    Esta acción no se puede deshacer. La foto será eliminada permanentemente.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel className="border-gray-600 text-gray-300">
                                                    Cancelar
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="bg-red-500 hover:bg-red-600 text-white"
                                                    onClick={() => handleDelete(photo.id)}
                                                >
                                                    Eliminar
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Lightbox */}
            <Dialog open={!!lightboxPhoto} onOpenChange={() => setLightboxPhoto(null)}>
                <DialogContent className="bg-black/95 border-gold-500/20 max-w-4xl p-2">
                    <DialogTitle className="sr-only">Vista de foto</DialogTitle>
                    <DialogDescription className="sr-only">Vista ampliada de la foto</DialogDescription>
                    {lightboxPhoto && (
                        <div className="relative">
                            <img
                                src={lightboxPhoto.url}
                                alt={lightboxPhoto.title || "Foto de modelo"}
                                className="w-full h-auto max-h-[80vh] object-contain rounded"
                            />
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                <StatusBadge status={lightboxPhoto.status} />
                                <div className="flex gap-2">
                                    {lightboxPhoto.title && (
                                        <span className="text-white text-sm bg-black/50 px-3 py-1 rounded">
                                            {lightboxPhoto.title}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
            {/* Upload Dialog */}
            <AdminPhotoUpload
                profileId={profileId}
                modelName={modelName}
                open={uploadOpen}
                onOpenChange={setUploadOpen}
            />
        </div>
    );
}
