import React, { useEffect, useState } from "react";
import SidebarV2 from "../components/SidebarV2/SidebarV2";
import HeaderPixelPerfect from "../components/HeaderPixelPerfect";
import BalanceStatisticsSection from "../components/BalanceStatisticsSection";
import TransactionsExpenseChart from "../components/TransactionsExpenseChart";
import TransactionsTable from "../components/TransactionsTable";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Transaction } from "@/components/dashboard/types";
import { AddTransactionDialog } from "@/components/dashboard/AddTransactionDialog";
import { Button } from "@/components/ui/button";
import TransactionFilters, { TransactionFiltersState } from "@/components/TransactionFilters";

export default function TransactionsPage(): JSX.Element {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const {
    transactions: allTransactions,
    userBanks,
    monthlyData,
    selectedBankId,
    setSelectedBankId,
    fetchData,
    incomeCategories,
    expenseCategories
  } = useDashboardData(false, null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isAddTransactionOpen, setAddTransactionOpen] = useState(false);
  const [isEditTransactionOpen, setEditTransactionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<TransactionFiltersState>({
    type: 'all',
    period: 'all',
    categories: [],
  });

  const handleApplyFilters = (filters: TransactionFiltersState) => {
    setActiveFilters(filters);
  };

  // --- Logic for "No Account" Card ---
  const transactionsWithoutAccount = allTransactions.filter(t => !t.bank_id);
  const balanceWithoutAccount = transactionsWithoutAccount.reduce((acc, t) => acc + (t.type === 'entrada' ? t.amount : -t.amount), 0);

  const noAccountCard = {
    id: 'sem_conta',
    bankName: 'Transações sem conta',
    balance: balanceWithoutAccount,
    lastFourDigits: '0000',
    color_rgb: 'rgb(107 114 128)', // gray-500
    accountName: 'N/A',
    cardBrand: 'elo' as const,
  };

  const allCards = [...userBanks, noAccountCard];

  const transactions = allTransactions.filter(t => {
    // Lógica de filtro de conta existente
    const accountFilter = !selectedBankId ||
                          selectedBankId === userBanks.find(b => b.bankName === "Todas as Contas")?.id ||
                          (selectedBankId === 'sem_conta' && !t.bank_id) ||
                          t.bank_id === selectedBankId;

    if (!accountFilter) return false;

    // Lógica de filtro por tipo
    const typeFilter = activeFilters.type === 'all' ||
                       (activeFilters.type === 'income' && t.type === 'entrada') ||
                       (activeFilters.type === 'expense' && t.type === 'saída');

    if (!typeFilter) return false;
    
    // Lógica de filtro por categoria (simples, verifica se a categoria da transação está no array de filtros)
    const categoryFilter = activeFilters.categories.length === 0 ||
                           activeFilters.categories.includes('all') ||
                           activeFilters.categories.includes(t.category);

    if (!categoryFilter) return false;

    // Lógica de filtro por período (simplificada)
    // Uma implementação real usaria date-fns para comparações mais robustas
    const periodFilter = (() => {
      if (activeFilters.period === 'all') return true;
      const transactionDate = new Date(t.date);
      const now = new Date();
      if (activeFilters.period === '7d') {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 7);
        return transactionDate >= sevenDaysAgo;
      }
      if (activeFilters.period === '30d') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);
        return transactionDate >= thirtyDaysAgo;
      }
      // Adicionar mais lógicas de período aqui se necessário
      return true;
    })();

    if (!periodFilter) return false;

    return true; // Se passar por todos os filtros
  });
  
  const selectedBankName = allCards.find(b => b.id === selectedBankId)?.bankName || "Todas as Contas";

 const handleTransactionClick = (transaction: Transaction) => {
   setSelectedTransaction(transaction);
   setEditTransactionOpen(true);
 };


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
        <HeaderPixelPerfect title="Transações" toggleSidebar={toggleSidebar} />
        
        {/* Dashboard Content */}
        <main className="space-y-4 sm:space-y-6 mt-6">
          {/* 1. Seção de Cartões */}
          <BalanceStatisticsSection cards={allCards} selectedBankId={selectedBankId} onBankChange={setSelectedBankId} />
          
          {/* 2. Gráfico de Despesas */}
          <TransactionsExpenseChart data={monthlyData} />

          {/* 3. Ações da Tabela (Adicionar e Futuros Filtros) */}
          <div className="flex justify-end items-center space-x-4">
            <TransactionFilters
              allCategories={[...incomeCategories, ...expenseCategories].map(cat => ({ id: cat, name: cat }))}
              onApplyFilters={handleApplyFilters}
            />
            <Button onClick={() => setAddTransactionOpen(true)}>Adicionar Transação</Button>
          </div>

          {/* 4. Tabela de Transações */}
          <div className="w-full">
            <TransactionsTable transactions={transactions} selectedBankName={selectedBankName} onTransactionClick={handleTransactionClick} />
          </div>
        </main>
      </div>
      {/* Dialog para Adicionar Transação */}
      <AddTransactionDialog
        open={isAddTransactionOpen}
        onOpenChange={setAddTransactionOpen}
        incomeCategories={incomeCategories}
        expenseCategories={expenseCategories}
        userBanks={userBanks}
        onTransactionAdded={() => {
          fetchData();
        }}
      />
      {/* Dialog para Editar Transação */}
      {selectedTransaction && (
        <AddTransactionDialog
          open={isEditTransactionOpen}
          onOpenChange={setEditTransactionOpen}
          incomeCategories={incomeCategories}
          expenseCategories={expenseCategories}
          userBanks={userBanks}
          onTransactionAdded={() => {
            fetchData();
            setSelectedTransaction(null);
          }}
          transactionToEdit={selectedTransaction}
        />
      )}
    </div>
  );
}