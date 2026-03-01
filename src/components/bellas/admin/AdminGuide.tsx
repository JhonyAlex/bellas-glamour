"use client";

import { useState } from "react";
import {
    ChevronLeft, ChevronRight, X, Check,
    CheckSquare, Users, Image, Sliders, Settings, BookOpen,
    Star, Trash2, Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface AdminGuideProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const GUIDE_SEEN_KEY = "bg_admin_guide_seen";

const steps = [
    {
        icon: BookOpen,
        title: "¡Hola, Wilson! 👋",
        subtitle: "Bienvenido al panel de administración",
        content: (
            <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
                <p>
                    Este es el panel de control de <strong className="text-gold-400">Bellas Glamour</strong>. Desde aquí puedes gestionar todo el contenido del sitio: modelos, fotos, slider y configuración general.
                </p>
                <p>
                    Esta guía te explicará cada sección paso a paso. Puedes cerrarla ahora y volver a abrirla en cualquier momento desde el botón <strong className="text-white">Guía</strong> en la barra superior.
                </p>
                <div className="bg-gold-500/10 border border-gold-500/20 rounded-lg p-3 mt-4">
                    <p className="text-gold-400 font-medium text-xs uppercase tracking-wider mb-1">El panel tiene 4 secciones principales:</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {[
                            { label: "Aprobaciones", icon: CheckSquare },
                            { label: "Directorio", icon: Users },
                            { label: "Slider", icon: Image },
                            { label: "Configuración", icon: Settings },
                        ].map(({ label, icon: Icon }) => (
                            <div key={label} className="flex items-center gap-2 text-gray-300 text-xs">
                                <Icon className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    {
        icon: CheckSquare,
        title: "Tab: Aprobaciones",
        subtitle: "Revisa y modera nuevos registros",
        content: (
            <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
                <p>
                    Cuando una nueva modelo se registra o sube fotos, la solicitud llega aquí para tu revisión. También verás un contador de pendientes en la parte superior.
                </p>
                <div className="space-y-2">
                    <div className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-green-400" />
                        </div>
                        <p><strong className="text-white">Aprobar:</strong> La modelo o foto queda visible públicamente en el sitio.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <X className="w-3 h-3 text-red-400" />
                        </div>
                        <p><strong className="text-white">Rechazar:</strong> El contenido es retirado y no se muestra al público.</p>
                    </div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-yellow-300 text-xs">
                    💡 Revisa siempre esta sección al iniciar. Los registros nuevos se acumulan aquí hasta que los proceses.
                </div>
            </div>
        ),
    },
    {
        icon: Users,
        title: "Tab: Directorio de Modelos",
        subtitle: "Lista completa de todas las modelos",
        content: (
            <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
                <p>
                    Aquí puedes ver, buscar y filtrar todas las modelos registradas. La tabla muestra su nombre, estado, vistas y miniatura de fotos.
                </p>
                <div className="space-y-2">
                    <div className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Users className="w-3 h-3 text-gold-400" />
                        </div>
                        <p><strong className="text-white">Clic en cualquier fila</strong> para abrir el panel de gestión completo de esa modelo.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Star className="w-3 h-3 text-gold-400" />
                        </div>
                        <p><strong className="text-white">Destacar:</strong> Las modelos destacadas aparecen primero en el sitio y tienen un badge especial.</p>
                    </div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-blue-300 text-xs">
                    🔍 Usa la barra de búsqueda y los filtros para encontrar modelos por nombre, estado o si están destacadas.
                </div>
            </div>
        ),
    },
    {
        icon: Edit,
        title: "Gestión individual de modelo",
        subtitle: "Panel de detalle al hacer clic en una modelo",
        content: (
            <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
                <p>
                    Al hacer clic en una modelo, se abre su panel de gestión completo. Desde ahí puedes:
                </p>
                <div className="space-y-2">
                    {[
                        { icon: Edit, label: "Editar perfil", desc: "Actualizar todos sus datos: nombre, medidas, bio, redes sociales..." },
                        { icon: CheckSquare, label: "Cambiar estado", desc: "Aprobar, rechazar o poner en pendiente. También puedes marcarla como Destacada." },
                        { icon: Image, label: "Gestionar galería", desc: "Aprobar o rechazar fotos, establecer la foto de portada, agregar fotos al slider." },
                        { icon: Trash2, label: "Eliminar modelo", desc: "Eliminación completa: perfil, fotos y cuenta de acceso. Esta acción no se puede deshacer." },
                    ].map(({ icon: Icon, label, desc }) => (
                        <div key={label} className="flex gap-3 items-start">
                            <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Icon className="w-3 h-3 text-gold-400" />
                            </div>
                            <p><strong className="text-white">{label}:</strong> {desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        icon: Image,
        title: "Tab: Slider",
        subtitle: "Administra el carrusel de la página principal",
        content: (
            <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
                <p>
                    El slider es el carrusel de imágenes que se muestra en la portada del sitio. Puedes agregar fotos al slider desde la galería de cualquier modelo.
                </p>
                <div className="space-y-2">
                    <div className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Sliders className="w-3 h-3 text-gold-400" />
                        </div>
                        <p><strong className="text-white">Reordenar:</strong> Arrastra las imágenes para cambiar el orden en que aparecen.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-gold-400" />
                        </div>
                        <p><strong className="text-white">Activar/Desactivar:</strong> Puedes ocultar una imagen sin eliminarla del slider.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Trash2 className="w-3 h-3 text-red-400" />
                        </div>
                        <p><strong className="text-white">Eliminar:</strong> Quita la imagen del slider (no elimina la foto de la modelo).</p>
                    </div>
                </div>
            </div>
        ),
    },
    {
        icon: Settings,
        title: "Tab: Configuración del sitio",
        subtitle: "Textos, contacto y apariencia general",
        content: (
            <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
                <p>
                    Desde aquí puedes actualizar el contenido general del sitio sin necesidad de tocar código.
                </p>
                <div className="space-y-2 text-xs">
                    {[
                        "Tagline y texto del botón principal (hero)",
                        "Texto e imagen de la sección \"Nosotros\"",
                        "Estadísticas (número de modelos, años de experiencia, etc.)",
                        "Títulos y descripciones de los servicios",
                        "Datos de contacto (correo, teléfono, dirección)",
                        "Número de WhatsApp para el botón flotante",
                    ].map((item) => (
                        <div key={item} className="flex gap-2 items-start">
                            <Check className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-green-300 text-xs">
                    ✅ Recuerda guardar los cambios con el botón "Guardar configuración" al final de cada sección.
                </div>
            </div>
        ),
    },
    {
        icon: BookOpen,
        title: "¡Todo listo, Wilson!",
        subtitle: "Ya puedes comenzar a administrar el sitio",
        content: (
            <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
                <p>
                    Has completado la guía de administración de Bellas Glamour. Ahora sabes cómo usar todas las secciones del panel.
                </p>
                <div className="bg-gold-500/10 border border-gold-500/20 rounded-lg p-4 space-y-2">
                    <p className="text-gold-400 font-medium text-sm">Recordatorio rápido:</p>
                    <ul className="space-y-1 text-xs text-gray-300">
                        <li>📋 <strong className="text-white">Aprobaciones</strong> → revisar nuevos registros</li>
                        <li>👥 <strong className="text-white">Directorio</strong> → gestionar modelos (clic en la fila)</li>
                        <li>🖼️ <strong className="text-white">Slider</strong> → carrusel de portada</li>
                        <li>⚙️ <strong className="text-white">Configuración</strong> → textos y contacto del sitio</li>
                    </ul>
                </div>
                <p className="text-gray-400 text-xs">
                    Puedes volver a ver esta guía en cualquier momento haciendo clic en el botón <strong className="text-white">Guía</strong> de la barra superior.
                </p>
            </div>
        ),
    },
];

export function AdminGuide({ open, onOpenChange }: AdminGuideProps) {
    const [step, setStep] = useState(0);

    const handleClose = () => {
        // Marcar como vista para no mostrarla automáticamente de nuevo
        if (typeof window !== "undefined") {
            localStorage.setItem(GUIDE_SEEN_KEY, "true");
        }
        onOpenChange(false);
        // Reiniciar al primer paso para la próxima vez
        setStep(0);
    };

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep((s) => s + 1);
        } else {
            handleClose();
        }
    };

    const handlePrev = () => {
        if (step > 0) setStep((s) => s - 1);
    };

    const current = steps[step];
    const StepIcon = current.icon;
    const isLastStep = step === steps.length - 1;

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
            <DialogContent className="bg-card border border-gold-500/20 max-w-lg p-0 overflow-hidden gap-0">
                {/* Títulos accesibles ocultos visualmente (requerido por Radix Dialog) */}
                <DialogTitle className="sr-only">{current.title}</DialogTitle>
                <DialogDescription className="sr-only">{current.subtitle}</DialogDescription>
                {/* Header */}
                <div className="bg-gradient-to-br from-black to-card border-b border-gold-500/20 p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                            <StepIcon className="w-5 h-5 text-gold-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="font-serif text-lg text-white truncate">{current.title}</h2>
                            <p className="text-gray-400 text-sm">{current.subtitle}</p>
                        </div>
                    </div>

                    {/* Progress dots */}
                    <div className="flex gap-1.5">
                        {steps.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setStep(i)}
                                className={`h-1.5 rounded-full transition-all duration-200 ${
                                    i === step
                                        ? "bg-gold-400 w-6"
                                        : i < step
                                        ? "bg-gold-400/50 w-2"
                                        : "bg-gray-600 w-2"
                                }`}
                                aria-label={`Ir al paso ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 min-h-[200px]">{current.content}</div>

                {/* Footer navigation */}
                <div className="flex items-center justify-between p-6 pt-0 gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePrev}
                        disabled={step === 0}
                        className="text-gray-400 hover:text-white"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Anterior
                    </Button>

                    <span className="text-gray-500 text-xs">
                        {step + 1} / {steps.length}
                    </span>

                    <Button
                        size="sm"
                        onClick={handleNext}
                        className="btn-luxury"
                    >
                        {isLastStep ? (
                            <>
                                <Check className="w-4 h-4 mr-1" />
                                Finalizar
                            </>
                        ) : (
                            <>
                                Siguiente
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

// Función utilitaria para verificar si la guía ya fue vista
export function hasSeenGuide(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(GUIDE_SEEN_KEY) === "true";
}
