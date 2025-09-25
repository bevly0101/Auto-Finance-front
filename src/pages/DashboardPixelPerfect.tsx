import React from "react";
import BalanceStatisticsSection from "../components/BalanceStatisticsSection";
import RecentTransactionsCard from "../components/RecentTransactionsCard";
import WeeklySummaryChart from "../components/WeeklySummaryChart";
import CategoryChart from "../components/CategoryChart"; // Importa o CategoryChart
import MonthlyBalanceChart from "../components/MonthlyBalanceChart";
import { useDashboardData } from "../hooks/useDashboardData";
import { getCategoryColor } from "../lib/colorUtils";





import DashboardLayout from "../layouts/DashboardLayout";

export default function DashboardPixelPerfect(): JSX.Element {
  const { monthlyData, transactions, categories, weeklyData, dataLoading, userBanks, selectedBankId, setSelectedBankId } = useDashboardData(false, null);

  const coloredCategories = categories.map(category => ({
    ...category,
    color: getCategoryColor(category.name),
  }));

  return (
    <DashboardLayout>
      {/* Grid responsivo para Estatísticas de Saldo e Transações Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Estatísticas de Saldo */}
        <div className="col-span-1">
          <BalanceStatisticsSection cards={userBanks} selectedBankId={selectedBankId} onBankChange={setSelectedBankId} />
        </div>
        {/* Transações Recentes */}
        <div className="col-span-1">
          <RecentTransactionsCard transactions={transactions} />
        </div>
      </div>

      {/* Grid responsivo para gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Resumo Semanal */}
        <div className="col-span-1 lg:col-span-2">
          <WeeklySummaryChart data={weeklyData} />
        </div>

        {/* Gráfico de Categorias */}
        <div className="col-span-1">
          <CategoryChart data={coloredCategories} type="expense" />
        </div>
      </div>

      {/* Balanço Mensal */}
      <div className="w-full">
        <MonthlyBalanceChart data={monthlyData.map(m => ({ month: m.name, balance: m.balance }))} />
      </div>
    </DashboardLayout>
  );
}


