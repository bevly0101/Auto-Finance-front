import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Transaction, Category, MonthlyData, Archive, UserBank, WeeklySummaryData } from '@/components/dashboard/types';
import { format, startOfMonth, endOfMonth, subMonths, addMonths, startOfWeek, endOfWeek, eachDayOfInterval, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const useDashboardData = (especificarTipo: boolean, viewingArchive: Archive | null) => {
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  
  const [userBanks, setUserBanks] = useState<UserBank[]>([]);
  const [incomeCategories, setIncomeCategories] = useState<string[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<string[]>([]);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Transações filtradas para exibição
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const [bankTransactionProportions, setBankTransactionProportions] = useState<{ name: string; value: number; color: string }[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { name: 'Entretenimento', color: '#68F26D', value: 0 },
    { name: 'Streaming', color: '#9595F5', value: 0 },
    { name: 'Comida', color: '#649EF5', value: 0 },
    { name: 'Gasto Fixo', color: '#F58F74', value: 0 },
    { name: 'Alimentação', color: '#F592F0', value: 0 },
    { name: 'Moradia', color: '#F4BB78', value: 0 },
    { name: 'Transporte', color: '#6F00F6', value: 0 },
    { name: 'Saúde', color: '#12B2A8', value: 0 },
    { name: 'Educação', color: '#B31578', value: 0 },
    { name: 'Lazer', color: '#C2DE12', value: 0 },
    { name: 'Utilidades', color: '#CCCCCC', value: 0 }
  ]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([
    { name: 'Jan', expenses: 0, income: 0, balance: 0 },
    { name: 'Fev', expenses: 0, income: 0, balance: 0 },
    { name: 'Mar', expenses: 0, income: 0, balance: 0 },
    { name: 'Abr', expenses: 0, income: 0, balance: 0 },
    { name: 'Mai', expenses: 0, income: 0, balance: 0 },
  ]);

  const [weeklyData, setWeeklyData] = useState<WeeklySummaryData[]>([]);

  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [summaryData, setSummaryData] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
    monthlyDifference: 0,
  });
  const [debitCreditChartData, setDebitCreditChartData] = useState<{
    weeklyChart: { name: string; Debito: number; Credito: number }[];
    totalDebitMonth: number;
    totalCreditMonth: number;
  }>({ weeklyChart: [], totalDebitMonth: 0, totalCreditMonth: 0 });
  const [dataLoading, setDataLoading] = useState(true);

  const calculateMonthlyData = (transactions: Transaction[]): MonthlyData[] => {
    const currentDate = new Date();
    
    // Criar array de meses centrado no mês atual usando date-fns
    const monthsToShow = [];
    for (let i = -4; i <= 1; i++) {
      const monthDate = i < 0 ? subMonths(currentDate, Math.abs(i)) : 
                       i > 0 ? addMonths(currentDate, i) : currentDate;
      const monthName = format(monthDate, 'MMM', { locale: ptBR });
      monthsToShow.push({ 
        name: monthName.charAt(0).toUpperCase() + monthName.slice(1), 
        date: monthDate,
        start: startOfMonth(monthDate),
        end: endOfMonth(monthDate)
      });
    }
    
    return monthsToShow.map(({ name, start, end }) => {
      const monthTransactions = transactions.filter(t => {
        // Verificar se a data existe e está em formato válido
        if (!t.date) return false;
        
        let transactionDate;
        // Tentar diferentes formatos de data
        if (t.date.includes('/')) {
          // Formato dd/mm/yyyy
          const parts = t.date.split('/');
          if (parts.length === 3) {
            transactionDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
          }
        } else if (t.date.includes('-')) {
          // Formato yyyy-mm-dd ou dd-mm-yyyy
          transactionDate = new Date(t.date);
        } else {
          // Formato ISO ou outro
          transactionDate = new Date(t.date);
        }
        
        // Verificar se a data é válida
        if (isNaN(transactionDate.getTime())) return false;
        
        return transactionDate >= start && transactionDate <= end;
      });

      const income = Number(monthTransactions
        .filter(t => t.type === 'entrada')
        .reduce((sum, t) => sum + t.amount, 0));
      
      const expenses = Number(monthTransactions
        .filter(t => t.type === 'saída')
        .reduce((sum, t) => sum + t.amount, 0));

      const balance = Number(income - expenses); // Calculate balance

      return { name, expenses, income, balance }; // Add balance to the returned object
    });
  };

  const calculateWeeklyData = (transactions: Transaction[]): WeeklySummaryData[] => {
    const today = new Date();
    const weeklySummary: WeeklySummaryData[] = [];

    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);

      const dayName = format(day, 'EEE', { locale: ptBR }); // 'Seg', 'Ter', etc.
      const transactionsForDay = transactions.filter(t => {
        if (!t.date) return false;
        let transactionDate;
        // Tentar diferentes formatos de data
        if (t.date.includes('/')) {
          // Formato dd/mm/yyyy
          const parts = t.date.split('/');
          if (parts.length === 3) {
            transactionDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
          }
        } else if (t.date.includes('-')) {
          // Formato yyyy-mm-dd ou dd-mm-yyyy
          transactionDate = new Date(t.date);
        } else {
          // Formato ISO ou outro
          transactionDate = new Date(t.date);
        }
        
        if (isNaN(transactionDate.getTime())) return false;
        return format(transactionDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
      });

      const entradas = transactionsForDay
        .filter(t => t.type === 'entrada')
        .reduce((sum, t) => sum + t.amount, 0);

      const gastos = transactionsForDay
        .filter(t => t.type === 'saída')
        .reduce((sum, t) => sum + t.amount, 0);

      weeklySummary.push({ day: dayName.charAt(0).toUpperCase() + dayName.slice(1), entradas, gastos });
    }

    return weeklySummary;
  };

  const fetchData = async () => {
    if (user && user.id) {
      setDataLoading(true);
      
      try {
        // Buscar categorias do usuário
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('income_categories, expenses_categories')
          .eq('id', user.id)
          .single();

        if (userError) {
          console.error("Error fetching categories:", userError);
        } else if (userData) {
          const processCategories = (categoryData: unknown): string[] => {
            if (!categoryData) return [];
            try {
              if (typeof categoryData === 'string') {
                // Se for uma string, parseia para objeto
                const parsedData = JSON.parse(categoryData);
                return Object.keys(parsedData);
              } else if (typeof categoryData === 'object' && !Array.isArray(categoryData)) {
                // Se já for um objeto, apenas pega as chaves
                return Object.keys(categoryData);
              }
            } catch (e) {
              console.error("Failed to process categories data:", e, categoryData);
              return [];
            }
            return [];
          };

          setIncomeCategories(processCategories(userData.income_categories));
          setExpenseCategories(processCategories(userData.expenses_categories));
        }

        // Se estamos visualizando um arquivo, usar os dados do arquivo
        if (viewingArchive) {
          const archiveTransactions = viewingArchive.transactions_data || [];
          setAllTransactions(archiveTransactions);
          setTotalIncome(viewingArchive.total_income);
          setTotalExpenses(viewingArchive.total_expenses);
          setTotalBalance(viewingArchive.total_balance);
          
          const monthlyDataCalculated = calculateMonthlyData(archiveTransactions);
          setMonthlyData(monthlyDataCalculated);
          const weeklyDataCalculated = calculateWeeklyData(archiveTransactions);
          setWeeklyData(weeklyDataCalculated);
          setDataLoading(false);
          return;
        }

        // Buscar dados dos bancos do usuário
        const { data: userBanksData, error: userBanksError } = await supabase
          .from('user_banks')
          .select('*')
          .eq('user_id', user.id);

        const { data: allBanksData, error: allBanksError } = await supabase
          .from('banks')
          .select('id, name, color_rgb');

        if (userBanksError || allBanksError) {
          const error = userBanksError || allBanksError;
          console.error('Erro ao buscar dados bancários:', error);
          toast({
            title: "Erro ao buscar dados bancários",
            description: error?.message,
            variant: "destructive"
          });
        }

        // Buscar dados das entradas
        const { data: entradasData, error: entradasError } = await supabase
          .from('entradas')
          .select('*')
          .eq('user_id', user.id);

        // Buscar dados dos gastos
        const { data: gastosData, error: gastosError } = await supabase
          .from('gastos')
          .select('*')
          .eq('user_id', user.id);
        
        if (entradasError || gastosError) {
          console.error('Erro ao buscar dados:', entradasError || gastosError);
          toast({ 
            title: "Erro ao buscar dados", 
            description: entradasError?.message || gastosError?.message, 
            variant: "destructive" 
          });
          setDataLoading(false);
                }


        // Combinar transações das duas tabelas
        const combinedTransactions: Transaction[] = [
          ...(entradasData || []).map(e => ({ 
            id: String(e.id), 
            user_id: e.user_id, 
            type: 'entrada' as const, 
            description: e.nome, 
            amount: Number(e.valor),
            date: new Date(new Date(e.data_entrada || e.created_at).getTime() + (24 * 60 * 60 * 1000)).toISOString(),
            category: especificarTipo ? (e.categoria || 'Sem categoria') : (e.categoria || 'Sem categoria'),
            specificType: e.forma_pagamento,
            bank_id: e.user_bank_id
          })),
          ...(gastosData || []).map(g => ({
            id: String(g.id),
            user_id: g.user_id,
            type: 'saída' as const,
            description: g.nome,
            amount: Number(g.valor),
            date: new Date(new Date(g.data_gasto || g.created_at).getTime() + (24 * 60 * 60 * 1000)).toISOString(),
            category: especificarTipo ? (g.categoria || 'Sem categoria') : (g.categoria || 'Sem categoria'),
            specificType: g.forma_pagamento,
            bank_id: g.user_bank_id
          }))
        ].sort((a, b) => {
          const getDate = (t: Transaction) => {
            if (t.type === 'entrada' && t.date) return new Date(t.date);
            if (t.type === 'saída' && t.date) return new Date(t.date);
            return new Date(t.created_at || ''); // Fallback to created_at if date is null/undefined
          };
          const dateA = getDate(a);
          const dateB = getDate(b);
          return dateB.getTime() - dateA.getTime(); // Mais recente primeiro
        });
        
        setAllTransactions(combinedTransactions);

        // Calcular saldos por banco e mapear dados finais dos bancos
        if (userBanksData && allBanksData) {
          const startOfCurrentMonth = startOfMonth(new Date());
          const endOfCurrentMonth = endOfMonth(new Date());

          const transactionsInCurrentMonth = combinedTransactions.filter(t => {
            const transactionDate = new Date(t.date);
            return transactionDate >= startOfCurrentMonth && transactionDate <= endOfCurrentMonth;
          });

          const banksWithBalance: UserBank[] = userBanksData.map(userBank => {
            const income = transactionsInCurrentMonth
              .filter(t => t.type === 'entrada' && t.bank_id === userBank.id)
              .reduce((sum, t) => sum + t.amount, 0);

            const expenses = transactionsInCurrentMonth
              .filter(t => t.type === 'saída' && t.bank_id === userBank.id)
              .reduce((sum, t) => sum + t.amount, 0);

            const balance = income - expenses;
            
            const bankDetails = allBanksData.find(b => b.id === userBank.bank_id);

            return {
              id: userBank.id,
              bankName: bankDetails?.name || 'Nome do Banco',
              custom_name: userBank.custom_name,
              accountName: userBank.custom_name || bankDetails?.name || 'Nome da Conta',
              lastFourDigits: userBank.id.slice(-4), // Placeholder
              cardBrand: 'visa', // Placeholder
              balance: balance,
              color_rgb: bankDetails?.color_rgb || 'linear-gradient(to br, #2D5CFF, #539BFF)', // Cor padrão
              bankCode: String(userBank.bank_id)
            };
          });
          setUserBanks(banksWithBalance);
          // Define o primeiro banco como selecionado por padrão
          if (banksWithBalance.length > 0 && !selectedBankId) {
            setSelectedBankId(banksWithBalance[0].id);
          }
        }

      } catch (error) {
        console.error("Erro ao buscar dados do Supabase:", error);
        toast({ 
          title: "Erro ao buscar dados", 
          description: "Ocorreu um problema ao carregar suas informações.", 
          variant: "destructive" 
        });
      } finally {
        setDataLoading(false);
      }
    } else if (!authLoading && !user) {
      setAllTransactions([]);
      setTransactions([]);
      setMonthlyData([
        { name: 'Jan', expenses: 0, income: 0, balance: 0 },
        { name: 'Fev', expenses: 0, income: 0, balance: 0 },
        { name: 'Mar', expenses: 0, income: 0, balance: 0 },
        { name: 'Abr', expenses: 0, income: 0, balance: 0 },
        { name: 'Mai', expenses: 0, income: 0, balance: 0 }
      ]);
      setWeeklyData([
        { day: 'Dom', entradas: 0, gastos: 0 },
        { day: 'Seg', entradas: 0, gastos: 0 },
        { day: 'Ter', entradas: 0, gastos: 0 },
        { day: 'Qua', entradas: 0, gastos: 0 },
        { day: 'Qui', entradas: 0, gastos: 0 },
        { day: 'Sex', entradas: 0, gastos: 0 },
        { day: 'Sáb', entradas: 0, gastos: 0 },
      ]);
      setCategories([
        { name: 'Entretenimento', color: '#363C5F', value: 0 }, 
        { name: 'Streaming', color: '#FF8C00', value: 0 }, 
        { name: 'Comida', color: '#FF00FF', value: 0 }, 
        { name: 'Gasto Fixo', color: '#0000FF', value: 0 }, 
        { name: 'Alimentação', color: '#8B5CF6', value: 0 }, 
        { name: 'Moradia', color: '#F97316', value: 0 }, 
        { name: 'Transporte', color: '#0EA5E9', value: 0 }, 
        { name: 'Saúde', color: '#1EAEDB', value: 0 }, 
        { name: 'Educação', color: '#9b87f5', value: 0 }, 
        { name: 'Lazer', color: '#7E69AB', value: 0 },
        { name: 'Utilidades', color: '#D946EF', value: 0 }
      ]);
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, authLoading, toast, especificarTipo, viewingArchive]);

  // Este useEffect calcula as proporções para o gráfico de pizza
  useEffect(() => {
    //console.log('DEBUG PIE: useEffect para proporções ativado.');
    //console.log('DEBUG PIE: allTransactions.length =', allTransactions.length);
    //console.log('DEBUG PIE: userBanks.length =', userBanks.length);

    if (allTransactions.length > 0 && userBanks.length > 0) {
      const startOfCurrentMonth = startOfMonth(new Date());
      const endOfCurrentMonth = endOfMonth(new Date());

      const transactionsInCurrentMonth = allTransactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate >= startOfCurrentMonth && transactionDate <= endOfCurrentMonth;
      });

      // Calcular transações da "Carteira"
      const walletTransactions = transactionsInCurrentMonth.filter(
        t => t.type === 'saída' && (!t.bank_id || t.specificType === 'Cédula')
      ).length;

      const proportions = userBanks.map(bank => {
        const bankTransactions = transactionsInCurrentMonth.filter(
          t => t.bank_id === bank.id
        ).length;
        return {
          name: bank.bankName,
          value: bankTransactions,
          color: bank.color_rgb
        };
      });

      if (walletTransactions > 0) {
        proportions.push({
          name: 'Carteira',
          value: walletTransactions,
          color: '#8884d8' // Cor padrão para carteira
        });
      }
      
      //console.log('DEBUG PIE: Proporções calculadas:', proportions);
      setBankTransactionProportions(proportions.filter(p => p.value > 0));
    }
  }, [allTransactions, userBanks]);

  // Este useEffect agora reage a mudanças no banco selecionado ou na lista de transações
  useEffect(() => {
    const filteredTransactions = selectedBankId
      ? allTransactions.filter(t => t.bank_id === selectedBankId)
      : allTransactions;

    setTransactions(filteredTransactions);

    // Recalcular todos os dados derivados com base nas transações filtradas
    const monthlyDataCalculated = calculateMonthlyData(filteredTransactions);
    setMonthlyData(monthlyDataCalculated);

    const weeklyDataCalculated = calculateWeeklyData(filteredTransactions);
    setWeeklyData(weeklyDataCalculated);

    const currentMonth = new Date();
    const startOfCurrentMonth = startOfMonth(currentMonth);
    const endOfCurrentMonth = endOfMonth(currentMonth);

    const allExpenseCategoriesInMonth = filteredTransactions
      .filter(t =>
        t.type === 'saída' &&
        new Date(t.date) >= startOfCurrentMonth &&
        new Date(t.date) <= endOfCurrentMonth
      )
      .map(t => t.category);

    const uniqueCategories = Array.from(new Set(allExpenseCategoriesInMonth));

    const finalCategories: Category[] = uniqueCategories.map(catName => {
      const existingCat = categories.find(c => c.name === catName);
      return existingCat || { name: catName, color: '#CCCCCC', value: 0 };
    });

    const categoryDataCalculated = finalCategories.map(cat => {
      const total = filteredTransactions
        .filter(t =>
          t.category === cat.name &&
          t.type === 'saída' &&
          new Date(t.date) >= startOfCurrentMonth &&
          new Date(t.date) <= endOfCurrentMonth
        )
        .reduce((sum, t) => sum + t.amount, 0);
      return { ...cat, value: total };
    });

    const filteredCategoryData = categoryDataCalculated.filter(cat => cat.value > 0);
    setCategories(filteredCategoryData);

    // Recalcular totais
    const income = filteredTransactions
      .filter(t => t.type === 'entrada')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    
    const expenses = filteredTransactions
      .filter(t => t.type === 'saída')
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    
    setTotalIncome(income);
    setTotalExpenses(expenses);
    setTotalBalance(income - expenses);

  }, [allTransactions, selectedBankId]);

  // useEffect para calcular os dados do SummaryCards
  useEffect(() => {
    if (allTransactions.length > 0) {
      const currentDate = new Date();
      const startOfCurrentMonth = startOfMonth(currentDate);
      const endOfCurrentMonth = endOfMonth(currentDate);
      const startOfLastMonth = startOfMonth(subMonths(currentDate, 1));
      const endOfLastMonth = endOfMonth(subMonths(currentDate, 1));

      const transactionsInCurrentMonth = allTransactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate >= startOfCurrentMonth && transactionDate <= endOfCurrentMonth;
      });

      const transactionsInLastMonth = allTransactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate >= startOfLastMonth && transactionDate <= endOfLastMonth;
      });

      const incomeCurrentMonth = transactionsInCurrentMonth
        .filter(t => t.type === 'entrada')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expensesCurrentMonth = transactionsInCurrentMonth
        .filter(t => t.type === 'saída')
        .reduce((sum, t) => sum + t.amount, 0);

      const balanceCurrentMonth = incomeCurrentMonth - expensesCurrentMonth;

      const incomeLastMonth = transactionsInLastMonth
        .filter(t => t.type === 'entrada')
        .reduce((sum, t) => sum + t.amount, 0);

      const expensesLastMonth = transactionsInLastMonth
        .filter(t => t.type === 'saída')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const balanceLastMonth = incomeLastMonth - expensesLastMonth;

      setSummaryData({
        balance: balanceCurrentMonth,
        income: incomeCurrentMonth,
        expenses: expensesCurrentMonth,
        monthlyDifference: balanceCurrentMonth - balanceLastMonth,
      });
    }
  }, [allTransactions]);

  // useEffect para calcular os dados do DebitCreditChart
  useEffect(() => {
    if (allTransactions.length > 0) {
      const currentDate = new Date();
      const startOfCurrentMonth = startOfMonth(currentDate);
      const endOfCurrentMonth = endOfMonth(currentDate);

      const expensesInCurrentMonth = allTransactions.filter(t => {
        const transactionDate = new Date(t.date);
        return t.type === 'saída' && transactionDate >= startOfCurrentMonth && transactionDate <= endOfCurrentMonth;
      });

      const totalDebitMonth = expensesInCurrentMonth
        .filter(t => t.specificType === 'Débito')
        .reduce((sum, t) => sum + t.amount, 0);

      const totalCreditMonth = expensesInCurrentMonth
        .filter(t => t.specificType === 'Crédito')
        .reduce((sum, t) => sum + t.amount, 0);

      const weeklyChartData = [];
      for (let i = 6; i >= 0; i--) {
        const day = new Date();
        day.setDate(currentDate.getDate() - i);
        const dayName = format(day, 'EEE', { locale: ptBR });

        const expensesForDay = allTransactions.filter(t => {
            const transactionDate = new Date(t.date);
            return t.type === 'saída' && format(transactionDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
        });

        const debitForDay = expensesForDay
            .filter(t => t.specificType === 'Débito')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const creditForDay = expensesForDay
            .filter(t => t.specificType === 'Crédito')
            .reduce((sum, t) => sum + t.amount, 0);

        weeklyChartData.push({
            name: dayName.charAt(0).toUpperCase() + dayName.slice(1),
            Debito: debitForDay,
            Credito: creditForDay
        });
      }

      setDebitCreditChartData({
        weeklyChart: weeklyChartData,
        totalDebitMonth,
        totalCreditMonth
      });
    }
  }, [allTransactions]);

  return {
    transactions,
    categories,
    monthlyData,
    weeklyData,
    totalBalance,
    totalIncome,
    totalExpenses,
    dataLoading,
    userBanks,
    incomeCategories,
    expenseCategories,
    fetchData,
    selectedBankId,
    setSelectedBankId,
    bankTransactionProportions,
    summaryData,
    allTransactions,
    debitCreditChartData
  };
};
