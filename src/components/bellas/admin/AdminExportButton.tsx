"use client";

import { useState } from "react";
import { Download, FileJson, FileSpreadsheet, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useExportModels } from "@/hooks/use-admin-models";

interface AdminExportButtonProps {
    currentStatus?: string;
    currentFeatured?: string;
}

export function AdminExportButton({ currentStatus, currentFeatured }: AdminExportButtonProps) {
    const { toast } = useToast();
    const { exportModels } = useExportModels();
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async (format: "csv" | "json", statusFilter?: string) => {
        setIsExporting(true);
        try {
            await exportModels(format, statusFilter || currentStatus, currentFeatured);
            toast({
                title: "Exportación completada",
                description: `Archivo ${format.toUpperCase()} descargado correctamente.`,
            });
        } catch (error) {
            toast({
                title: "Error en la exportación",
                description: error instanceof Error ? error.message : "No se pudo exportar los datos.",
                variant: "destructive",
            });
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-gold-500/30 text-gray-300 hover:text-gold-400 hover:border-gold-500/50"
                    disabled={isExporting}
                >
                    {isExporting ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <Download className="w-4 h-4 mr-2" />
                    )}
                    Exportar
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card border-gold-500/20" align="end">
                <DropdownMenuLabel className="text-gray-400 text-xs">
                    Exportar modelos
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gold-500/10" />

                <DropdownMenuItem
                    className="text-gray-300 hover:text-white focus:text-white cursor-pointer"
                    onClick={() => handleExport("csv")}
                >
                    <FileSpreadsheet className="w-4 h-4 mr-2 text-green-400" />
                    CSV (filtros actuales)
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="text-gray-300 hover:text-white focus:text-white cursor-pointer"
                    onClick={() => handleExport("csv", "ALL")}
                >
                    <FileSpreadsheet className="w-4 h-4 mr-2 text-green-400" />
                    CSV (todos)
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-gold-500/10" />

                <DropdownMenuItem
                    className="text-gray-300 hover:text-white focus:text-white cursor-pointer"
                    onClick={() => handleExport("json")}
                >
                    <FileJson className="w-4 h-4 mr-2 text-blue-400" />
                    JSON (filtros actuales)
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="text-gray-300 hover:text-white focus:text-white cursor-pointer"
                    onClick={() => handleExport("json", "ALL")}
                >
                    <FileJson className="w-4 h-4 mr-2 text-blue-400" />
                    JSON (todos)
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
