"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Check, X, Clock, Star, StarOff, AlertCircle, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useUpdateModelStatus, useToggleFeatured } from "@/hooks/use-admin-models";

interface AdminModelStatusControlProps {
    profileId: string;
    currentStatus: "PENDING" | "APPROVED" | "REJECTED";
    isFeatured: boolean;
    compact?: boolean;
}

const statusConfig = {
    PENDING: {
        label: "Pendiente",
        icon: Clock,
        className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        dotColor: "bg-yellow-400",
    },
    APPROVED: {
        label: "Aprobado",
        icon: Check,
        className: "bg-green-500/20 text-green-400 border-green-500/30",
        dotColor: "bg-green-400",
    },
    REJECTED: {
        label: "Rechazado",
        icon: X,
        className: "bg-red-500/20 text-red-400 border-red-500/30",
        dotColor: "bg-red-400",
    },
};

export function StatusBadge({ status }: { status: "PENDING" | "APPROVED" | "REJECTED" }) {
    const config = statusConfig[status];
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
            {config.label}
        </span>
    );
}

export function AdminModelStatusControl({
    profileId,
    currentStatus,
    isFeatured,
    compact = false,
}: AdminModelStatusControlProps) {
    const { toast } = useToast();
    const statusMutation = useUpdateModelStatus();
    const featuredMutation = useToggleFeatured();
    const [confirmAction, setConfirmAction] = useState<string | null>(null);

    const handleStatusChange = async (newStatus: "PENDING" | "APPROVED" | "REJECTED") => {
        try {
            await statusMutation.mutateAsync({ id: profileId, status: newStatus });
            toast({
                title: `Estado cambiado a ${statusConfig[newStatus].label}`,
                description: "El perfil ha sido actualizado correctamente.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "No se pudo cambiar el estado.",
                variant: "destructive",
            });
        }
    };

    const handleToggleFeatured = async () => {
        try {
            await featuredMutation.mutateAsync({ id: profileId, featured: !isFeatured });
            toast({
                title: isFeatured ? "Modelo quitada de destacados" : "Modelo destacada",
                description: isFeatured
                    ? "La modelo ya no aparecerá como destacada."
                    : "La modelo ahora aparecerá como destacada en la página principal.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "No se pudo cambiar el estado destacado.",
                variant: "destructive",
            });
        }
    };

    const isLoading = statusMutation.isPending || featuredMutation.isPending;

    if (compact) {
        return (
            <div className="flex items-center gap-2">
                <StatusBadge status={currentStatus} />
                <Button
                    variant="ghost"
                    size="icon"
                    className={`h-7 w-7 ${isFeatured ? "text-gold-400" : "text-gray-500"}`}
                    onClick={handleToggleFeatured}
                    disabled={isLoading}
                    title={isFeatured ? "Quitar de destacados" : "Destacar modelo"}
                >
                    {isFeatured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                </Button>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
        >
            {/* Estado actual */}
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Estado actual:</span>
                <StatusBadge status={currentStatus} />
            </div>

            {/* Acciones de estado */}
            <div className="flex flex-wrap gap-2">
                {currentStatus !== "APPROVED" && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-600 text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Check className="w-4 h-4 mr-1" />}
                                Aprobar
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-card border-gold-500/20">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">¿Aprobar este perfil?</AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-400">
                                    El perfil será visible públicamente en la plataforma.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="border-gray-600 text-gray-300">Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-green-500 hover:bg-green-600 text-white"
                                    onClick={() => handleStatusChange("APPROVED")}
                                >
                                    Aprobar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}

                {currentStatus !== "REJECTED" && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <X className="w-4 h-4 mr-1" />}
                                Rechazar
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-card border-gold-500/20">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">¿Rechazar este perfil?</AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-400">
                                    El perfil dejará de ser visible públicamente.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="border-gray-600 text-gray-300">Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                    onClick={() => handleStatusChange("REJECTED")}
                                >
                                    Rechazar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}

                {currentStatus !== "PENDING" && (
                    <Button
                        size="sm"
                        variant="outline"
                        className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                        onClick={() => handleStatusChange("PENDING")}
                        disabled={isLoading}
                    >
                        <Clock className="w-4 h-4 mr-1" />
                        A Pendiente
                    </Button>
                )}
            </div>

            {/* Featured toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-gold-500/10">
                <div>
                    <span className="text-sm text-gray-400">Modelo destacada</span>
                    <p className="text-xs text-gray-500">Aparecerá en la página principal</p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className={isFeatured
                        ? "border-gold-500/50 text-gold-400 hover:bg-gold-500/10"
                        : "border-gray-600 text-gray-400 hover:bg-gray-700"
                    }
                    onClick={handleToggleFeatured}
                    disabled={isLoading}
                >
                    {isFeatured ? (
                        <>
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            Destacada
                        </>
                    ) : (
                        <>
                            <StarOff className="w-4 h-4 mr-1" />
                            No destacada
                        </>
                    )}
                </Button>
            </div>
        </motion.div>
    );
}
