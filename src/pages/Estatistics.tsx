import { Menu, User } from "lucide-react";
import React, { useState } from "react";
import { AccountCreationSection } from "../components/AccountCreationSection";
import { AccountListSection } from "../components/AccountListSection";
import BalanceStatisticsSection  from "../components/BalanceStatisticsSection";
import { CardDetailsSection } from "../components/CardDetailsSection";
import SidebarV2 from "../components/SidebarV2/SidebarV2";
import HeaderPixelPerfect from "../components/HeaderPixelPerfect";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function Estatistics(): JSX.Element {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { userBanks, selectedBankId, setSelectedBankId } = useDashboardData(false, null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <SidebarV2 isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <HeaderPixelPerfect title="Estatísticas" toggleSidebar={toggleSidebar} />

        <main className="space-y-4 sm:space-y-6">
          <BalanceStatisticsSection cards={userBanks} selectedBankId={selectedBankId} onBankChange={setSelectedBankId} />
          <CardDetailsSection />
          <AccountListSection />
          <AccountCreationSection />
        </main>
      </div>
    </div>
  );
}
