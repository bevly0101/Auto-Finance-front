import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type UserBankRow = Database['public']['Tables']['user_banks']['Row'];

/**
 * Atualiza os dados de uma conta bancária do usuário.
 * @param accountId O ID da conta a ser atualizada.
 * @param updates Um objeto com os campos a serem atualizados.
 * @returns Os dados da conta atualizada ou null em caso de erro.
 */
export async function updateAccount(accountId: string, updates: { custom_name?: string | null }): Promise<UserBankRow | null> {
  const { data, error } = await supabase
    .from('user_banks')
    .update(updates)
    .eq('id', accountId)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar a conta:', error);
    return null;
  }

  return data;
}

/**
 * Exclui uma conta bancária do usuário.
 * @param accountId O ID da conta a ser excluída.
 * @returns true se a exclusão for bem-sucedida, false caso contrário.
 */
export async function deleteAccount(accountId: string): Promise<boolean> {
  const { error } = await supabase
    .from('user_banks')
    .delete()
    .eq('id', accountId);

  if (error) {
    console.error('Erro ao excluir a conta:', error);
    return false;
  }

  return true;
}