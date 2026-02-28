"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users, Loader2, Crown, ArrowLeft, Image as ImageIcon,
    BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
    useAdminModels, useAdminModel,
    type AdminModelsFilters,
} from "@/hooks/use-admin-models";
import { AdminModelsTable } from "./AdminModelsTable";
import { AdminModelEditDialog } from "./AdminModelEditDialog";
import { AdminModelGallery } from "./AdminModelGallery";
import { AdminModelStatusControl } from "./AdminModelStatusControl";
import { AdminExportButton } from "./AdminExportButton";

type ViewMode = "list" | "detail";

export function AdminModelsManager() {
    const { toast } = useToast();

    // Filtros
    const [filters, setFilters] = useState<AdminModelsFilters>({
        page: 1,
        limit: 20,
        status: "ALL",
        featured: "all",
        sortBy: "createdAt",
        sortOrder: "desc",
    });

    // Vista
    const [viewMode, setViewMode] = useState<ViewMode>("list");
    const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
    const [editProfileId, setEditProfileId] = useState<string | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    // Queries
    const {
        data: listData,
        isLoading: isListLoading,
        isFetching: isListFetching,
    } = useAdminModels(filters);
    const {
        data: detailData,
        isLoading: isDetailLoading,
    } = useAdminModel(selectedProfileId);

    const handleFiltersChange = useCallback((newFilters: Partial<AdminModelsFilters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    }, []);

    const handleEdit = useCallback((profileId: string) => {
        setEditProfileId(profileId);
        setEditDialogOpen(true);
    }, []);

    const handleViewGallery = useCallback((profileId: string) => {
        setSelectedProfileId(profileId);
        setViewMode("detail");
    }, []);

    const handleBackToList = useCallback(() => {
        setViewMode("list");
        setSelectedProfileId(null);
    }, []);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    {viewMode === "list" ? (
                        <div className="flex items-center gap-3">
                            <Users className="w-6 h-6 text-gold-400" />
                            <div>
                                <h3 className="font-serif text-xl text-white">
                                    Gestión de <span className="text-gold-gradient">Modelos</span>
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    {listData?.total ?? 0} modelos registrados
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-400 hover:text-gold-400"
                                onClick={handleBackToList}
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            <div>
                                <h3 className="font-serif text-xl text-white">
                                    {detailData?.artisticName || detailData?.user?.name || "Perfil"}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    {detailData?.user?.email}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {viewMode === "list" && (
                    <div className="flex items-center gap-2">
                        <AdminExportButton
                            currentStatus={filters.status}
                            currentFeatured={filters.featured}
                        />
                    </div>
                )}
            </div>

            {/* Estadísticas rápidas (solo en lista) */}
            {viewMode === "list" && listData && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                >
                    <StatCard
                        label="Total"
                        value={listData.total}
                        icon={Users}
                    />
                    <StatCard
                        label="Aprobados"
                        value={null}
                        icon={BarChart3}
                        className="text-green-400"
                    />
                    <StatCard
                        label="Pendientes"
                        value={null}
                        icon={BarChart3}
                        className="text-yellow-400"
                    />
                    <StatCard
                        label="Mostrando"
                        value={listData.data.length}
                        icon={BarChart3}
                    />
                </motion.div>
            )}

            {/* Contenido principal */}
            <AnimatePresence mode="wait">
                {viewMode === "list" ? (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        {isListLoading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
                            </div>
                        ) : (
                            <AdminModelsTable
                                data={listData?.data ?? []}
                                total={listData?.total ?? 0}
                                page={listData?.page ?? 1}
                                totalPages={listData?.totalPages ?? 1}
                                filters={filters}
                                onFiltersChange={handleFiltersChange}
                                onEdit={handleEdit}
                                onViewGallery={handleViewGallery}
                                isLoading={isListFetching}
                            />
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="detail"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                    >
                        {isDetailLoading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
                            </div>
                        ) : detailData ? (
                            <div className="space-y-6">
                                {/* Info del modelo + controles */}
                                <div className="grid gap-6 lg:grid-cols-3">
                                    {/* Info principal */}
                                    <div className="lg:col-span-2 bg-card border border-gold-500/10 rounded-lg p-5 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="text-white font-serif text-lg">Información del perfil</h4>
                                                <p className="text-gray-500 text-sm">Registrado el {new Date(detailData.createdAt).toLocaleDateString("es-ES", { dateStyle: "long" })}</p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-gold-500/30 text-gold-400"
                                                onClick={() => handleEdit(detailData.id)}
                                            >
                                                Editar
                                            </Button>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                                            <InfoItem label="Ubicación" value={detailData.location} />
                                            <InfoItem label="Nacionalidad" value={detailData.nationality} />
                                            <InfoItem label="Altura" value={detailData.height ? `${detailData.height} cm` : null} />
                                            <InfoItem label="Peso" value={detailData.weight ? `${detailData.weight} kg` : null} />
                                            <InfoItem label="Color ojos" value={detailData.eyeColor} />
                                            <InfoItem label="Color cabello" value={detailData.hairColor} />
                                            <InfoItem label="Medidas" value={detailData.measurements} />
                                            <InfoItem label="Talla zapato" value={detailData.shoeSize ? String(detailData.shoeSize) : null} />
                                            <InfoItem label="Experiencia" value={detailData.experience} />
                                            <InfoItem label="Especialidades" value={detailData.specialties} />
                                            <InfoItem label="Disponibilidad" value={detailData.availability} />
                                            <InfoItem label="Idiomas" value={detailData.languages} />
                                        </div>

                                        {detailData.bio && (
                                            <div>
                                                <p className="text-gray-500 text-xs mb-1">Biografía</p>
                                                <p className="text-gray-300 text-sm">{detailData.bio}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Controles de estado */}
                                    <div className="bg-card border border-gold-500/10 rounded-lg p-5">
                                        <h4 className="text-white font-serif text-lg mb-4">Control de estado</h4>
                                        <AdminModelStatusControl
                                            profileId={detailData.id}
                                            currentStatus={detailData.status}
                                            isFeatured={detailData.featured}
                                        />
                                        <div className="mt-4 pt-4 border-t border-gold-500/10 text-sm text-gray-500">
                                            <p>Vistas: <span className="text-white">{detailData.views.toLocaleString("es-ES")}</span></p>
                                            {detailData.approvedAt && (
                                                <p className="mt-1">
                                                    Aprobado: <span className="text-white">
                                                        {new Date(detailData.approvedAt).toLocaleDateString("es-ES")}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Galería */}
                                <div className="bg-card border border-gold-500/10 rounded-lg p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <ImageIcon className="w-5 h-5 text-gold-400" />
                                        <h4 className="text-white font-serif text-lg">Galería de fotos</h4>
                                    </div>
                                    <AdminModelGallery
                                        profileId={detailData.id}
                                        photos={detailData.photos}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-gray-400">No se encontró el perfil</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit Dialog */}
            <AdminModelEditDialog
                profileId={editProfileId}
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
            />
        </div>
    );
}

// ==================== Sub-componentes ====================

function StatCard({
    label,
    value,
    icon: Icon,
    className = "",
}: {
    label: string;
    value: number | null;
    icon: React.ElementType;
    className?: string;
}) {
    return (
        <div className="bg-card border border-gold-500/10 rounded-lg p-3 text-center">
            <Icon className={`w-5 h-5 mx-auto mb-1 ${className || "text-gold-400"}`} />
            <p className={`text-lg font-bold ${className || "text-white"}`}>
                {value !== null ? value.toLocaleString("es-ES") : "—"}
            </p>
            <p className="text-gray-500 text-xs">{label}</p>
        </div>
    );
}

function InfoItem({ label, value }: { label: string; value: string | null | undefined }) {
    return (
        <div>
            <p className="text-gray-500 text-xs">{label}</p>
            <p className="text-gray-300 capitalize">{value || "—"}</p>
        </div>
    );
}
