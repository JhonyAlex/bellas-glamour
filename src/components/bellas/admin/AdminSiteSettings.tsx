"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, Globe, Layout, Briefcase, Phone, Type, ImageIcon, Check, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog, DialogContent, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";

interface ApprovedPhoto {
  id: string;
  url: string;
  isProfilePhoto: boolean;
  modelName: string;
  profileId: string;
}

interface SiteSettingsData {
  heroTagline?: string | null;
  heroCtaText?: string | null;
  aboutTitle?: string | null;
  aboutText1?: string | null;
  aboutText2?: string | null;
  aboutImageUrl?: string | null;
  stat1Value?: string | null;
  stat1Label?: string | null;
  stat2Value?: string | null;
  stat2Label?: string | null;
  stat3Value?: string | null;
  stat3Label?: string | null;
  servicesTitle?: string | null;
  servicesSubtitle?: string | null;
  service1Title?: string | null;
  service1Desc?: string | null;
  service1Icon?: string | null;
  service2Title?: string | null;
  service2Desc?: string | null;
  service2Icon?: string | null;
  service3Title?: string | null;
  service3Desc?: string | null;
  service3Icon?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  contactLocation?: string | null;
  membershipTitle?: string | null;
  membershipText?: string | null;
}

export function AdminSiteSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<SiteSettingsData>({});
  const [photoPickerOpen, setPhotoPickerOpen] = useState(false);
  const [approvedPhotos, setApprovedPhotos] = useState<ApprovedPhoto[]>([]);
  const [photosLoading, setPhotosLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/site-settings");
      if (res.ok) {
        const data = await res.json();
        setForm(data);
      }
    } catch {
      console.error("Error fetching settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Error al guardar");
      }

      // Invalidar cache para que el Home y Footer se actualicen en tiempo real
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast({ title: "Configuración guardada", description: "Los cambios se reflejan automáticamente en el sitio." });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo guardar",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const openPhotoPicker = async () => {
    setPhotoPickerOpen(true);
    if (approvedPhotos.length > 0) return; // Ya cargadas
    setPhotosLoading(true);
    try {
      const res = await fetch("/api/admin/approved-photos");
      if (res.ok) {
        setApprovedPhotos(await res.json());
      }
    } catch {
      console.error("Error fetching photos");
    } finally {
      setPhotosLoading(false);
    }
  };

  const selectAboutPhoto = (url: string) => {
    setForm((prev) => ({ ...prev, aboutImageUrl: url }));
    setPhotoPickerOpen(false);
  };

  const updateField = (field: keyof SiteSettingsData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value || null }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif text-xl text-white">Contenido del Sitio</h3>
          <p className="text-gray-400 text-sm">Edita los textos y datos que aparecen en la página principal</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-gold-500 hover:bg-gold-600 text-black font-medium">
          {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Guardar todo
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["hero", "about"]} className="space-y-3">
        {/* Hero / Slider */}
        <AccordionItem value="hero" className="bg-card border border-gold-500/20 rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-gold-400" />
              <span className="text-white font-medium">Hero / Slider</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 space-y-4">
            <div>
              <Label className="text-gray-400 text-sm">Tagline (texto debajo del slider)</Label>
              <Textarea
                value={form.heroTagline || ""}
                onChange={(e) => updateField("heroTagline", e.target.value)}
                placeholder="Agencia de modelos premium exclusiva para adultos..."
                className="mt-1 bg-secondary border-gold-500/10 text-white"
                rows={2}
              />
            </div>
            <div>
              <Label className="text-gray-400 text-sm">Texto del botón CTA</Label>
              <Input
                value={form.heroCtaText || ""}
                onChange={(e) => updateField("heroCtaText", e.target.value)}
                placeholder="Explorar Modelos"
                className="mt-1 bg-secondary border-gold-500/10 text-white"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* About */}
        <AccordionItem value="about" className="bg-card border border-gold-500/20 rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gold-400" />
              <span className="text-white font-medium">Sobre Nosotros</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 space-y-4">
            <div>
              <Label className="text-gray-400 text-sm">Título</Label>
              <Input
                value={form.aboutTitle || ""}
                onChange={(e) => updateField("aboutTitle", e.target.value)}
                placeholder="Sobre Bellas Glamour"
                className="mt-1 bg-secondary border-gold-500/10 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-400 text-sm">Primer párrafo</Label>
              <Textarea
                value={form.aboutText1 || ""}
                onChange={(e) => updateField("aboutText1", e.target.value)}
                placeholder="Somos una agencia de modelos premium..."
                className="mt-1 bg-secondary border-gold-500/10 text-white"
                rows={4}
              />
            </div>
            <div>
              <Label className="text-gray-400 text-sm">Segundo párrafo</Label>
              <Textarea
                value={form.aboutText2 || ""}
                onChange={(e) => updateField("aboutText2", e.target.value)}
                placeholder="Nuestra misión es descubrir..."
                className="mt-1 bg-secondary border-gold-500/10 text-white"
                rows={3}
              />
            </div>
            <div>
              <Label className="text-gray-400 text-sm">Imagen de la sección</Label>
              <div className="mt-1 flex items-start gap-4">
                {/* Vista previa */}
                <div className="relative w-24 h-32 rounded-lg overflow-hidden bg-secondary border border-gold-500/10 flex-shrink-0">
                  {form.aboutImageUrl ? (
                    <>
                      <Image
                        src={form.aboutImageUrl}
                        alt="Vista previa"
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="96px"
                      />
                      <button
                        onClick={() => setForm((prev) => ({ ...prev, aboutImageUrl: null }))}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center text-white transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={openPhotoPicker}
                    className="w-full border-gold-500/30 text-gold-400 hover:bg-gold-500/10"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Elegir de fotos de modelos
                  </Button>
                  <p className="text-gray-500 text-xs">
                    Selecciona una foto aprobada de cualquier modelo
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <Label className="text-gray-400 text-xs">Stat 1 Valor</Label>
                <Input value={form.stat1Value || ""} onChange={(e) => updateField("stat1Value", e.target.value)} placeholder="150+" className="mt-1 bg-secondary border-gold-500/10 text-white" />
              </div>
              <div>
                <Label className="text-gray-400 text-xs">Stat 1 Etiqueta</Label>
                <Input value={form.stat1Label || ""} onChange={(e) => updateField("stat1Label", e.target.value)} placeholder="Modelos" className="mt-1 bg-secondary border-gold-500/10 text-white" />
              </div>
              <div>
                <Label className="text-gray-400 text-xs">Stat 2 Valor</Label>
                <Input value={form.stat2Value || ""} onChange={(e) => updateField("stat2Value", e.target.value)} placeholder="500+" className="mt-1 bg-secondary border-gold-500/10 text-white" />
              </div>
              <div>
                <Label className="text-gray-400 text-xs">Stat 2 Etiqueta</Label>
                <Input value={form.stat2Label || ""} onChange={(e) => updateField("stat2Label", e.target.value)} placeholder="Proyectos" className="mt-1 bg-secondary border-gold-500/10 text-white" />
              </div>
              <div>
                <Label className="text-gray-400 text-xs">Stat 3 Valor</Label>
                <Input value={form.stat3Value || ""} onChange={(e) => updateField("stat3Value", e.target.value)} placeholder="10+" className="mt-1 bg-secondary border-gold-500/10 text-white" />
              </div>
              <div>
                <Label className="text-gray-400 text-xs">Stat 3 Etiqueta</Label>
                <Input value={form.stat3Label || ""} onChange={(e) => updateField("stat3Label", e.target.value)} placeholder="Años" className="mt-1 bg-secondary border-gold-500/10 text-white" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Services */}
        <AccordionItem value="services" className="bg-card border border-gold-500/20 rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gold-400" />
              <span className="text-white font-medium">Servicios</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-400 text-sm">Título de sección</Label>
                <Input value={form.servicesTitle || ""} onChange={(e) => updateField("servicesTitle", e.target.value)} placeholder="Servicios Premium" className="mt-1 bg-secondary border-gold-500/10 text-white" />
              </div>
              <div>
                <Label className="text-gray-400 text-sm">Subtítulo</Label>
                <Input value={form.servicesSubtitle || ""} onChange={(e) => updateField("servicesSubtitle", e.target.value)} placeholder="Experiencias exclusivas..." className="mt-1 bg-secondary border-gold-500/10 text-white" />
              </div>
            </div>
            {[1, 2, 3].map((n) => (
              <div key={n} className="border border-gold-500/10 rounded-lg p-3 space-y-2">
                <p className="text-gold-400 text-sm font-medium">Servicio {n}</p>
                <div className="grid grid-cols-[auto_1fr] gap-2">
                  <div>
                    <Label className="text-gray-400 text-xs">Icono</Label>
                    <Input
                      value={(form as Record<string, string | null | undefined>)[`service${n}Icon`] || ""}
                      onChange={(e) => updateField(`service${n}Icon` as keyof SiteSettingsData, e.target.value)}
                      placeholder="🥂"
                      className="mt-1 bg-secondary border-gold-500/10 text-white w-16 text-center"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-400 text-xs">Título</Label>
                    <Input
                      value={(form as Record<string, string | null | undefined>)[`service${n}Title`] || ""}
                      onChange={(e) => updateField(`service${n}Title` as keyof SiteSettingsData, e.target.value)}
                      placeholder="Nombre del servicio"
                      className="mt-1 bg-secondary border-gold-500/10 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-400 text-xs">Descripción</Label>
                  <Textarea
                    value={(form as Record<string, string | null | undefined>)[`service${n}Desc`] || ""}
                    onChange={(e) => updateField(`service${n}Desc` as keyof SiteSettingsData, e.target.value)}
                    placeholder="Descripción del servicio..."
                    className="mt-1 bg-secondary border-gold-500/10 text-white"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Contact */}
        <AccordionItem value="contact" className="bg-card border border-gold-500/20 rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold-400" />
              <span className="text-white font-medium">Contacto</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 space-y-4">
            <div>
              <Label className="text-gray-400 text-sm">Email</Label>
              <Input value={form.contactEmail || ""} onChange={(e) => updateField("contactEmail", e.target.value)} placeholder="vip@bellasglamour.com" className="mt-1 bg-secondary border-gold-500/10 text-white" />
            </div>
            <div>
              <Label className="text-gray-400 text-sm">Teléfono</Label>
              <Input value={form.contactPhone || ""} onChange={(e) => updateField("contactPhone", e.target.value)} placeholder="+52 (55) 1234-5678" className="mt-1 bg-secondary border-gold-500/10 text-white" />
            </div>
            <div>
              <Label className="text-gray-400 text-sm">Ubicación</Label>
              <Input value={form.contactLocation || ""} onChange={(e) => updateField("contactLocation", e.target.value)} placeholder="Ciudad de México, México" className="mt-1 bg-secondary border-gold-500/10 text-white" />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Membership */}
        <AccordionItem value="membership" className="bg-card border border-gold-500/20 rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-2">
              <Layout className="w-4 h-4 text-gold-400" />
              <span className="text-white font-medium">Banner Membresía</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 space-y-4">
            <div>
              <Label className="text-gray-400 text-sm">Título</Label>
              <Input value={form.membershipTitle || ""} onChange={(e) => updateField("membershipTitle", e.target.value)} placeholder="Acceso VIP" className="mt-1 bg-secondary border-gold-500/10 text-white" />
            </div>
            <div>
              <Label className="text-gray-400 text-sm">Texto</Label>
              <Textarea value={form.membershipText || ""} onChange={(e) => updateField("membershipText", e.target.value)} placeholder="Únete a nuestra comunidad exclusiva..." className="mt-1 bg-secondary border-gold-500/10 text-white" rows={3} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Bottom save button */}
      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} disabled={isSaving} className="bg-gold-500 hover:bg-gold-600 text-black font-medium">
          {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Guardar cambios
        </Button>
      </div>

      {/* Photo Picker Dialog */}
      <Dialog open={photoPickerOpen} onOpenChange={setPhotoPickerOpen}>
        <DialogContent className="bg-card border-gold-500/20 max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogTitle className="text-white font-serif text-lg">Elegir imagen de &ldquo;Sobre Nosotros&rdquo;</DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Selecciona una foto aprobada de las modelos para mostrar en la sección &ldquo;Sobre Bellas Glamour&rdquo;
          </DialogDescription>

          {photosLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
            </div>
          ) : approvedPhotos.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-10 h-10 mx-auto text-gray-500 mb-3" />
              <p className="text-gray-400 text-sm">No hay fotos aprobadas disponibles</p>
            </div>
          ) : (
            <div className="overflow-y-auto flex-1 -mx-2 px-2">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {approvedPhotos.map((photo) => {
                  const isSelected = form.aboutImageUrl === photo.url;
                  return (
                    <button
                      key={photo.id}
                      onClick={() => selectAboutPhoto(photo.url)}
                      className={`group relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${
                        isSelected
                          ? "border-gold-500 ring-2 ring-gold-500/30"
                          : "border-transparent hover:border-gold-500/50"
                      }`}
                    >
                      <Image
                        src={photo.url}
                        alt={photo.modelName}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="150px"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                        <p className="text-white text-[11px] font-medium truncate">{photo.modelName}</p>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-black" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
