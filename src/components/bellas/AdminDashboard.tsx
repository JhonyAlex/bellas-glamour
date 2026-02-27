"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Crown, Users, Camera, Check, X, Eye, Clock, 
  Loader2, AlertCircle, ChevronDown, ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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

export function AdminDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"models" | "photos">("models");
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
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-8 h-8 text-gold-400 mr-3" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
              Panel de <span className="text-gold-gradient">Administración</span>
            </h2>
          </div>
          <p className="text-gray-400">
            Gestiona las solicitudes de modelos y moderación de fotos
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-card border border-gold-500/20 rounded-lg p-4 text-center">
            <Users className="w-6 h-6 mx-auto text-gold-400 mb-2" />
            <p className="text-2xl font-bold text-white">{pendingModels.length}</p>
            <p className="text-gray-400 text-sm">Modelos Pendientes</p>
          </div>
          <div className="bg-card border border-gold-500/20 rounded-lg p-4 text-center">
            <Camera className="w-6 h-6 mx-auto text-gold-400 mb-2" />
            <p className="text-2xl font-bold text-white">{pendingPhotos.length}</p>
            <p className="text-gray-400 text-sm">Fotos Pendientes</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <Button
            variant={activeTab === "models" ? "default" : "outline"}
            onClick={() => setActiveTab("models")}
            className={activeTab === "models" ? "bg-gold-500 text-black" : "border-gold-500/30 text-gray-300"}
          >
            <Users className="w-4 h-4 mr-2" />
            Modelos ({pendingModels.length})
          </Button>
          <Button
            variant={activeTab === "photos" ? "default" : "outline"}
            onClick={() => setActiveTab("photos")}
            className={activeTab === "photos" ? "bg-gold-500 text-black" : "border-gold-500/30 text-gray-300"}
          >
            <Camera className="w-4 h-4 mr-2" />
            Fotos ({pendingPhotos.length})
          </Button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "models" && (
            <motion.div
              key="models"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {pendingModels.length === 0 ? (
                <div className="text-center py-16 bg-card border border-gold-500/20 rounded-lg">
                  <Check className="w-12 h-12 mx-auto text-green-400 mb-4" />
                  <p className="text-gray-400">No hay modelos pendientes de aprobación</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingModels.map((model) => (
                    <motion.div
                      key={model.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-card border border-gold-500/20 rounded-lg overflow-hidden"
                    >
                      {/* Model Header */}
                      <div
                        className="p-4 flex items-center justify-between cursor-pointer hover:bg-black/20"
                        onClick={() => setExpandedModel(expandedModel === model.id ? null : model.id)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center overflow-hidden">
                            {model.photos[0] ? (
                              <img
                                src={model.photos[0].url}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Users className="w-6 h-6 text-gold-400" />
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              {model.artisticName || model.user.name || "Sin nombre"}
                            </p>
                            <p className="text-gray-400 text-sm">{model.user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right hidden sm:block">
                            <p className="text-gray-400 text-xs">Solicitado</p>
                            <p className="text-gray-300 text-sm">
                              {new Date(model.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          {expandedModel === model.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>

                      {/* Expanded Details */}
                      <AnimatePresence>
                        {expandedModel === model.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-gold-500/20"
                          >
                            <div className="p-4 grid md:grid-cols-2 gap-6">
                              {/* Info */}
                              <div className="space-y-3">
                                {model.bio && (
                                  <div>
                                    <p className="text-gray-400 text-sm">Biografía</p>
                                    <p className="text-white">{model.bio}</p>
                                  </div>
                                )}
                                <div className="grid grid-cols-2 gap-4">
                                  {model.height && (
                                    <div>
                                      <p className="text-gray-400 text-sm">Altura</p>
                                      <p className="text-white">{model.height} cm</p>
                                    </div>
                                  )}
                                  {model.eyeColor && (
                                    <div>
                                      <p className="text-gray-400 text-sm">Color de Ojos</p>
                                      <p className="text-white capitalize">{model.eyeColor}</p>
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p className="text-gray-400 text-sm">Fotos subidas</p>
                                  <p className="text-white">{model.photos.length}</p>
                                </div>
                              </div>

                              {/* Photos Preview */}
                              {model.photos.length > 0 && (
                                <div>
                                  <p className="text-gray-400 text-sm mb-2">Fotos</p>
                                  <div className="grid grid-cols-3 gap-2">
                                    {model.photos.slice(0, 6).map((photo) => (
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
                                </div>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="p-4 bg-black/20 flex justify-end space-x-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectModel(model.id)}
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                              >
                                <X className="w-4 h-4 mr-2" />
                                Rechazar
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleApproveModel(model.id)}
                                className="bg-green-500 hover:bg-green-600 text-white"
                              >
                                <Check className="w-4 h-4 mr-2" />
                                Aprobar
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "photos" && (
            <motion.div
              key="photos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {pendingPhotos.length === 0 ? (
                <div className="text-center py-16 bg-card border border-gold-500/20 rounded-lg">
                  <Check className="w-12 h-12 mx-auto text-green-400 mb-4" />
                  <p className="text-gray-400">No hay fotos pendientes de moderación</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pendingPhotos.map((photo) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-card border border-gold-500/20 rounded-lg overflow-hidden"
                    >
                      {/* Photo */}
                      <div className="aspect-square relative">
                        <img
                          src={photo.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <p className="text-white font-medium mb-1">
                          {photo.profile.artisticName || photo.profile.user.name || "Sin nombre"}
                        </p>
                        <p className="text-gray-400 text-sm mb-3">
                          {photo.profile.user.email}
                        </p>
                        <p className="text-gray-500 text-xs mb-4">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {new Date(photo.uploadedAt).toLocaleDateString()}
                        </p>

                        {/* Actions */}
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectPhoto(photo.id)}
                            className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Rechazar
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApprovePhoto(photo.id)}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Aprobar
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
