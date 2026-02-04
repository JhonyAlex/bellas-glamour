import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { Link, useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await login(email, password);
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/');
      }
    } catch (error) {
      // El error ya está manejado en el store
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-dark-gray border border-medium-gray rounded-sm p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="font-playfair text-3xl text-platinum font-bold">
            Bienvenido a <span className="text-deep-magenta">BellasGlamour</span>
          </h2>
          <p className="font-montserrat text-light-gray">
            Ingresa a tu cuenta exclusiva
          </p>
        </div>

        {/* Error general */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500/50 rounded-sm p-3"
          >
            <p className="text-red-400 text-sm font-montserrat">{error}</p>
          </motion.div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            leftIcon={<Mail className="w-5 h-5" />}
            error={errors.email}
            disabled={isLoading}
          />

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              label="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock className="w-5 h-5" />}
              error={errors.password}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-gray hover:text-platinum transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            isLoading={isLoading}
          >
            Iniciar Sesión
          </Button>
        </form>

        {/* Enlaces adicionales */}
        <div className="text-center space-y-3">
          <Link
            to="/forgot-password"
            className="font-montserrat text-sm text-deep-magenta hover:text-platinum transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </Link>
          
          <div className="font-montserrat text-sm text-light-gray">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/register"
              className="text-deep-magenta hover:text-platinum transition-colors font-medium"
            >
              Regístrate aquí
            </Link>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-medium-gray" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-dark-gray font-montserrat text-light-gray">
              O continúa con
            </span>
          </div>
        </div>

        {/* Registro rápido para modelos */}
        <div className="text-center">
          <p className="font-montserrat text-xs text-light-gray mb-2">
            ¿Eres modelo? Regístrate como
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => navigate('/register?type=model')}
            >
              Modelo
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => navigate('/register?type=client')}
            >
              Cliente
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};