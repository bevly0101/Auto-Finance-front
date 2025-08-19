
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  User, 
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from "@/components/ui/sidebar";

interface MinimalSidebarProps {
  onSettingsClick?: () => void;
}

export function MinimalSidebar({ onSettingsClick }: MinimalSidebarProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { state } = useSidebar();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      onClick: () => navigate('/dashboard'),
      active: true
    },
    {
      title: "Transações",
      icon: ShoppingCart,
      onClick: () => navigate('/dashboard'),
    },
    {
      title: "Perfil do Usuário",
      icon: User,
      onClick: () => navigate('/profile'),
    },
    {
      title: "Configurações",
      icon: Settings,
      onClick: onSettingsClick,
    }
  ];

  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar className="border-r bg-white dark:bg-gray-900" collapsible="icon">
      <SidebarContent className="py-4">
        <SidebarGroup>
          {!isCollapsed && (
            <div className="px-3 mb-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                MENU
              </span>
            </div>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="px-2 space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={item.onClick}
                    className={`w-full justify-start gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                      item.active 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                    }`}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="font-medium">
                        {item.title}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarTrigger className="w-full" />
      </SidebarFooter>
    </Sidebar>
  );
}
