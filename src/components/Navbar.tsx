'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Crown, Camera, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';

interface NavbarProps {
  onAuthClick: (mode: 'login' | 'register') => void;
  onDashboardClick: () => void;
}

export default function Navbar({ onAuthClick, onDashboardClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Models', href: '#models' },
    { name: 'Featured', href: '#featured' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-lg shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-8 h-8 text-[#D4AF37]" />
            <span className="font-serif text-2xl font-bold text-white">
              Bellas <span className="text-[#D4AF37]">Glamour</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative text-gray-300 hover:text-[#D4AF37] transition-colors font-light tracking-wide"
                whileHover={{ scale: 1.05 }}
              >
                {link.name}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37]"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  {user.role === 'ADMIN' ? (
                    <Crown className="w-4 h-4 text-[#D4AF37]" />
                  ) : user.role === 'MODEL' ? (
                    <Camera className="w-4 h-4 text-[#D4AF37]" />
                  ) : (
                    <User className="w-4 h-4 text-[#D4AF37]" />
                  )}
                  <span className="text-white font-light">
                    {user.name || user.email}
                  </span>
                </motion.div>
                {(user.role === 'MODEL' || user.role === 'ADMIN') && (
                  <Button
                    onClick={onDashboardClick}
                    variant="outline"
                    className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                  >
                    Dashboard
                  </Button>
                )}
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => onAuthClick('login')}
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/10"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => onAuthClick('register')}
                  className="bg-[#D4AF37] text-black hover:bg-[#B8860B] font-semibold"
                >
                  Join Us
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-t border-[#D4AF37]/20"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-300 hover:text-[#D4AF37] transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-800 space-y-3">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-2 text-white py-2">
                      <User className="w-4 h-4 text-[#D4AF37]" />
                      <span>{user.name || user.email}</span>
                    </div>
                    {(user.role === 'MODEL' || user.role === 'ADMIN') && (
                      <Button
                        onClick={() => {
                          onDashboardClick();
                          setIsMobileMenuOpen(false);
                        }}
                        variant="outline"
                        className="w-full border-[#D4AF37] text-[#D4AF37]"
                      >
                        Dashboard
                      </Button>
                    )}
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      className="w-full text-gray-300"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        onAuthClick('login');
                        setIsMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full text-gray-300"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => {
                        onAuthClick('register');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-[#D4AF37] text-black hover:bg-[#B8860B]"
                    >
                      Join Us
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
