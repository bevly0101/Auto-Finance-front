import React, { useState } from 'react';
import SidebarV2 from '../components/SidebarV2/SidebarV2';
import HeaderPixelPerfect from '../components/HeaderPixelPerfect';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarV2 isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <HeaderPixelPerfect toggleSidebar={toggleSidebar} />
        <main className="space-y-4 sm:space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;