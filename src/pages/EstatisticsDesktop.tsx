import React, { useState } from "react";
import { Settings, Bell, User } from "lucide-react";
import SidebarV2 from "../components/SidebarV2/SidebarV2";
import HeaderPixelPerfect from "../components/HeaderPixelPerfect";
import BalanceStatisticsSection from "../components/BalanceStatisticsSection";
import BalanceStatisticsChart from "../components/BalanceStatisticsChart";
import AccountCardList from "../components/AccountCardList";
import AddAccountComponent from "../components/AddAccountComponent";
import { useDashboardData } from "@/hooks/useDashboardData";


export default function EstatisticsDesktop(): JSX.Element {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { userBanks, bankTransactionProportions } = useDashboardData(false, null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <SidebarV2 isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <HeaderPixelPerfect title="Estatísticas" toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="p-8 max-w-[1400px] mx-auto">
          {/* Cards de Saldo - Centralizados no topo */}

          {/* Container da Lista de Contas - Largura Total */}
          <div className="mb-8">
            <AccountCardList accounts={userBanks} />
          </div>

          {/* Layout em Grid para Gráfico e Adicionar Conta */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Coluna Esquerda (Gráfico) */}
            <div className="space-y-8">
              <BalanceStatisticsChart data={bankTransactionProportions} />
            </div>

            {/* Coluna Direita (Adicionar Conta) */}
            <div className="space-y-8">
              <AddAccountComponent />
            </div>
          </div>


        </main>
      </div>
    </div>
  );
}
