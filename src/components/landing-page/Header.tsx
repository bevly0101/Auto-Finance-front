import React from 'react';
import { Download } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo_autofinance2%20(1).png" alt="Autofinance Logo" className="h-8" />
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-foreground hover:text-primary">Recursos</a>
            <a href="#" className="text-foreground hover:text-primary">Preços</a>
            <a href="#" className="text-foreground hover:text-primary">Sobre</a>
            <a href="#" className="text-foreground hover:text-primary">Contato</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              <Download className="w-4 h-4" />
              <span>Baixar na App Store</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;