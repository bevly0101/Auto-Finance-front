import React from "react";
import { Bell, Menu } from "lucide-react"; // Importa o ícone do menu
import { useProfile } from "../contexts/ProfileContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggleButton from "./ThemeToggleButton";

interface HeaderPixelPerfectProps {
  title?: string;
  toggleSidebar?: () => void; // Adiciona a prop para controlar a sidebar
  actions?: React.ReactNode; // Adiciona uma prop para ações customizadas
}

export const HeaderPixelPerfect: React.FC<HeaderPixelPerfectProps> = ({
  title = "Painel de Controle",
  toggleSidebar,
  actions
}) => {
  const { profileImageUrl } = useProfile();

  return (
    <header className="w-full bg-card/80 backdrop-blur-lg border-b border-border px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Botão do Menu Hambúrguer (visível em telas pequenas) */}
          {toggleSidebar && (
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 text-foreground/80 hover:bg-primary/10 hover:text-primary-foreground rounded-full transition-colors"
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
          
          {/* Título */}
          <h1 className="text-lg sm:text-2xl font-bold text-foreground whitespace-nowrap">
            {title}
          </h1>
          
          {/* Ações customizadas */}
          {actions}
        </div>

        {/* Ações do usuário */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Botão de alternância de tema */}
          <ThemeToggleButton />

          {/* Ícone de notificações */}
          <button className="relative p-2 text-foreground/80 hover:bg-primary/10 hover:text-primary-foreground rounded-full transition-colors">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></div>
          </button>

        </div>
      </div>
    </header>
  );
};

export default HeaderPixelPerfect;