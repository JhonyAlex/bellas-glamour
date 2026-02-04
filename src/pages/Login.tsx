import React from 'react';
import { Header } from '../components/layout/Header';
import { LoginForm } from '../components/auth/LoginForm';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-jet-black">
      <Header />
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-12"
        >
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-playfair text-4xl text-platinum mb-2">
                Iniciar <span className="text-deep-magenta">Sesión</span>
              </h1>
              <p className="font-montserrat text-light-gray">
                Accede a tu cuenta exclusiva en BellasGlamour
              </p>
            </div>
            <LoginForm />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Login;