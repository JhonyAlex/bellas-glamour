import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/search', label: 'Buscar' },
    { path: '/models', label: 'Modelos' },
    { path: '/contact', label: 'Contacto' },
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-jet-black/90 backdrop-blur-sm border-b border-medium-gray">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-deep-magenta to-purple-800 rounded-sm flex items-center justify-center">
              <span className="text-platinum font-playfair font-bold text-xl">BG</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-platinum font-playfair text-2xl font-bold group-hover:text-deep-magenta transition-colors">
                BellasGlamour
              </h1>
              <p className="text-light-gray text-xs font-montserrat tracking-widest">
                EXCLUSIVE MODELS
              </p>
            </div>
          </Link>
          
          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'font-montserrat text-sm font-medium transition-colors relative group',
                  isActive(item.path) 
                    ? 'text-deep-magenta' 
                    : 'text-platinum hover:text-deep-magenta'
                )}
              >
                {item.label}
                <span className={cn(
                  'absolute -bottom-1 left-0 w-full h-0.5 bg-deep-magenta transform transition-transform duration-300',
                  isActive(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                )} />
              </Link>
            ))}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center space-x-2"
              onClick={() => {/* TODO: Implement search modal */}}
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline">Buscar</span>
            </Button>
            
            {/* User Menu */}
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
              onClick={() => {/* TODO: Implement user menu */}}
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Ingresar</span>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-medium-gray">
            <nav className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'font-montserrat text-base font-medium transition-colors',
                    isActive(item.path) 
                      ? 'text-deep-magenta' 
                      : 'text-platinum hover:text-deep-magenta'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-medium-gray">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Buscar Modelos</span>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};