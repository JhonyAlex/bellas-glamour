"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Camera, Loader2, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [registerAsModel, setRegisterAsModel] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  
  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register form
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  
  const { login, setProfile } = useAuthStore();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
      }
      
      login(data.user, data.token);
      if (data.profile) {
        setProfile(data.profile);
      }
      
      toast({
        title: "¡Bienvenido!",
        description: `Has iniciado sesión como ${data.user.name || data.user.email}`,
      });
      
      onClose();
      resetForms();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al iniciar sesión",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ageConfirmed) {
      toast({
        title: "Confirmación requerida",
        description: "Debes confirmar que eres mayor de 18 años para registrarte.",
        variant: "destructive",
      });
      return;
    }
    
    if (registerPassword !== registerConfirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
          role: registerAsModel ? "MODEL" : "VISITOR",
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Error al crear cuenta");
      }
      
      login(data.user, data.token);
      
      if (registerAsModel) {
        toast({
          title: "¡Registro exitoso!",
          description: "Tu cuenta está pendiente de aprobación. Te notificaremos cuando sea aprobada.",
        });
      } else {
        toast({
          title: "¡Bienvenido!",
          description: "Tu cuenta ha sido creada exitosamente.",
        });
      }
      
      onClose();
      resetForms();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al crear cuenta",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForms = () => {
    setLoginEmail("");
    setLoginPassword("");
    setRegisterName("");
    setRegisterEmail("");
    setRegisterPassword("");
    setRegisterConfirmPassword("");
    setRegisterAsModel(false);
    setAgeConfirmed(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-card border border-gold-500/30 rounded-lg overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-6 border-b border-gold-500/20">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center">
                <h2 className="font-serif text-2xl font-bold text-gold-gradient">
                  Bellas Glamour
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Acceso exclusivo para adultos
                </p>
              </div>

              {/* 18+ Badge */}
              <div className="flex justify-center mt-4">
                <div className="flex items-center bg-gold-500/10 border border-gold-500/30 rounded-full px-3 py-1">
                  <Shield className="w-4 h-4 text-gold-400 mr-2" />
                  <span className="text-gold-400 font-bold text-xs">18+</span>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
              <TabsList className="w-full bg-black/50 border border-gold-500/20">
                <TabsTrigger
                  value="login"
                  className="flex-1 data-[state=active]:bg-gold-500/20 data-[state=active]:text-gold-400"
                >
                  Iniciar Sesión
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="flex-1 data-[state=active]:bg-gold-500/20 data-[state=active]:text-gold-400"
                >
                  Registrarse
                </TabsTrigger>
              </TabsList>
              
              {/* Login Form */}
              <TabsContent value="login" className="mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="tu@email.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-10 bg-black/50 border-gold-500/30 focus:border-gold-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-10 bg-black/50 border-gold-500/30 focus:border-gold-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full btn-luxury"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Iniciar Sesión"
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              {/* Register Form */}
              <TabsContent value="register" className="mt-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nombre Completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Tu nombre"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        className="pl-10 bg-black/50 border-gold-500/30 focus:border-gold-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="tu@email.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="pl-10 bg-black/50 border-gold-500/30 focus:border-gold-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="pl-10 bg-black/50 border-gold-500/30 focus:border-gold-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Confirmar Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="register-confirm"
                        type="password"
                        placeholder="••••••••"
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        className="pl-10 bg-black/50 border-gold-500/30 focus:border-gold-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Age Confirmation */}
                  <div 
                    onClick={() => setAgeConfirmed(!ageConfirmed)}
                    className="flex items-start space-x-3 p-3 bg-black/30 rounded-lg border border-gold-500/20 cursor-pointer hover:border-gold-500/40 transition-colors"
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      ageConfirmed 
                        ? "bg-gold-500 border-gold-500" 
                        : "border-gray-500"
                    }`}>
                      {ageConfirmed && <Check className="w-3 h-3 text-black" />}
                    </div>
                    <div>
                      <label className="text-sm text-gray-300 cursor-pointer">
                        <strong className="text-gold-400">Confirmo que soy mayor de 18 años</strong> y acepto los términos y condiciones del sitio.
                      </label>
                    </div>
                  </div>
                  
                  {/* Model Registration Toggle */}
                  <div className="flex items-center space-x-3 p-3 bg-black/30 rounded-lg border border-gold-500/20">
                    <input
                      type="checkbox"
                      id="register-model"
                      checked={registerAsModel}
                      onChange={(e) => setRegisterAsModel(e.target.checked)}
                      className="w-4 h-4 accent-gold-500"
                    />
                    <label htmlFor="register-model" className="flex items-center text-sm text-gray-300 cursor-pointer">
                      <Camera className="w-4 h-4 mr-2 text-gold-400" />
                      Quiero registrarme como modelo
                    </label>
                  </div>
                  
                  {registerAsModel && (
                    <p className="text-xs text-gold-400/80">
                      * Tu perfil será revisado por nuestro equipo antes de ser publicado.
                    </p>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full btn-luxury"
                    disabled={isLoading || !ageConfirmed}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Crear Cuenta"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            {/* Footer */}
            <div className="p-6 pt-0 text-center">
              <p className="text-xs text-gray-500 flex items-center justify-center">
                <Shield className="w-3 h-3 mr-1 text-gold-400" />
                Solo para mayores de 18 años
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
