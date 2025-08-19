
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { MinimalSidebar } from "@/components/dashboard/MinimalSidebar";
import AdminPanel from '@/components/dashboard/AdminPanel';
import { AddTransactionDialog } from '@/components/dashboard/AddTransactionDialog';
import CleanHeader from '@/components/dashboard/CleanHeader';
import ModernStatsCards from '@/components/dashboard/ModernStatsCards';
import MonthlyEvolutionChart from '@/components/dashboard/MonthlyEvolutionChart';
import TargetProgressChart from '@/components/dashboard/TargetProgressChart';
import TransactionHistory from '@/components/dashboard/TransactionHistory';
import MiniCalendar from '@/components/dashboard/MiniCalendar';
import MainTabs from '@/components/dashboard/MainTabs';
import FigmaSidebar from '@/components/dashboard/FigmaSidebar';
import FigmaBalanceCards, { AccountCard } from '@/components/dashboard/FigmaBalanceCards';
import FigmaAccountsList from '@/components/dashboard/FigmaAccountsList';
import FigmaWeeklySummaryChart from '@/components/dashboard/FigmaWeeklySummaryChart';
import FigmaCategoryPieChart from '@/components/dashboard/FigmaCategoryPieChart';
import FigmaMonthlyBalanceChart from '@/components/dashboard/FigmaMonthlyBalanceChart';
import FigmaMobileLayout from '@/components/dashboard/FigmaMobileLayout';
import SettingsPanel from '@/components/dashboard/SettingsPanel';
import ArchivesPanel from '@/components/dashboard/ArchivesPanel';
import ArchiveViewAlert from '@/components/dashboard/ArchiveViewAlert';
import DashboardLoading from '@/components/dashboard/DashboardLoading';
import DashboardUnauthorized from '@/components/dashboard/DashboardUnauthorized';
import { Archive } from '@/components/dashboard/types';
import { useResponsive } from '@/hooks/useResponsive';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useUserSettings } from '@/hooks/useUserSettings';
import { useDashboardHandlers } from '@/hooks/useDashboardHandlers';
import { getCategoryColor } from '@/lib/colorUtils';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { isMobile, isDesktop } = useResponsive();
  const { especificarTipo, setEspecificarTipo } = useUserSettings();
  
  // Check if user is admin
  const isAdmin = user?.email === 'hills@gmail.com';
  
  const [activeTab, setActiveTab] = useState('transactions');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isArchivesOpen, setIsArchivesOpen] = useState(false);
  const [viewingArchive, setViewingArchive] = useState<Archive | null>(null);
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [activeAccountId, setActiveAccountId] = useState<string | number | null>('total');

  const {
    transactions,
    categories,
    monthlyData,
    totalBalance,
    totalIncome,
    totalExpenses,
    dataLoading,
    fetchData
  } = useDashboardData(especificarTipo, viewingArchive);

  const {
    handleAddTransaction,
    handleTransactionAdded,
    handleFilterByDate,
    handleConnectWhatsApp,
    handleViewArchive,
    handleExitArchiveView
  } = useDashboardHandlers(viewingArchive, setViewingArchive, user, fetchData);

  // Filter transactions by date range
  const filterTransactionsByDateRange = (transactions: any[]) => {
    if (!dateRange.start || !dateRange.end) return transactions;
    
    return transactions.filter(transaction => {
      if (!transaction.date) return false;
      
      let transactionDate;
      if (transaction.date.includes('/')) {
        const parts = transaction.date.split('/');
        if (parts.length === 3) {
          transactionDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        }
      } else {
        transactionDate = new Date(transaction.date);
      }
      
      if (!transactionDate || isNaN(transactionDate.getTime())) return false;
      
      return transactionDate >= dateRange.start! && transactionDate <= dateRange.end!;
    });
  };

  const dateFilteredTransactions = filterTransactionsByDateRange(transactions);

  // --- Account Logic ---
  const transactionsWithoutAccount = dateFilteredTransactions.filter(t => !t.account_id);
  const balanceWithoutAccount = transactionsWithoutAccount.reduce((acc, t) => acc + (t.type === 'entrada' ? t.amount : -t.amount), 0);

  const accounts: AccountCard[] = [
    {
      id: 'total',
      name: 'Total',
      balance: totalBalance,
      gradient: "bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600",
    },
    {
      id: 'sem_conta',
      name: 'Transações sem conta',
      balance: balanceWithoutAccount,
      number: "**** **** **** 0000",
      gradient: "bg-gradient-to-br from-gray-400 to-gray-500",
    }
  ];

  const activeTransactions = dateFilteredTransactions.filter(t => {
    if (activeAccountId === 'total') {
      return true;
    }
    if (activeAccountId === 'sem_conta') {
      return !t.account_id;
    }
    return t.account_id === activeAccountId;
  });
  // --- End Account Logic ---

  const expenseCategoriesChartData = activeTransactions
    .filter(t => t.type === 'saída' && t.category)
    .reduce((acc, transaction) => {
      const existingCategory = acc.find(cat => cat.name === transaction.category);
      if (existingCategory) {
        existingCategory.value += transaction.amount;
      } else if (transaction.category) {
        acc.push({ name: transaction.category, value: transaction.amount, color: getCategoryColor(transaction.category) });
      }
      return acc;
    }, [] as { name: string, value: number }[]);

  // Dados de categorias de receitas
  const incomeCategoriesChartData = activeTransactions
    .filter(t => t.type === 'entrada' && t.category)
    .reduce((acc, transaction) => {
      const existingCategory = acc.find(cat => cat.name === transaction.category);
      if (existingCategory) {
        existingCategory.value += transaction.amount;
      } else if (transaction.category) {
        acc.push({ name: transaction.category, value: transaction.amount, color: getCategoryColor(transaction.category) });
      }
      return acc;
    }, [] as { name: string, value: number, color: string }[]);

  const onAddTransaction = async () => {
    const canAdd = await handleAddTransaction();
    if (canAdd) {
      setIsAddTransactionOpen(true);
    }
  };

  const incomeCategories = [...new Set(dateFilteredTransactions.filter(t => t.type === 'entrada' && t.category).map(t => t.category!))];
  const expenseCategories = [...new Set(dateFilteredTransactions.filter(t => t.type === 'saída' && t.category).map(t => t.category!))];

  if (authLoading || dataLoading) {
    return <DashboardLoading />;
  }
  
  if (!user) {
    return <DashboardUnauthorized />;
  }

  // Only show admin panel for admin user
  if (isAdmin) {
    return (
      <ThemeProvider>
        <SidebarProvider defaultOpen={isDesktop}>
          <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900">
            <MinimalSidebar onSettingsClick={() => setIsSettingsOpen(true)} />
            <SidebarInset className="flex-1 flex flex-col">
              <CleanHeader userEmail={user.email} />
              
              <main className="flex-grow container mx-auto px-2 sm:px-4 py-4 sm:py-8">
                <div className="mb-4 sm:mb-6">
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Painel de Administração</h1>
                  <p className="text-sm sm:text-base text-muted-foreground">Bem-vindo ao painel administrativo, {user.email}</p>
                </div>
                
                <AdminPanel />
              </main>
            </SidebarInset>
          </div>

          <SettingsPanel
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            especificarTipo={especificarTipo}
            onEspecificarTipoChange={setEspecificarTipo}
            onShowArchives={() => {
              setIsSettingsOpen(false);
              setIsArchivesOpen(true);
            }}
          />

          <ArchivesPanel
            isOpen={isArchivesOpen}
            onClose={() => setIsArchivesOpen(false)}
            onViewArchive={handleViewArchive}
          />
        </SidebarProvider>
      </ThemeProvider>
    );
  }

  // Mobile layout
  if (isMobile) {
    return (
      <ThemeProvider>
        <FigmaMobileLayout
          onAddTransaction={onAddTransaction}
          onSettingsClick={() => setIsSettingsOpen(true)}
          userName={user?.email?.split('@')[0]?.toUpperCase() || 'USUÁRIO'}
        >
          <div className="space-y-6 p-4">
            <FigmaBalanceCards
              accounts={accounts}
              activeAccountId={activeAccountId}
              onAccountChange={setActiveAccountId}
              userName={user?.email?.split('@')[0]?.toUpperCase() || 'USUÁRIO'}
            />
            <FigmaAccountsList transactions={activeTransactions} />
            <FigmaWeeklySummaryChart transactions={activeTransactions} />
            <FigmaCategoryPieChart data={expenseCategoriesChartData} />
            <FigmaMonthlyBalanceChart transactions={activeTransactions} />
          </div>
        </FigmaMobileLayout>
        
        <AddTransactionDialog
          open={isAddTransactionOpen}
          onOpenChange={setIsAddTransactionOpen}
          onTransactionAdded={handleTransactionAdded}
          incomeCategories={incomeCategories}
          expenseCategories={expenseCategories}
          userBanks={[]}
        />

        <SettingsPanel
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          especificarTipo={especificarTipo}
          onEspecificarTipoChange={setEspecificarTipo}
          onShowArchives={() => {
            setIsSettingsOpen(false);
            setIsArchivesOpen(true);
          }}
        />

        <ArchivesPanel
          isOpen={isArchivesOpen}
          onClose={() => setIsArchivesOpen(false)}
          onViewArchive={handleViewArchive}
        />
      </ThemeProvider>
    );
  }

  // Desktop layout
  return (
    <ThemeProvider>
      <SidebarProvider defaultOpen={isDesktop}>
        <div className="flex min-h-screen w-full bg-gray-50">
          <FigmaSidebar 
            onAddTransaction={onAddTransaction}
            onSettingsClick={() => setIsSettingsOpen(true)} 
          />
          <SidebarInset className="flex-1 flex flex-col">
            {/* Header with trigger and title */}
            <header className="flex items-center gap-4 px-6 py-4 border-b bg-white">
              <SidebarTrigger className="hover:bg-gray-100" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AutoFinance</h1>
                <p className="text-sm text-gray-600">Painel de Controle</p>
              </div>
            </header>
            
            <main className="flex-grow p-6 bg-gray-50">
              {viewingArchive && (
                <ArchiveViewAlert
                  viewingArchive={viewingArchive}
                  onExitArchiveView={handleExitArchiveView}
                />
              )}
              
              {/* Main Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Balance Cards */}
                <div className="lg:col-span-1">
                  <FigmaBalanceCards
                    accounts={accounts}
                    activeAccountId={activeAccountId}
                    onAccountChange={setActiveAccountId}
                    userName={user?.email?.split('@')[0]?.toUpperCase() || 'USUÁRIO'}
                  />
                </div>
                
                {/* Accounts List */}
                <div className="lg:col-span-2">
                  <FigmaAccountsList transactions={activeTransactions} />
                </div>
              </div>
              
              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Weekly Summary */}
                <div>
                  <FigmaWeeklySummaryChart transactions={activeTransactions} />
                </div>
                
                {/* Category Pie Chart */}
                <div>
                  <FigmaCategoryPieChart data={expenseCategoriesChartData} />
                </div>
                
                {/* Monthly Balance */}
                <div>
                  <FigmaMonthlyBalanceChart transactions={activeTransactions} />
                </div>
              </div>
            </main>
          </SidebarInset>
        </div>

        <AddTransactionDialog
          open={isAddTransactionOpen}
          onOpenChange={setIsAddTransactionOpen}
          onTransactionAdded={handleTransactionAdded}
          incomeCategories={incomeCategories}
          expenseCategories={expenseCategories}
          userBanks={[]}
        />

        <SettingsPanel
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          especificarTipo={especificarTipo}
          onEspecificarTipoChange={setEspecificarTipo}
          onShowArchives={() => {
            setIsSettingsOpen(false);
            setIsArchivesOpen(true);
          }}
        />

        <ArchivesPanel
          isOpen={isArchivesOpen}
          onClose={() => setIsArchivesOpen(false)}
          onViewArchive={handleViewArchive}
        />
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Dashboard;
