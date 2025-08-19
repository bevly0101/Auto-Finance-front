import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { fetchUserBanks } from '@/services/dashboardService';

export const useUserBanks = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['userBanks', user?.id],
    queryFn: () => {
      if (!user) {
        return Promise.resolve([]);
      }
      return fetchUserBanks(user.id);
    },
    enabled: !!user,
  });
};