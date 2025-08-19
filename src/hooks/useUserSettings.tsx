
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

// Tipagem para as categorias
export type Category = { [key: string]: { descricao: string } };

export const useUserSettings = () => {
  const { user } = useAuth();
  const [especificarTipo, setEspecificarTipo] = useState(false);
  const [expenseCategories, setExpenseCategories] = useState<Category>({});
  const [incomeCategories, setIncomeCategories] = useState<Category>({});
  const [loading, setLoading] = useState(true);

  const fetchUserSettings = useCallback(async () => {
    if (user && user.id) {
      try {
        setLoading(true);
        const { data: userData, error } = await supabase
          .from('users')
          .select('especificar_tipo, expenses_categories, income_categories')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Erro ao buscar configurações do usuário:', error);
          return;
        }

        setEspecificarTipo(userData?.especificar_tipo || false);
        setExpenseCategories((userData?.expenses_categories as Category) || {});
        setIncomeCategories((userData?.income_categories as Category) || {});
      } catch (error) {
        console.error('Erro ao buscar configurações do usuário:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchUserSettings();
  }, [fetchUserSettings]);

  const updateCategories = async (type: 'expense' | 'income', newCategories: Category) => {
    if (!user) return;

    const column = type === 'expense' ? 'expenses_categories' : 'income_categories';

    const { error } = await supabase
      .from('users')
      .update({ [column]: newCategories })
      .eq('id', user.id);

    if (error) {
      console.error(`Erro ao atualizar categorias de ${type}:`, error);
    } else {
      // Atualiza o estado local após o sucesso
      if (type === 'expense') {
        setExpenseCategories(newCategories);
      } else {
        setIncomeCategories(newCategories);
      }
      // Re-fetch para garantir consistência, opcional mas recomendado
      await fetchUserSettings();
    }
  };


  return {
    especificarTipo,
    setEspecificarTipo,
    expenseCategories,
    incomeCategories,
    updateCategories,
    loading,
    refetchSettings: fetchUserSettings,
  };
};
