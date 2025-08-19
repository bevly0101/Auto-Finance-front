import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { fetchTransactions } from '@/services/dashboardService';

export const useTransactions = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: () => {
      if (!user) {
        return Promise.resolve([]);
      }
      return fetchTransactions(user.id);
    },
    enabled: !!user,
  });
};