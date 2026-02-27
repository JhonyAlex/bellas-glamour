"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Camera, Upload, Save, Loader2, User, Ruler, Eye, 
  MapPin, Instagram, Twitter, Trash2, AlertCircle, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";

interface Photo {
  id: string;
  url: string;
  title?: string | null;
  status: string;
  isProfilePhoto: boolean;
  uploadedAt: string;
}

interface Profile {
  id: string;
  artisticName: string | null;
  bio: string | null;
  height: number | null;
  weight: number | null;
  eyeColor: string | null;
  hairColor: string | null;
  measurements: string | null;
  hobbies: string | null;
  languages: string | null;
  location: string | null;
  instagram: string | null;
  twitter: string | null;
  status: string;
}

export function ModelDashboard() {
  const { user, profile: storedProfile } = useAuthStore();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    artisticName: "",
    bio: "",
    height: "",
    weight: "",
    eyeColor: "",
    hairColor: "",
    measurements: "",
    hobbies: "",
    languages: "",
    location: "",
    instagram: "",
    twitter: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profiles");
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setPhotos(data?.photos || []);
        
        // Populate form
        if (data) {
          setFormData({
            artisticName: data.artisticName || "",
            bio: data.bio || "",
            height: data.height?.toString() || "",
            weight: data.weight?.toString() || "",
            eyeColor: data.eyeColor || "",
            hairColor: data.hairColor || "",
            measurements: data.measurements || "",
            hobbies: data.hobbies || "",
            languages: data.languages || "",
            location: data.location || "",
            instagram: data.instagram || "",
            twitter: data.twitter || "",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    try {
      const response = await fetch("/api/profiles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artisticName: formData.artisticName || null,
          bio: formData.bio || null,
          height: formData.height ? parseFloat(formData.height) : null,
          weight: formData.weight ? parseFloat(formData.weight) : null,
          eyeColor: formData.eyeColor || null,
          hairColor: formData.hairColor || null,
          measurements: formData.measurements || null,
          hobbies: formData.hobbies || null,
          languages: formData.languages || null,
          location: formData.location || null,
          instagram: formData.instagram || null,
          twitter: formData.twitter || null,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Error al guardar perfil");
      }
      
      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      
      toast({
        title: "Perfil actualizado",
        description: "Tus cambios han sido guardados exitosamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar el perfil.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        
        const response = await fetch("/api/photos/upload", {
          method: "POST",
          body: formData,
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Error al subir foto");
        }
      }
      
      toast({
        title: "Fotos subidas",
        description: "Las fotos han sido enviadas para aprobación.",
      });
      
      fetchProfile();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al subir fotos",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
            <CheckCircle className="w-3 h-3 mr-1" />
            Aprobada
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pendiente
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded">
            <Trash2 className="w-3 h-3 mr-1" />
            Rechazada
          </span>
        );
      default:
        return null;
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
            Mi <span className="text-gold-gradient">Perfil</span>
          </h2>
          <p className="text-gray-400">
            Gestiona tu información y fotos de portfolio
          </p>
          
          {/* Status Badge */}
          {profile && (
            <div className="mt-4">
              {profile.status === "APPROVED" && (
                <span className="inline-flex items-center text-sm text-green-400 bg-green-400/10 px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Perfil Aprobado - Visible públicamente
                </span>
              )}
              {profile.status === "PENDING" && (
                <span className="inline-flex items-center text-sm text-yellow-400 bg-yellow-400/10 px-4 py-2 rounded-full">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Perfil Pendiente - En revisión
                </span>
              )}
              {profile.status === "REJECTED" && (
                <span className="inline-flex items-center text-sm text-red-400 bg-red-400/10 px-4 py-2 rounded-full">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Perfil Rechazado - Contacta al administrador
                </span>
              )}
            </div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-gold-500/20 rounded-lg p-6"
          >
            <h3 className="font-serif text-xl text-white mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-gold-400" />
              Información Personal
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="artisticName">Nombre Artístico</Label>
                <Input
                  id="artisticName"
                  value={formData.artisticName}
                  onChange={(e) => setFormData({ ...formData, artisticName: e.target.value })}
                  placeholder="Tu nombre artístico"
                  className="bg-black/50 border-gold-500/30 focus:border-gold-500"
                />
              </div>
              
              <div>
                <Label htmlFor="bio">Biografía</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Cuéntanos sobre ti..."
                  rows={4}
                  className="bg-black/50 border-gold-500/30 focus:border-gold-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    placeholder="175"
                    className="bg-black/50 border-gold-500/30 focus:border-gold-500"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="55"
                    className="bg-black/50 border-gold-500/30 focus:border-gold-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eyeColor">Color de Ojos</Label>
                  <Input
                    id="eyeColor"
                    value={formData.eyeColor}
                    onChange={(e) => setFormData({ ...formData, eyeColor: e.target.value })}
                    placeholder="Marrón"
                    className="bg-black/50 border-gold-500/30 focus:border-gold-500"
                  />
                </div>
                <div>
                  <Label htmlFor="hairColor">Color de Cabello</Label>
                  <Input
                    id="hairColor"
                    value={formData.hairColor}
                    onChange={(e) => setFormData({ ...formData, hairColor: e.target.value })}
                    placeholder="Castaño"
                    className="bg-black/50 border-gold-500/30 focus:border-gold-500"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="measurements">Medidas</Label>
                <Input
                  id="measurements"
                  value={formData.measurements}
                  onChange={(e) => setFormData({ ...formData, measurements: e.target.value })}
                  placeholder="90-60-90"
                  className="bg-black/50 border-gold-500/30 focus:border-gold-500"
                />
              </div>
              
              <div>
                <Label htmlFor="location">Ubicación</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Ciudad de México, México"
                    className="pl-10 bg-black/50 border-gold-500/30 focus:border-gold-500"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="hobbies">Intereses / Hobbies</Label>
                <Input
                  id="hobbies"
                  value={formData.hobbies}
                  onChange={(e) => setFormData({ ...formData, hobbies: e.target.value })}
                  placeholder="Yoga, lectura, fotografía..."
                  className="bg-black/50 border-gold-500/30 focus:border-gold-500"
                />
              </div>
              
              <div>
                <Label htmlFor="languages">Idiomas</Label>
                <Input
                  id="languages"
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  placeholder="Español, Inglés, Portugués..."
                  className="bg-black/50 border-gold-500/30 focus:border-gold-500"
                />
              </div>
              
              <div className="pt-4 border-t border-gold-500/20">
                <h4 className="text-sm text-gray-400 mb-4">Redes Sociales</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <div className="relative">
                      <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="instagram"
                        value={formData.instagram}
                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                        placeholder="@usuario"
                        className="pl-10 bg-black/50 border-gold-500/30 focus:border-gold-500"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    <div className="relative">
                      <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="twitter"
                        value={formData.twitter}
                        onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                        placeholder="@usuario"
                        className="pl-10 bg-black/50 border-gold-500/30 focus:border-gold-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="w-full btn-luxury"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Guardar Cambios
              </Button>
            </div>
          </motion.div>

          {/* Photos Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-gold-500/20 rounded-lg p-6"
          >
            <h3 className="font-serif text-xl text-white mb-6 flex items-center">
              <Camera className="w-5 h-5 mr-2 text-gold-400" />
              Mis Fotos
            </h3>
            
            {/* Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gold-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-gold-500/50 transition-colors mb-6"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              {isUploading ? (
                <Loader2 className="w-8 h-8 mx-auto text-gold-400 animate-spin" />
              ) : (
                <>
                  <Upload className="w-8 h-8 mx-auto text-gold-400 mb-2" />
                  <p className="text-gray-400 text-sm">
                    Haz clic para subir fotos
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    JPG, PNG o WebP - Máximo 5MB
                  </p>
                </>
              )}
            </div>
            
            {/* Photo Grid */}
            {photos.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative aspect-square rounded overflow-hidden group"
                  >
                    <img
                      src={photo.url}
                      alt="Foto"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      {getStatusBadge(photo.status)}
                    </div>
                    {photo.isProfilePhoto && (
                      <div className="absolute top-1 left-1 bg-gold-500 text-black text-xs font-bold px-2 py-0.5 rounded">
                        Perfil
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No has subido fotos aún</p>
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-4">
              * Las fotos serán revisadas por nuestro equipo antes de ser publicadas.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
