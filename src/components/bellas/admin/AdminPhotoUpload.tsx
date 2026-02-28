"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Upload, X, Loader2, ImagePlus, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useUploadAdminPhoto } from "@/hooks/use-admin-models";

interface AdminPhotoUploadProps {
    profileId: string;
    modelName: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AdminPhotoUpload({
    profileId,
    modelName,
    open,
    onOpenChange,
}: AdminPhotoUploadProps) {
    const { toast } = useToast();
    const uploadMutation = useUploadAdminPhoto();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [title, setTitle] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validar tipo
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            toast({
                title: "Tipo no permitido",
                description: "Solo se permiten JPG, PNG o WebP.",
                variant: "destructive",
            });
            return;
        }

        // Validar tamaño (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: "Archivo muy grande",
                description: "El tamaño máximo es 5MB.",
                variant: "destructive",
            });
            return;
        }

        setSelectedFile(file);

        // Crear preview
        const reader = new FileReader();
        reader.onload = (ev) => setPreview(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        try {
            await uploadMutation.mutateAsync({
                profileId,
                file: selectedFile,
                title: title || undefined,
            });

            toast({
                title: "Foto subida",
                description: "La foto se ha añadido y aprobado automáticamente.",
            });

            // Reset y cerrar
            handleReset();
            onOpenChange(false);
        } catch (error) {
            toast({
                title: "Error al subir",
                description: error instanceof Error ? error.message : "No se pudo subir la foto.",
                variant: "destructive",
            });
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setPreview(null);
        setTitle("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleClose = (isOpen: boolean) => {
        if (!isOpen) handleReset();
        onOpenChange(isOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="bg-card border-gold-500/20 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-white font-serif text-xl">
                        Subir foto
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Añadir foto al perfil de {modelName}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Zona de selección / Preview */}
                    <AnimatePresence mode="wait">
                        {preview ? (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative aspect-square rounded-lg overflow-hidden border border-gold-500/20"
                            >
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 h-8 w-8 bg-black/60 hover:bg-black/80 text-white"
                                    onClick={handleReset}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                                <div className="absolute bottom-2 left-2 bg-green-500/80 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                    <Check className="w-3 h-3" />
                                    Se aprobará automáticamente
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="dropzone"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="aspect-square rounded-lg border-2 border-dashed border-gold-500/30 bg-secondary/50 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-gold-500/50 transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <ImagePlus className="w-10 h-10 text-gold-400/60" />
                                <div className="text-center">
                                    <p className="text-gray-300 text-sm font-medium">
                                        Click para seleccionar imagen
                                    </p>
                                    <p className="text-gray-500 text-xs mt-1">
                                        JPG, PNG o WebP · Máx 5MB
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    {/* Título (opcional) */}
                    <div>
                        <Label className="text-gray-400 text-sm">
                            Título <span className="text-gray-600">(opcional)</span>
                        </Label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ej: Sesión editorial, Retrato..."
                            className="mt-1.5 bg-secondary border-gold-500/10 text-white"
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="border-gray-600 text-gray-300"
                            onClick={() => handleClose(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            className="bg-gold-500 hover:bg-gold-600 text-black font-medium"
                            disabled={!selectedFile || uploadMutation.isPending}
                            onClick={handleUpload}
                        >
                            {uploadMutation.isPending ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Upload className="w-4 h-4 mr-2" />
                            )}
                            Subir foto
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
