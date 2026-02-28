"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown, Users, Camera, Check, X, Clock,
  Loader2, ChevronDown, Settings, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AdminModelsManager } from "@/components/bellas/admin/AdminModelsManager";

interface PendingModel {
  id: string;
  artisticName: string | null;
  bio: string | null;
  height: number | null;
  eyeColor: string | null;
  status: string;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
  photos: Array<{
    id: string;
    url: string;
    status: string;
  }>;
}

interface PendingPhoto {
  id: string;
  url: string;
  title?: string | null;
  status: string;
  uploadedAt: string;
  profile: {
    id: string;
    artisticName: string | null;
    user: {
      name: string | null;
      email: string;
    };
  };
}

// ─── Panel Colapsable ───────────────────────────────────────────
function CollapsiblePanel({
  title,
  icon: Icon,
  badge,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ElementType;
  badge?: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-card border border-gold-500/20 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gold-500/5 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-gold-400" />
          </div>
          <span className="text-white font-medium text-sm sm:text-base truncate">{title}</span>
          {badge !== undefined && badge > 0 && (
            <span className="bg-gold-500 text-black text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
              {badge}
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-2"
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t border-gold-500/10">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Admin Dashboard ────────────────────────────────────────────
export function AdminDashboard() {
  const { toast } = useToast();
  const [pendingModels, setPendingModels] = useState<PendingModel[]>([]);
  const [pendingPhotos, setPendingPhotos] = useState<PendingPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedModel, setExpandedModel] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [modelsRes, photosRes] = await Promise.all([
        fetch("/api/admin/pending-models"),
        fetch("/api/admin/pending-photos"),
      ]);

      if (modelsRes.ok) {
        const models = await modelsRes.json();
        setPendingModels(models);
      }

      if (photosRes.ok) {
        const photos = await photosRes.json();
        setPendingPhotos(photos);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveModel = async (profileId: string) => {
    try {
      const response = await fetch(`/api/admin/approve/${profileId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "profile" }),
      });

      if (!response.ok) throw new Error("Error al aprobar");

      toast({
        title: "Modelo aprobada",
        description: "El perfil ahora es visible públicamente.",
      });

      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo aprobar el perfil.",
        variant: "destructive",
      });
    }
  };

  const handleRejectModel = async (profileId: string) => {
    try {
      const response = await fetch(`/api/admin/reject/${profileId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "profile" }),
      });

      if (!response.ok) throw new Error("Error al rechazar");

      toast({
        title: "Modelo rechazada",
        description: "El perfil ha sido rechazado.",
      });

      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo rechazar el perfil.",
        variant: "destructive",
      });
    }
  };

  const handleApprovePhoto = async (photoId: string) => {
    try {
      const response = await fetch(`/api/admin/approve/${photoId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "photo" }),
      });

      if (!response.ok) throw new Error("Error al aprobar");

      toast({
        title: "Foto aprobada",
        description: "La foto ahora es visible públicamente.",
      });

      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo aprobar la foto.",
        variant: "destructive",
      });
    }
  };

  const handleRejectPhoto = async (photoId: string) => {
    try {
      const response = await fetch(`/api/admin/reject/${photoId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "photo" }),
      });

      if (!response.ok) throw new Error("Error al rechazar");

      toast({
        title: "Foto rechazada",
        description: "La foto ha sido rechazada.",
      });

      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo rechazar la foto.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
      </div>
    );
  }

  return (
    <div className="py-6 px-4 overflow-x-hidden">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Crown className="w-7 h-7 text-gold-400" />
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Panel de <span className="text-gold-gradient">Admin</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm sm:text-base">
            Gestión y moderación de la plataforma
          </p>
        </motion.div>

        {/* ─── Stats (siempre visibles) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="bg-card border border-gold-500/20 rounded-lg p-4 text-center">
            <Users className="w-5 h-5 mx-auto text-gold-400 mb-1.5" />
            <p className="text-xl sm:text-2xl font-bold text-white">{pendingModels.length}</p>
            <p className="text-gray-400 text-xs sm:text-sm">Modelos Pendientes</p>
          </div>
          <div className="bg-card border border-gold-500/20 rounded-lg p-4 text-center">
            <Camera className="w-5 h-5 mx-auto text-gold-400 mb-1.5" />
            <p className="text-xl sm:text-2xl font-bold text-white">{pendingPhotos.length}</p>
            <p className="text-gray-400 text-xs sm:text-sm">Fotos Pendientes</p>
          </div>
        </motion.div>

        {/* ─── Panel: Modelos Pendientes ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CollapsiblePanel
            title="Modelos Pendientes"
            icon={Users}
            badge={pendingModels.length}
            defaultOpen={pendingModels.length > 0}
          >
            {pendingModels.length === 0 ? (
              <div className="text-center py-8">
                <Check className="w-10 h-10 mx-auto text-green-400 mb-3" />
                <p className="text-gray-400 text-sm">No hay modelos pendientes</p>
              </div>
            ) : (
              <div className="space-y-3 mt-3">
                {pendingModels.map((model) => (
                  <div
                    key={model.id}
                    className="bg-black/20 border border-gold-500/10 rounded-lg overflow-hidden"
                  >
                    {/* Model Header */}
                    <button
                      className="w-full p-3 flex items-center justify-between hover:bg-gold-500/5 transition-colors"
                      onClick={() =>
                        setExpandedModel(expandedModel === model.id ? null : model.id)
                      }
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {model.photos[0] ? (
                            <img
                              src={model.photos[0].url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Users className="w-5 h-5 text-gold-400" />
                          )}
                        </div>
                        <div className="text-left min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {model.artisticName || model.user.name || "Sin nombre"}
                          </p>
                          <p className="text-gray-500 text-xs truncate">{model.user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-gray-500 text-xs hidden sm:block">
                          {new Date(model.createdAt).toLocaleDateString("es-ES")}
                        </span>
                        <motion.div
                          animate={{ rotate: expandedModel === model.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </motion.div>
                      </div>
                    </button>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {expandedModel === model.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden border-t border-gold-500/10"
                        >
                          <div className="p-3 space-y-3">
                            {/* Info */}
                            {model.bio && (
                              <div>
                                <p className="text-gray-500 text-xs">Biografía</p>
                                <p className="text-gray-300 text-sm">{model.bio}</p>
                              </div>
                            )}
                            <div className="flex flex-wrap gap-4 text-sm">
                              {model.height && (
                                <div>
                                  <p className="text-gray-500 text-xs">Altura</p>
                                  <p className="text-white">{model.height} cm</p>
                                </div>
                              )}
                              {model.eyeColor && (
                                <div>
                                  <p className="text-gray-500 text-xs">Ojos</p>
                                  <p className="text-white capitalize">{model.eyeColor}</p>
                                </div>
                              )}
                              <div>
                                <p className="text-gray-500 text-xs">Fotos</p>
                                <p className="text-white">{model.photos.length}</p>
                              </div>
                            </div>

                            {/* Photos Preview */}
                            {model.photos.length > 0 && (
                              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                                {model.photos.slice(0, 4).map((photo) => (
                                  <div
                                    key={photo.id}
                                    className="aspect-square rounded overflow-hidden"
                                  >
                                    <img
                                      src={photo.url}
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2 pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectModel(model.id)}
                                className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10 h-9 text-xs sm:text-sm"
                              >
                                <X className="w-4 h-4 mr-1" />
                                Rechazar
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleApproveModel(model.id)}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white h-9 text-xs sm:text-sm"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Aprobar
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </CollapsiblePanel>
        </motion.div>

        {/* ─── Panel: Fotos Pendientes ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CollapsiblePanel
            title="Fotos Pendientes"
            icon={Camera}
            badge={pendingPhotos.length}
            defaultOpen={pendingPhotos.length > 0}
          >
            {pendingPhotos.length === 0 ? (
              <div className="text-center py-8">
                <Check className="w-10 h-10 mx-auto text-green-400 mb-3" />
                <p className="text-gray-400 text-sm">No hay fotos pendientes</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {pendingPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="bg-black/20 border border-gold-500/10 rounded-lg overflow-hidden"
                  >
                    {/* Photo */}
                    <div className="aspect-square relative">
                      <img
                        src={photo.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info + Actions */}
                    <div className="p-3 space-y-2">
                      <div className="min-w-0">
                        <p className="text-white text-sm font-medium truncate">
                          {photo.profile.artisticName ||
                            photo.profile.user.name ||
                            "Sin nombre"}
                        </p>
                        <p className="text-gray-500 text-xs truncate">
                          {photo.profile.user.email}
                        </p>
                      </div>
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(photo.uploadedAt).toLocaleDateString("es-ES")}
                      </p>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRejectPhoto(photo.id)}
                          className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10 h-8 text-xs"
                        >
                          <X className="w-3.5 h-3.5 mr-1" />
                          Rechazar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleApprovePhoto(photo.id)}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white h-8 text-xs"
                        >
                          <Check className="w-3.5 h-3.5 mr-1" />
                          Aprobar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CollapsiblePanel>
        </motion.div>

        {/* ─── Panel: Gestión de Modelos ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CollapsiblePanel
            title="Gestión de Modelos"
            icon={Settings}
          >
            <div className="mt-3">
              <AdminModelsManager />
            </div>
          </CollapsiblePanel>
        </motion.div>
      </div>
    </div>
  );
}
