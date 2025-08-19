import React from 'react';
import { Moon, Sun, Bell, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from '@/contexts/ThemeContext';
import { NotificationBell } from './NotificationBell';

interface DashboardTopHeaderProps {
  userEmail?: string;
}

export const DashboardTopHeader: React.FC<DashboardTopHeaderProps> = ({ userEmail }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="tailadmin-header px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo e nome - exatamente como na imagem TailAdmin */}
        <div className="flex items-center space-x-3">
          <img 
            alt="AutoFinance Logo" 
            src="/lovable-uploads/d26be550-b458-42d4-82c9-9cc2a23b1720.png" 
            className="h-8 w-auto flex-shrink-0" 
          />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Auto<span className="text-blue-600">Finance</span>
          </h1>
        </div>

        {/* Ações do header - layout exato do TailAdmin */}
        <div className="flex items-center space-x-4">
          {/* Botão Dark Mode */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            )}
          </Button>

          {/* Sino de Notificações */}
          <NotificationBell />

          {/* Avatar do usuário */}
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
              {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};