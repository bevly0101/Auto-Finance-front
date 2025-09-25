import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo_autofinance2%20(1).png" alt="Autofinance Logo" className="h-8" />
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#recursos" className="text-foreground hover:text-primary">Recursos</a>
            <a href="#precos" className="text-foreground hover:text-primary">Preços</a>
            <a href="#sobre" className="text-foreground hover:text-primary">Sobre</a>
            <a href="#contato" className="text-foreground hover:text-primary">Contato</a>
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <Button onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/signin')}>
                  Entrar
                </Button>
                <Button onClick={() => navigate('/signup')}>
                  Cadastrar
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;