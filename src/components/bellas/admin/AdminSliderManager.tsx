"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Image, Loader2, Trash2, ArrowUp, ArrowDown, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SliderPhoto {
    id: string;
    url: string;
    title?: string | null;
    sliderOrder: number;
    profile: {
        id: string;
        artisticName: string | null;
        user: { name: string | null; email: string };
    };
}

export function AdminSliderManager() {
    const { toast } = useToast();
    const [photos, setPhotos] = useState<SliderPhoto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [removingId, setRemovingId] = useState<string | null>(null);
    const [isReordering, setIsReordering] = useState(false);

    useEffect(() => {
        fetchSliderPhotos();
    }, []);

    const fetchSliderPhotos = async () => {
        try {
            const res = await fetch("/api/admin/slider");
            if (res.ok) {
                const data = await res.json();
                setPhotos(data);
            }
        } catch (error) {
            console.error("Error fetching slider photos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemove = async (photoId: string) => {
        setRemovingId(photoId);
        try {
            const res = await fetch(`/api/admin/slider/${photoId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Error al quitar del slider");

            setPhotos((prev) => prev.filter((p) => p.id !== photoId));
            toast({
                title: "Foto removida",
                description: "La foto ha sido quitada del slider.",
            });
        } catch {
            toast({
                title: "Error",
                description: "No se pudo quitar la foto del slider.",
                variant: "destructive",
            });
        } finally {
            setRemovingId(null);
        }
    };

    const handleMoveUp = async (index: number) => {
        if (index === 0) return;
        const newPhotos = [...photos];
        [newPhotos[index - 1], newPhotos[index]] = [newPhotos[index], newPhotos[index - 1]];
        setPhotos(newPhotos);
        await saveOrder(newPhotos);
    };

    const handleMoveDown = async (index: number) => {
        if (index === photos.length - 1) return;
        const newPhotos = [...photos];
        [newPhotos[index], newPhotos[index + 1]] = [newPhotos[index + 1], newPhotos[index]];
        setPhotos(newPhotos);
        await saveOrder(newPhotos);
    };

    const saveOrder = async (orderedPhotos: SliderPhoto[]) => {
        setIsReordering(true);
        try {
            const res = await fetch("/api/admin/slider", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderedIds: orderedPhotos.map((p) => p.id),
                }),
            });
            if (!res.ok) throw new Error("Error al reordenar");
        } catch {
            toast({
                title: "Error",
                description: "No se pudo guardar el orden.",
                variant: "destructive",
            });
            fetchSliderPhotos(); // Revert to server state
        } finally {
            setIsReordering(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-gold-400" />
            </div>
        );
    }

    if (photos.length === 0) {
        return (
            <div className="text-center py-8">
                <Image className="w-10 h-10 mx-auto text-gray-600 mb-3" />
                <p className="text-gray-400 text-sm">No hay fotos en el slider</p>
                <p className="text-gray-500 text-xs mt-1">
                    Agrega fotos desde la galería de cada modelo
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3 mt-3">
            <p className="text-gray-500 text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {photos.length} foto{photos.length !== 1 ? "s" : ""} en el slider.
                Usa las flechas para reordenar.
            </p>

            <AnimatePresence mode="popLayout">
                {photos.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="bg-black/20 border border-gold-500/10 rounded-lg p-3 flex items-center gap-3"
                    >
                        {/* Order Number */}
                        <div className="w-7 h-7 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-gold-400 text-xs font-bold">
                                {index + 1}
                            </span>
                        </div>

                        {/* Thumbnail */}
                        <div className="w-14 h-14 rounded overflow-hidden flex-shrink-0">
                            <img
                                src={photo.url}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                                {photo.profile.artisticName || photo.profile.user.name || "Sin nombre"}
                            </p>
                            <p className="text-gray-500 text-xs truncate">
                                {photo.profile.user.email}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                                onClick={() => handleMoveUp(index)}
                                disabled={index === 0 || isReordering}
                                className="p-1.5 text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                                title="Mover arriba"
                            >
                                <ArrowUp className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleMoveDown(index)}
                                disabled={index === photos.length - 1 || isReordering}
                                className="p-1.5 text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                                title="Mover abajo"
                            >
                                <ArrowDown className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleRemove(photo.id)}
                                disabled={removingId === photo.id}
                                className="p-1.5 text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors"
                                title="Quitar del slider"
                            >
                                {removingId === photo.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Trash2 className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
