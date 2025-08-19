import React, { useState } from 'react';
import SidebarV2 from "../components/SidebarV2/SidebarV2";
import HeaderPixelPerfect from '../components/HeaderPixelPerfect';
import SummaryCards from '../components/SummaryCards';
import LastTransactionsSection from '../components/LastTransactionsSection';
import DebitCreditChart from '../components/DebitCreditChart';
import AccountCardList from '../components/AccountCardList';
import BalanceStatisticsChart from '../components/BalanceStatisticsChart';
import AddAccountComponent from '../components/AddAccountComponent';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';

const AccountsPage: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAddAccountOpen, setAddAccountOpen] = useState(false);
  const { userBanks, bankTransactionProportions, summaryData, allTransactions, debitCreditChartData, fetchData } = useDashboardData(false, null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <SidebarV2 isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        {/* Header */}
        <HeaderPixelPerfect
          title="Contas"
          toggleSidebar={toggleSidebar}
        />
        
        {/* Page Content */}
        <div className="space-y-4 sm:space-y-6 mt-6">
          {/* Summary Cards */}
          <SummaryCards
            balance={summaryData.balance}
            income={summaryData.income}
            expenses={summaryData.expenses}
            monthlyDifference={summaryData.monthlyDifference}
          />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {/* Últimas Transações */}
            <div className="col-span-full">
              <LastTransactionsSection transactions={allTransactions.slice(0, 5)} userBanks={userBanks} />
            </div>
            
            {/* Débito & Crédito Chart and Estatísticas de Transações por Conta */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="col-span-1">
                <DebitCreditChart data={debitCreditChartData} />
              </div>
              <div className="col-span-1">
                <BalanceStatisticsChart data={bankTransactionProportions} />
              </div>
            </div>
          </div>

          {/* Lista de Contas */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Lista de Contas
              </h2>
              <Dialog open={isAddAccountOpen} onOpenChange={setAddAccountOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setAddAccountOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Conta
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Nova Conta</DialogTitle>
                  </DialogHeader>
                  <AddAccountComponent onAccountAdded={() => {
                    setAddAccountOpen(false);
                    fetchData();
                  }} />
                </DialogContent>
              </Dialog>
            </div>
            <AccountCardList accounts={userBanks} onUpdate={fetchData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;