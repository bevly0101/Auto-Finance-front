import React from 'react';
import { Button } from "@/components/ui/button";
import { Bell, Settings, User, Menu } from 'lucide-react';
import { SidebarTrigger } from "@/components/ui/sidebar";

interface FigmaMobileLayoutProps {
  userName?: string;
  onAddTransaction: () => void;
  onSettingsClick: () => void;
  children: React.ReactNode;
}

const FigmaMobileLayout: React.FC<FigmaMobileLayoutProps> = ({
  userName,
  onAddTransaction,
  onSettingsClick,
  children
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="hover:bg-gray-100">
              <Menu size={24} />
            </SidebarTrigger>
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600"
            >
              <Bell size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onSettingsClick}
              className="text-gray-600"
            >
              <User size={20} />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Content */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default FigmaMobileLayout;