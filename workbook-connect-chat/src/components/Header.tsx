
import React, { useState } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary border-b border-primary/20 sticky top-0 z-50 shadow-elegant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">Workbook</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
            <a href="#benefits" className="text-white/80 hover:text-white transition-colors">Benefits</a>
            <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
            <Button variant="outline" className="mr-2 border-white text-white hover:bg-white hover:text-primary" onClick={() => window.location.href = '/login'}>Sign In</Button>
            <Button className="bg-white text-primary hover:bg-white/90" onClick={() => window.location.href = '/login'}>Get Started</Button>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-white/80"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#benefits" className="text-white/80 hover:text-white transition-colors">Benefits</a>
              <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary" onClick={() => window.location.href = '/login'}>Sign In</Button>
                <Button className="bg-white text-primary hover:bg-white/90" onClick={() => window.location.href = '/login'}>Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
