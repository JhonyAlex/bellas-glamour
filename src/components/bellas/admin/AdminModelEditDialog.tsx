"use client";

import { useEffect, forwardRef } from "react";
import { motion } from "framer-motion";
import {
    Loader2, Save, User, Ruler, Briefcase, Globe, Instagram,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
    Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAdminModel, useUpdateModel, type AdminModelDetail } from "@/hooks/use-admin-models";
import { adminProfileUpdateSchema, type AdminProfileUpdateInput } from "@/lib/admin-validations";

interface AdminModelEditDialogProps {
    profileId: string | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AdminModelEditDialog({
    profileId,
    open,
    onOpenChange,
}: AdminModelEditDialogProps) {
    const { toast } = useToast();
    const { data: model, isLoading: isLoadingModel } = useAdminModel(profileId);
    const updateModel = useUpdateModel();

    const form = useForm<AdminProfileUpdateInput>({
        resolver: zodResolver(adminProfileUpdateSchema) as any,
        defaultValues: {},
    });

    // Resetear formulario cuando el modelo carga
    useEffect(() => {
        if (model) {
            form.reset({
                artisticName: model.artisticName,
                bio: model.bio,
                birthDate: model.birthDate ? model.birthDate.split("T")[0] : null,
                nationality: model.nationality,
                location: model.location,
                height: model.height,
                weight: model.weight,
                eyeColor: model.eyeColor,
                hairColor: model.hairColor,
                skinTone: model.skinTone,
                measurements: model.measurements,
                shoeSize: model.shoeSize,
                hobbies: model.hobbies,
                languages: model.languages,
                skills: model.skills,
                experience: model.experience,
                specialties: model.specialties,
                availability: model.availability,
                instagram: model.instagram,
                twitter: model.twitter,
                tiktok: model.tiktok,
            });
        }
    }, [model, form]);

    const onSubmit = async (data: AdminProfileUpdateInput) => {
        if (!profileId) return;

        try {
            await updateModel.mutateAsync({ id: profileId, data });
            toast({
                title: "Perfil actualizado",
                description: "Los datos del perfil se han guardado correctamente.",
            });
            onOpenChange(false);
        } catch (error) {
            toast({
                title: "Error al guardar",
                description: error instanceof Error ? error.message : "No se pudo actualizar el perfil.",
                variant: "destructive",
            });
        }
    };

    const { errors, isDirty } = form.formState;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-card border-gold-500/20 max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-white font-serif text-xl">
                        Editar Perfil
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        {model ? (model.artisticName || model.user?.name || model.user?.email) : "Cargando..."}
                    </DialogDescription>
                </DialogHeader>

                {isLoadingModel ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
                    </div>
                ) : (
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <Tabs defaultValue="personal" className="w-full">
                            <TabsList className="w-full bg-secondary border border-gold-500/10">
                                <TabsTrigger value="personal" className="flex-1 data-[state=active]:bg-gold-500/20 data-[state=active]:text-gold-400">
                                    <User className="w-4 h-4 mr-1.5 hidden sm:inline" />
                                    Personal
                                </TabsTrigger>
                                <TabsTrigger value="physical" className="flex-1 data-[state=active]:bg-gold-500/20 data-[state=active]:text-gold-400">
                                    <Ruler className="w-4 h-4 mr-1.5 hidden sm:inline" />
                                    Físico
                                </TabsTrigger>
                                <TabsTrigger value="professional" className="flex-1 data-[state=active]:bg-gold-500/20 data-[state=active]:text-gold-400">
                                    <Briefcase className="w-4 h-4 mr-1.5 hidden sm:inline" />
                                    Profesional
                                </TabsTrigger>
                                <TabsTrigger value="social" className="flex-1 data-[state=active]:bg-gold-500/20 data-[state=active]:text-gold-400">
                                    <Globe className="w-4 h-4 mr-1.5 hidden sm:inline" />
                                    Social
                                </TabsTrigger>
                            </TabsList>

                            {/* === TAB: Información Personal === */}
                            <TabsContent value="personal" className="space-y-4 mt-4">
                                <FormField
                                    label="Nombre artístico"
                                    error={errors.artisticName?.message}
                                    {...form.register("artisticName")}
                                />
                                <div>
                                    <Label className="text-gray-400 text-sm">Biografía</Label>
                                    <Textarea
                                        className="mt-1.5 bg-secondary border-gold-500/10 text-white resize-none"
                                        rows={4}
                                        {...form.register("bio")}
                                    />
                                    {errors.bio && <p className="text-red-400 text-xs mt-1">{errors.bio.message}</p>}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        label="Fecha de nacimiento"
                                        type="date"
                                        error={errors.birthDate?.message}
                                        {...form.register("birthDate")}
                                    />
                                    <FormField
                                        label="Nacionalidad"
                                        error={errors.nationality?.message}
                                        {...form.register("nationality")}
                                    />
                                </div>
                                <FormField
                                    label="Ubicación"
                                    error={errors.location?.message}
                                    {...form.register("location")}
                                />
                            </TabsContent>

                            {/* === TAB: Características Físicas === */}
                            <TabsContent value="physical" className="space-y-4 mt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        label="Altura (cm)"
                                        type="number"
                                        step="0.1"
                                        error={errors.height?.message}
                                        {...form.register("height", { valueAsNumber: true })}
                                    />
                                    <FormField
                                        label="Peso (kg)"
                                        type="number"
                                        step="0.1"
                                        error={errors.weight?.message}
                                        {...form.register("weight", { valueAsNumber: true })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        label="Color de ojos"
                                        error={errors.eyeColor?.message}
                                        {...form.register("eyeColor")}
                                    />
                                    <FormField
                                        label="Color de cabello"
                                        error={errors.hairColor?.message}
                                        {...form.register("hairColor")}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        label="Tono de piel"
                                        error={errors.skinTone?.message}
                                        {...form.register("skinTone")}
                                    />
                                    <FormField
                                        label="Medidas (ej: 90-60-90)"
                                        error={errors.measurements?.message}
                                        {...form.register("measurements")}
                                    />
                                </div>
                                <FormField
                                    label="Talla de zapato"
                                    type="number"
                                    step="0.5"
                                    error={errors.shoeSize?.message}
                                    {...form.register("shoeSize", { valueAsNumber: true })}
                                />
                            </TabsContent>

                            {/* === TAB: Profesional === */}
                            <TabsContent value="professional" className="space-y-4 mt-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        label="Experiencia"
                                        error={errors.experience?.message}
                                        {...form.register("experience")}
                                    />
                                    <FormField
                                        label="Disponibilidad"
                                        error={errors.availability?.message}
                                        {...form.register("availability")}
                                    />
                                </div>
                                <FormField
                                    label="Especialidades"
                                    placeholder="Moda, comercial, pasarela..."
                                    error={errors.specialties?.message}
                                    {...form.register("specialties")}
                                />
                                <FormField
                                    label="Idiomas"
                                    placeholder="Español, Inglés..."
                                    error={errors.languages?.message}
                                    {...form.register("languages")}
                                />
                                <FormField
                                    label="Habilidades"
                                    error={errors.skills?.message}
                                    {...form.register("skills")}
                                />
                                <FormField
                                    label="Hobbies"
                                    error={errors.hobbies?.message}
                                    {...form.register("hobbies")}
                                />
                            </TabsContent>

                            {/* === TAB: Redes Sociales === */}
                            <TabsContent value="social" className="space-y-4 mt-4">
                                <FormField
                                    label="Instagram"
                                    placeholder="https://instagram.com/usuario"
                                    error={errors.instagram?.message}
                                    {...form.register("instagram")}
                                />
                                <FormField
                                    label="Twitter / X"
                                    placeholder="https://twitter.com/usuario"
                                    error={errors.twitter?.message}
                                    {...form.register("twitter")}
                                />
                                <FormField
                                    label="TikTok"
                                    placeholder="https://tiktok.com/@usuario"
                                    error={errors.tiktok?.message}
                                    {...form.register("tiktok")}
                                />
                            </TabsContent>
                        </Tabs>

                        {/* Botones de acción */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gold-500/10">
                            <Button
                                type="button"
                                variant="outline"
                                className="border-gray-600 text-gray-300"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="bg-gold-500 hover:bg-gold-600 text-black font-medium"
                                disabled={updateModel.isPending || !isDirty}
                            >
                                {updateModel.isPending ? (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4 mr-2" />
                                )}
                                Guardar cambios
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}

// ==================== Componente de campo reutilizable ====================



interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div>
                <Label className="text-gray-400 text-sm">{label}</Label>
                <Input
                    ref={ref}
                    className={`mt-1.5 bg-secondary border-gold-500/10 text-white ${error ? "border-red-500" : ""
                        } ${className || ""}`}
                    {...props}
                />
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-xs mt-1"
                    >
                        {error}
                    </motion.p>
                )}
            </div>
        );
    }
);

FormField.displayName = "FormField";
