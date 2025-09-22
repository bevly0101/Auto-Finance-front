import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseclient';
import { useAuth } from '@/contexts/AuthContext';

// Definindo a interface aqui para ser usada pelo hook e pelos componentes
export interface Reminder {
  id: number;
  user_id: string;
  titulo: string;
  data_vencimento: string;
  valor?: number | null;
  recorrente: boolean;
  val_time?: string | null;
  descricao?: string | null;
  // Adicione outras colunas que possam ser necessárias
}

export const useReminders = () => {
  const { user } = useAuth();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReminders = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('lembretes_pagamentos')
        .select('*')
        .eq('user_id', user.id)
        .order('data_vencimento', { ascending: true });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      if (data) {
        const processedReminders = data.flatMap(reminder => {
          if (reminder.recorrente) {
            const recurringReminders: Reminder[] = [];
            const originalDate = new Date(reminder.data_vencimento + 'T00:00:00');
            const originalDay = originalDate.getDate();

            for (let i = 0; i < 12; i++) { // Generate for the next 12 months
              const newDate = new Date(originalDate.getFullYear(), originalDate.getMonth() + i, 1);
              const daysInMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
              newDate.setDate(Math.min(originalDay, daysInMonth));

              recurringReminders.push({
                ...reminder,
                id: `${reminder.id}-${i}`, // Use a string-based unique ID
                data_vencimento: newDate.toISOString().split('T')[0], // Store as YYYY-MM-DD
              });
            }
            return recurringReminders;
          }
          return reminder;
        });
        setReminders(processedReminders);
      }
    } catch (err: any) {
      console.error("Erro ao buscar lembretes:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, [user]);

  return { reminders, loading, error, fetchReminders };
};