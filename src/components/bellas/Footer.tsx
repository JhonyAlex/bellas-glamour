"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin, Heart, Shield, AlertTriangle } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/#inicio", label: "Inicio" },
    { href: "/#modelos", label: "Modelos" },
    { href: "/#nosotros", label: "Nosotros" },
    { href: "/#contacto", label: "Contacto" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  ];

  return (
    <footer className="bg-black border-t border-gold-500/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Age Warning Banner */}
        <div className="py-4 border-b border-gold-500/10">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <Shield className="w-4 h-4 text-gold-400" />
            <span>Solo para mayores de 18 años</span>
            <span className="text-gold-500">•</span>
            <AlertTriangle className="w-4 h-4 text-gold-400" />
            <span>Contenido para adultos</span>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-gold-gradient">
                  Bellas
                </span>
                <span className="font-serif text-sm tracking-[0.3em] text-gold-400 -mt-1">
                  GLAMOUR
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Agencia de modelos premium exclusiva para adultos. Representamos 
              talento excepcional para proyectos de moda de lujo, publicidad 
              de alta gama y experiencias VIP.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-white">Enlaces</h3>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  whileHover={{ x: 4 }}
                  className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#"
                whileHover={{ x: 4 }}
                className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
              >
                Términos y Condiciones
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ x: 4 }}
                className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
              >
                Política de Privacidad
              </motion.a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-white">Contacto VIP</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>Ciudad de México, México</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-gold-400" />
                <span>+52 (55) 1234-5678</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-gold-400" />
                <span>vip@bellasglamour.com</span>
              </div>
            </div>
            
            {/* 18+ Badge */}
            <div className="pt-4">
              <div className="inline-flex items-center bg-gold-500/10 border border-gold-500/30 rounded-lg px-3 py-2">
                <Shield className="w-5 h-5 text-gold-400 mr-2" />
                <span className="text-gold-400 font-bold">18+</span>
                <span className="text-gray-400 ml-2 text-xs">Solo Adultos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gold" />

        {/* Copyright */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>
            © {currentYear} Bellas Glamour. Todos los derechos reservados.
          </p>
          <p className="flex items-center mt-2 md:mt-0">
            Hecho con <Heart className="w-4 h-4 mx-1 text-gold-400" /> para adultos exigentes
          </p>
        </div>

        {/* Legal Disclaimer */}
        <div className="py-4 border-t border-gold-500/10 text-center">
          <p className="text-gray-600 text-xs max-w-3xl mx-auto">
            Este sitio web contiene material destinado exclusivamente a adultos mayores de 18 años. 
            Al acceder y utilizar este sitio, usted confirma que es mayor de edad según las leyes 
            de su país de residencia. El contenido aquí publicado es para fines de entretenimiento 
            y promoción artística. Queda prohibido el acceso a menores de edad.
          </p>
        </div>
      </div>
    </footer>
  );
}
