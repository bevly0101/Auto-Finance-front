import { supabase } from '@/integrations/supabase/client';
import { Transaction, UserBank } from '@/components/dashboard/types';

export const fetchTransactions = async (userId: string): Promise<Transaction[]> => {
  const { data: entradasData, error: entradasError } = await supabase
    .from('entradas')
    .select('*')
    .eq('user_id', userId);

  const { data: gastosData, error: gastosError } = await supabase
    .from('gastos')
    .select('*')
    .eq('user_id', userId);

  if (entradasError || gastosError) {
    console.error('Erro ao buscar dados:', entradasError || gastosError);
    throw new Error(entradasError?.message || gastosError?.message);
  }

  const combinedTransactions: Transaction[] = [
    ...(entradasData || []).map(e => ({ 
      id: String(e.id), 
      user_id: e.user_id, 
      type: 'entrada' as const, 
      description: e.nome, 
      amount: Number(e.valor),
      date: new Date(new Date(e.data_entrada || e.created_at).getTime() + (24 * 60 * 60 * 1000)).toISOString(),
      category: e.categoria || 'Sem categoria',
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
      category: g.categoria || 'Sem categoria',
      specificType: g.forma_pagamento,
      bank_id: g.user_bank_id
    }))
  ].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return combinedTransactions;
};

export const fetchUserBanks = async (userId: string): Promise<UserBank[]> => {
  const { data: userBanksData, error: userBanksError } = await supabase
    .from('user_banks')
    .select('*')
    .eq('user_id', userId);

  const { data: allBanksData, error: allBanksError } = await supabase
    .from('banks')
    .select('id, name, color_rgb');

  if (userBanksError || allBanksError) {
    console.error('Erro ao buscar dados bancários:', userBanksError || allBanksError);
    throw new Error(userBanksError?.message || allBanksError?.message);
  }

  if (!userBanksData || !allBanksData) {
    return [];
  }

  const banksWithBalance: UserBank[] = userBanksData.map(userBank => {
    const bankDetails = allBanksData.find(b => b.id === userBank.bank_id);
    return {
      id: userBank.id,
      bankName: bankDetails?.name || 'Nome do Banco',
      custom_name: userBank.custom_name,
      accountName: userBank.custom_name || bankDetails?.name || 'Nome da Conta',
      lastFourDigits: userBank.id.slice(-4),
      cardBrand: 'visa',
      balance: 0, // O saldo será calculado separadamente
      color_rgb: bankDetails?.color_rgb || 'linear-gradient(to br, #2D5CFF, #539BFF)',
      bankCode: String(userBank.bank_id)
    };
  });

  return banksWithBalance;
};