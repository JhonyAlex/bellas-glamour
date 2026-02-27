"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, Crown, Camera, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

interface NavbarProps {
  onLoginClick: () => void;
  onDashboardClick: () => void;
}

export function Navbar({ onLoginClick, onDashboardClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#modelos", label: "Modelos" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-lg border-b border-gold-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col"
            >
              <span className="font-serif text-2xl md:text-3xl font-bold text-gold-gradient">
                Bellas
              </span>
              <span className="font-serif text-sm tracking-[0.3em] text-gold-400 -mt-1">
                GLAMOUR
              </span>
            </motion.div>
            
            {/* 18+ Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden sm:flex items-center bg-gold-500/10 border border-gold-500/30 rounded-full px-2 py-0.5"
            >
              <Shield className="w-3 h-3 text-gold-400 mr-1" />
              <span className="text-gold-400 font-bold text-xs">18+</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={{ y: -2 }}
                className="text-gray-300 hover:text-gold-400 transition-colors duration-300 font-medium tracking-wide"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                {user.role === "ADMIN" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onDashboardClick}
                    className="text-gold-400 hover:text-gold-300"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                )}
                {user.role === "MODEL" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onDashboardClick}
                    className="text-gold-400 hover:text-gold-300"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Mi Perfil
                  </Button>
                )}
                <div className="flex items-center space-x-2 text-gray-300">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.name || user.email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-white"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={onLoginClick}
                  className="text-gray-300 hover:text-white"
                >
                  Acceso
                </Button>
                <Button
                  onClick={onLoginClick}
                  className="btn-luxury"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  VIP
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-b border-gold-500/20"
          >
            <div className="px-4 py-6 space-y-4">
              {/* 18+ Notice */}
              <div className="flex items-center justify-center py-2 bg-gold-500/10 rounded-lg mb-4">
                <Shield className="w-4 h-4 text-gold-400 mr-2" />
                <span className="text-gold-400 text-sm font-bold">Solo para mayores de 18 años</span>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-gold-400 py-2 font-medium"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-800 space-y-2">
                {isAuthenticated ? (
                  <>
                    {user?.role === "MODEL" && (
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gold-400"
                        onClick={() => {
                          onDashboardClick();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Mi Perfil
                      </Button>
                    )}
                    {user?.role === "ADMIN" && (
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gold-400"
                        onClick={() => {
                          onDashboardClick();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Admin
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-400"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Salir
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => {
                        onLoginClick();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Acceso
                    </Button>
                    <Button
                      className="w-full btn-luxury"
                      onClick={() => {
                        onLoginClick();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Acceso VIP
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
