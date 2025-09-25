import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar 
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  User,
  PlusCircle,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface FigmaSidebarProps {
  onAddTransaction?: () => void;
  onSettingsClick?: () => void;
}

const FigmaSidebar: React.FC<FigmaSidebarProps> = ({ 
  onAddTransaction, 
  onSettingsClick 
}) => {
  const sidebar = useSidebar();
  const collapsed = sidebar.state === 'collapsed';
  const { signOut: logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Transações",
      url: "/transactions",
      icon: CreditCard,
      onClick: onAddTransaction
    },
    {
      title: "Relatórios",
      url: "/reports", 
      icon: BarChart3,
    },
    {
      title: "Plano",
      url: "/myplan",
      icon: ShieldCheck,
    },
    {
      title: "Configurações",
      url: "/settings",
      icon: Settings,
      onClick: onSettingsClick
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (url: string) => {
    if (url === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/';
    }
    return location.pathname.startsWith(url);
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      {/* Header */}
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-900">AutoFinance</h1>
              <p className="text-xs text-gray-500">Painel de Controle</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        {/* Add Transaction Button */}
        <div className="mb-6">
          <Button 
            onClick={onAddTransaction}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
            size={collapsed ? "icon" : "default"}
          >
            <PlusCircle className={collapsed ? "w-5 h-5" : "w-4 h-4 mr-2"} />
            {!collapsed && "Nova Transação"}
          </Button>
        </div>

        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            {!collapsed && "Menu Principal"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild={!item.onClick}
                    className={`
                      w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200
                      ${isActive(item.url)
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    {item.onClick ? (
                      <button
                        onClick={item.onClick}
                        className="w-full flex items-center"
                      >
                        <item.icon className={collapsed ? "w-5 h-5" : "w-5 h-5 mr-3"} />
                        {!collapsed && <span className="font-medium">{item.title}</span>}
                      </button>
                    ) : (
                      <Link to={item.url} className="w-full flex items-center">
                        <item.icon className={collapsed ? "w-5 h-5" : "w-5 h-5 mr-3"} />
                        {!collapsed && <span className="font-medium">{item.title}</span>}
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          {/* User Info */}
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} mb-2`}>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.email?.split('@')[0] || 'Usuário'}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email}
                </p>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="ghost"
            size={collapsed ? "icon" : "sm"}
            className="w-full text-gray-600 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className={collapsed ? "w-4 h-4" : "w-4 h-4 mr-2"} />
            {!collapsed && "Sair"}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default FigmaSidebar;