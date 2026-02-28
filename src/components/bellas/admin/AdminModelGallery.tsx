"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check, X, Trash2, Loader2, AlertCircle, Eye,
    ImageOff, ZoomIn, Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Dialog, DialogContent, DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
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
    const updateStatus = useUpdatePhotoStatus();
    const deletePhoto = useDeletePhoto();
    const [lightboxPhoto, setLightboxPhoto] = useState<AdminPhoto | null>(null);
    const [loadingPhotoId, setLoadingPhotoId] = useState<string | null>(null);
    const [uploadOpen, setUploadOpen] = useState(false);

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

                            {/* Overlay de acciones */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 bg-white/10 hover:bg-white/20 text-white"
                                    onClick={() => setLightboxPhoto(photo)}
                                >
                                    <ZoomIn className="w-4 h-4" />
                                </Button>

                                {photo.status !== "APPROVED" && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 bg-green-500/20 hover:bg-green-500/40 text-green-400"
                                        onClick={() => handleStatusChange(photo.id, "APPROVED")}
                                        disabled={loadingPhotoId === photo.id}
                                    >
                                        {loadingPhotoId === photo.id ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Check className="w-4 h-4" />
                                        )}
                                    </Button>
                                )}

                                {photo.status !== "REJECTED" && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 bg-red-500/20 hover:bg-red-500/40 text-red-400"
                                        onClick={() => handleStatusChange(photo.id, "REJECTED")}
                                        disabled={loadingPhotoId === photo.id}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                )}

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-9 w-9 bg-red-500/20 hover:bg-red-500/40 text-red-400"
                                            disabled={loadingPhotoId === photo.id}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
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

                            {/* Indicador de foto de perfil */}
                            {photo.isProfilePhoto && (
                                <div className="absolute bottom-2 right-2 z-10">
                                    <span className="bg-gold-500 text-black text-[10px] font-bold px-2 py-0.5 rounded">
                                        PERFIL
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Lightbox */}
            <Dialog open={!!lightboxPhoto} onOpenChange={() => setLightboxPhoto(null)}>
                <DialogContent className="bg-black/95 border-gold-500/20 max-w-4xl p-2">
                    <DialogTitle className="sr-only">Vista de foto</DialogTitle>
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
