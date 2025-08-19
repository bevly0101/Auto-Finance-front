import { useState, useEffect } from 'react';
import { Transaction, UserBank, MonthlyData, WeeklySummaryData, Category } from '@/components/dashboard/types';
import { format, startOfMonth, endOfMonth, subMonths, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const useDashboardCalculations = (transactions: Transaction[], userBanks: UserBank[], selectedBankId: string | null) => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklySummaryData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [calculatedUserBanks, setCalculatedUserBanks] = useState<UserBank[]>([]);

  useEffect(() => {
    const banksWithBalance = userBanks.map(bank => {
      const income = transactions
        .filter(t => t.type === 'entrada' && t.bank_id === bank.id)
        .reduce((sum, t) => sum + t.amount, 0);
      const expenses = transactions
        .filter(t => t.type === 'saída' && t.bank_id === bank.id)
        .reduce((sum, t) => sum + t.amount, 0);
      return { ...bank, balance: income - expenses };
    });
    setCalculatedUserBanks(banksWithBalance);

    const filteredTransactions = selectedBankId
      ? transactions.filter(t => t.bank_id === selectedBankId)
      : transactions;

    // Lógica de cálculo movida de useDashboardData
    const calculateMonthlyData = (transactions: Transaction[]): MonthlyData[] => {
        const currentDate = new Date();
        const monthsToShow = [];
        for (let i = -4; i <= 1; i++) {
          const monthDate = i < 0 ? subMonths(currentDate, Math.abs(i)) : 
                           i > 0 ? addMonths(currentDate, i) : currentDate;
          const monthName = format(monthDate, 'MMM', { locale: ptBR });
          monthsToShow.push({ 
            name: monthName.charAt(0).toUpperCase() + monthName.slice(1), 
            start: startOfMonth(monthDate),
            end: endOfMonth(monthDate)
          });
        }
        
        return monthsToShow.map(({ name, start, end }) => {
          const monthTransactions = transactions.filter(t => {
            if (!t.date) return false;
            const transactionDate = new Date(t.date);
            return transactionDate >= start && transactionDate <= end;
          });
    
          const income = Number(monthTransactions.filter(t => t.type === 'entrada').reduce((sum, t) => sum + t.amount, 0));
          const expenses = Number(monthTransactions.filter(t => t.type === 'saída').reduce((sum, t) => sum + t.amount, 0));
          const balance = Number(income - expenses);
    
          return { name, expenses, income, balance };
        });
      };

    const calculateWeeklyData = (transactions: Transaction[]): WeeklySummaryData[] => {
        const today = new Date();
        const weeklySummary: WeeklySummaryData[] = [];
    
        for (let i = 6; i >= 0; i--) {
          const day = new Date(today);
          day.setDate(today.getDate() - i);
    
          const dayName = format(day, 'EEE', { locale: ptBR });
          const transactionsForDay = transactions.filter(t => {
            if (!t.date) return false;
            const transactionDate = new Date(t.date);
            return format(transactionDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
          });
    
          const entradas = transactionsForDay.filter(t => t.type === 'entrada').reduce((sum, t) => sum + t.amount, 0);
          const gastos = transactionsForDay.filter(t => t.type === 'saída').reduce((sum, t) => sum + t.amount, 0);
    
          weeklySummary.push({ day: dayName.charAt(0).toUpperCase() + dayName.slice(1), entradas, gastos });
        }
    
        return weeklySummary;
      };

    setMonthlyData(calculateMonthlyData(filteredTransactions));
    setWeeklyData(calculateWeeklyData(filteredTransactions));

    const income = filteredTransactions.filter(t => t.type === 'entrada').reduce((sum, t) => sum + t.amount, 0);
    const expenses = filteredTransactions.filter(t => t.type === 'saída').reduce((sum, t) => sum + t.amount, 0);
    setTotalIncome(income);
    setTotalExpenses(expenses);
    setTotalBalance(income - expenses);

  }, [transactions, selectedBankId]);

  return {
    monthlyData,
    weeklyData,
    categories,
    totalBalance,
    totalIncome,
    totalExpenses,
    userBanks: calculatedUserBanks,
  };
};