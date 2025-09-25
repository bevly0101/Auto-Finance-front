import React, { useEffect, useState } from 'react';
import { Home, CreditCard, Users, BarChart3, LogOut, Settings, X, ShieldCheck } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarV2Props {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarV2: React.FC<SidebarV2Props> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      path: "/dashboard",
    },
    {
      id: "transactions",
      label: "Transações",
      icon: <CreditCard className="w-5 h-5" />,
      path: "/transactions",
    },
    {
      id: "accounts",
      label: "Contas",
      icon: <Users className="w-5 h-5" />,
      path: "/accounts",
    },
    {
      id: "reminders",
      label: "Lembretes",
      icon: <BarChart3 className="w-5 h-5" />,
      path: "/reminders",
    },
    {
      id: "myplan",
      label: "Plano",
      icon: <ShieldCheck className="w-5 h-5" />,
      path: "/myplan",
    },
    {
      id: "settings",
      label: "Configurações",
      icon: <Settings className="w-5 h-5" />,
      path: "/settings",
    },
  ];

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 1024) { // Fecha a sidebar em telas pequenas após a navegação
      toggleSidebar();
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/'); // Redireciona para a landing page
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-card/50 dark:bg-card/50 border-r border-border flex flex-col shadow-lg lg:shadow-none backdrop-blur-lg`}
      >
        {/* Logo e botão de fechar para mobile */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-border">
          <div className="text-2xl font-bold text-primary">AutoFinance</div>
          <button onClick={toggleSidebar} className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${currentPath === item.path
                  ? "bg-primary text-primary-foreground shadow-primary-glow"
                  : "text-foreground/80 hover:bg-primary/10 hover:text-primary-foreground transform hover:translate-x-1"
                }
              `}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Botão de Sair na parte inferior */}
        <div className="p-4 border-t border-border mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transform hover:translate-x-1 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SidebarV2;


