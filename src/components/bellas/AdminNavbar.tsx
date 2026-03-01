"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, LogOut, Crown, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { AdminGuide } from "./admin/AdminGuide";

export function AdminNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const { user, logout } = useAuthStore();

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
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-lg border-b border-gold-500/20"
          : "bg-black/70 backdrop-blur-sm border-b border-gold-500/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col">
              <span className="font-serif text-2xl md:text-3xl font-bold text-gold-gradient">
                Bellas
              </span>
              <span className="font-serif text-sm tracking-[0.3em] text-gold-400 -mt-1">
                GLAMOUR
              </span>
            </motion.div>
            <div className="flex items-center bg-gold-500/10 border border-gold-500/30 rounded-full px-2 py-0.5">
              <Crown className="w-3 h-3 text-gold-400 mr-1" />
              <span className="text-gold-400 font-bold text-xs">ADMIN</span>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setGuideOpen(true)}
              className="text-gray-400 hover:text-gold-400 border border-gold-500/20 hover:border-gold-500/40"
              title="Abrir guía de usuario"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Guía</span>
            </Button>

            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="border-gold-500/30 text-gold-400 hover:bg-gold-500/10"
              >
                <Home className="w-4 h-4 mr-2" />
                Volver al Inicio
              </Button>
            </Link>

            <div className="hidden sm:flex items-center space-x-2 text-gray-300">
              <User className="w-4 h-4" />
              <span className="text-sm">{user?.name || user?.email}</span>
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
        </div>
      </div>
    </motion.nav>

      <AdminGuide open={guideOpen} onOpenChange={setGuideOpen} />
    </>
  );
}
