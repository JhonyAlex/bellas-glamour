"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, Users, Eye, Edit, Image, ChevronLeft, ChevronRight,
    ChevronsLeft, ChevronsRight, ArrowUpDown, ArrowUp, ArrowDown,
    SlidersHorizontal, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
    AdminModelStatusControl, StatusBadge,
} from "./AdminModelStatusControl";
import type { AdminModelListItem, AdminModelsFilters } from "@/hooks/use-admin-models";

interface AdminModelsTableProps {
    data: AdminModelListItem[];
    total: number;
    page: number;
    totalPages: number;
    filters: AdminModelsFilters;
    onFiltersChange: (filters: Partial<AdminModelsFilters>) => void;
    onEdit: (profileId: string) => void;
    onViewGallery: (profileId: string) => void;
    isLoading: boolean;
}

export function AdminModelsTable({
    data,
    total,
    page,
    totalPages,
    filters,
    onFiltersChange,
    onEdit,
    onViewGallery,
    isLoading,
}: AdminModelsTableProps) {
    const [searchInput, setSearchInput] = useState(filters.search || "");
    const [showFilters, setShowFilters] = useState(false);

    // Debounce de búsqueda
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchInput !== (filters.search || "")) {
                onFiltersChange({ search: searchInput || undefined, page: 1 });
            }
        }, 400);
        return () => clearTimeout(timer);
    }, [searchInput]);

    const handleSort = (column: AdminModelsFilters["sortBy"]) => {
        if (filters.sortBy === column) {
            onFiltersChange({
                sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
            });
        } else {
            onFiltersChange({ sortBy: column, sortOrder: "desc" });
        }
    };

    const SortIcon = ({ column }: { column: AdminModelsFilters["sortBy"] }) => {
        if (filters.sortBy !== column) return <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />;
        return filters.sortOrder === "asc"
            ? <ArrowUp className="w-3.5 h-3.5 text-gold-400" />
            : <ArrowDown className="w-3.5 h-3.5 text-gold-400" />;
    };

    const hasActiveFilters = (filters.status && filters.status !== "ALL")
        || (filters.featured && filters.featured !== "all")
        || filters.search;

    return (
        <div className="space-y-4">
            {/* Barra de búsqueda y filtros */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                        placeholder="Buscar por nombre, email, ubicación..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="pl-10 bg-secondary border-gold-500/10 text-white placeholder:text-gray-500"
                    />
                    {searchInput && (
                        <button
                            onClick={() => setSearchInput("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    className={`border-gold-500/30 ${showFilters ? "text-gold-400 border-gold-500/50" : "text-gray-400"}`}
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filtros
                    {hasActiveFilters && (
                        <span className="ml-1.5 w-2 h-2 bg-gold-400 rounded-full" />
                    )}
                </Button>
            </div>

            {/* Panel de filtros colapsable */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-wrap gap-3 p-4 bg-secondary/50 border border-gold-500/10 rounded-lg">
                            <div className="min-w-[140px]">
                                <label className="text-xs text-gray-500 mb-1 block">Estado</label>
                                <Select
                                    value={filters.status || "ALL"}
                                    onValueChange={(v) => onFiltersChange({ status: v as AdminModelsFilters["status"], page: 1 })}
                                >
                                    <SelectTrigger className="bg-secondary border-gold-500/10 text-white h-9">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card border-gold-500/20">
                                        <SelectItem value="ALL">Todos</SelectItem>
                                        <SelectItem value="APPROVED">Aprobados</SelectItem>
                                        <SelectItem value="PENDING">Pendientes</SelectItem>
                                        <SelectItem value="REJECTED">Rechazados</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="min-w-[140px]">
                                <label className="text-xs text-gray-500 mb-1 block">Destacados</label>
                                <Select
                                    value={filters.featured || "all"}
                                    onValueChange={(v) => onFiltersChange({ featured: v as AdminModelsFilters["featured"], page: 1 })}
                                >
                                    <SelectTrigger className="bg-secondary border-gold-500/10 text-white h-9">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card border-gold-500/20">
                                        <SelectItem value="all">Todos</SelectItem>
                                        <SelectItem value="true">Solo destacados</SelectItem>
                                        <SelectItem value="false">No destacados</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="min-w-[140px]">
                                <label className="text-xs text-gray-500 mb-1 block">Por página</label>
                                <Select
                                    value={String(filters.limit || 20)}
                                    onValueChange={(v) => onFiltersChange({ limit: Number(v), page: 1 })}
                                >
                                    <SelectTrigger className="bg-secondary border-gold-500/10 text-white h-9">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card border-gold-500/20">
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {hasActiveFilters && (
                                <div className="flex items-end">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-400 hover:text-white h-9"
                                        onClick={() => {
                                            setSearchInput("");
                                            onFiltersChange({
                                                search: undefined,
                                                status: "ALL",
                                                featured: "all",
                                                page: 1,
                                            });
                                        }}
                                    >
                                        <X className="w-3.5 h-3.5 mr-1" />
                                        Limpiar
                                    </Button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tabla Desktop */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gold-500/10">
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Modelo
                            </th>
                            <th
                                className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gold-400 transition-colors"
                                onClick={() => handleSort("status")}
                            >
                                <span className="inline-flex items-center gap-1.5">
                                    Estado <SortIcon column="status" />
                                </span>
                            </th>
                            <th
                                className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gold-400 transition-colors"
                                onClick={() => handleSort("views")}
                            >
                                <span className="inline-flex items-center gap-1.5">
                                    Vistas <SortIcon column="views" />
                                </span>
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fotos
                            </th>
                            <th
                                className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gold-400 transition-colors"
                                onClick={() => handleSort("createdAt")}
                            >
                                <span className="inline-flex items-center gap-1.5">
                                    Registro <SortIcon column="createdAt" />
                                </span>
                            </th>
                            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence mode="popLayout">
                            {data.map((model, idx) => (
                                <motion.tr
                                    key={model.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="border-b border-gold-500/5 hover:bg-gold-500/5 transition-colors"
                                >
                                    {/* Modelo info */}
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                                                {model.user.image ? (
                                                    <img src={model.user.image} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Users className="w-5 h-5 text-gold-400" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-white text-sm font-medium truncate">
                                                    {model.artisticName || model.user.name || "—"}
                                                </p>
                                                <p className="text-gray-500 text-xs truncate">{model.user.email}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Estado + Featured */}
                                    <td className="py-3 px-4">
                                        <AdminModelStatusControl
                                            profileId={model.id}
                                            currentStatus={model.status}
                                            isFeatured={model.featured}
                                            compact
                                        />
                                    </td>

                                    {/* Vistas */}
                                    <td className="py-3 px-4">
                                        <span className="text-gray-300 text-sm flex items-center gap-1.5">
                                            <Eye className="w-3.5 h-3.5 text-gray-500" />
                                            {model.views.toLocaleString("es-ES")}
                                        </span>
                                    </td>

                                    {/* Fotos */}
                                    <td className="py-3 px-4">
                                        <div className="flex flex-col gap-2">
                                            {model.photos && model.photos.length > 0 ? (
                                                <div
                                                    className="flex gap-1 cursor-pointer hover:opacity-80 transition-opacity"
                                                    onClick={() => onViewGallery(model.id)}
                                                    title={`Ver ${model._count.photos} fotos`}
                                                >
                                                    {model.photos.map((photo) => (
                                                        <div key={photo.id} className="w-8 h-8 rounded bg-gold-500/10 overflow-hidden flex-shrink-0">
                                                            <img src={photo.url} alt="preview" className="w-full h-full object-cover" />
                                                        </div>
                                                    ))}
                                                    {model._count.photos > 4 && (
                                                        <div className="w-8 h-8 rounded bg-gold-500/20 text-gold-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                                                            +{model._count.photos - 4}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => onViewGallery(model.id)}
                                                    className="text-gray-300 text-sm flex items-center gap-1.5 hover:text-gold-400 transition-colors"
                                                >
                                                    <Image className="w-3.5 h-3.5 text-gray-500" />
                                                    {model._count.photos}
                                                </button>
                                            )}
                                        </div>
                                    </td>

                                    {/* Fecha */}
                                    <td className="py-3 px-4">
                                        <span className="text-gray-400 text-sm">
                                            {new Date(model.createdAt).toLocaleDateString("es-ES", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </td>

                                    {/* Acciones */}
                                    <td className="py-3 px-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-gray-400 hover:text-gold-400"
                                                onClick={() => onEdit(model.id)}
                                                title="Editar perfil"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-gray-400 hover:text-gold-400"
                                                onClick={() => onViewGallery(model.id)}
                                                title="Ver galería"
                                            >
                                                <Image className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>

                {data.length === 0 && !isLoading && (
                    <div className="text-center py-16">
                        <Users className="w-10 h-10 mx-auto text-gray-600 mb-3" />
                        <p className="text-gray-400">No se encontraron modelos</p>
                        {hasActiveFilters && (
                            <p className="text-gray-500 text-sm mt-1">Intenta ajustar los filtros</p>
                        )}
                    </div>
                )}
            </div>

            {/* Vista de cards para móvil */}
            <div className="block md:hidden space-y-3">
                {data.map((model) => (
                    <motion.div
                        key={model.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-gold-500/10 rounded-lg p-4 space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {model.user.image ? (
                                        <img src={model.user.image} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <Users className="w-5 h-5 text-gold-400" />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-white text-sm font-medium truncate">
                                        {model.artisticName || model.user.name || "—"}
                                    </p>
                                    <p className="text-gray-500 text-xs truncate">{model.user.email}</p>
                                </div>
                            </div>
                            <StatusBadge status={model.status} />
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" /> {model.views}
                            </span>
                            <span className="flex items-center gap-1">
                                <Image className="w-3 h-3" /> {model._count.photos} fotos
                            </span>
                            <span>
                                {new Date(model.createdAt).toLocaleDateString("es-ES")}
                            </span>
                        </div>

                        {/* Fotos Preview Mobile */}
                        {model.photos && model.photos.length > 0 && (
                            <div
                                className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none cursor-pointer"
                                onClick={() => onViewGallery(model.id)}
                            >
                                {model.photos.map((photo) => (
                                    <div key={photo.id} className="w-16 h-16 rounded-md bg-gold-500/10 overflow-hidden flex-shrink-0">
                                        <img src={photo.url} alt="" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                {model._count.photos > 4 && (
                                    <div className="w-16 h-16 rounded-md bg-gold-500/20 text-gold-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                                        +{model._count.photos - 4}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex gap-2 pt-1 border-t border-gold-500/10">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 border-gold-500/20 text-gray-300 h-8 text-xs"
                                onClick={() => onEdit(model.id)}
                            >
                                <Edit className="w-3.5 h-3.5 mr-1" /> Editar
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 border-gold-500/20 text-gray-300 h-8 text-xs"
                                onClick={() => onViewGallery(model.id)}
                            >
                                <Image className="w-3.5 h-3.5 mr-1" /> Galería
                            </Button>
                        </div>
                    </motion.div>
                ))}

                {data.length === 0 && !isLoading && (
                    <div className="text-center py-12 bg-card border border-gold-500/10 rounded-lg">
                        <Users className="w-10 h-10 mx-auto text-gray-600 mb-3" />
                        <p className="text-gray-400 text-sm">No se encontraron modelos</p>
                    </div>
                )}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <p className="text-gray-500 text-sm">
                        Mostrando {(page - 1) * (filters.limit || 20) + 1}–{Math.min(page * (filters.limit || 20), total)} de {total}
                    </p>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-gold-500/10 text-gray-400"
                            onClick={() => onFiltersChange({ page: 1 })}
                            disabled={page <= 1}
                        >
                            <ChevronsLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-gold-500/10 text-gray-400"
                            onClick={() => onFiltersChange({ page: page - 1 })}
                            disabled={page <= 1}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>

                        <span className="px-3 text-sm text-gray-300">
                            {page} / {totalPages}
                        </span>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-gold-500/10 text-gray-400"
                            onClick={() => onFiltersChange({ page: page + 1 })}
                            disabled={page >= totalPages}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-gold-500/10 text-gray-400"
                            onClick={() => onFiltersChange({ page: totalPages })}
                            disabled={page >= totalPages}
                        >
                            <ChevronsRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
