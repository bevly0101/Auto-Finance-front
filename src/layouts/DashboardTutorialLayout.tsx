import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseclient';

interface DashboardTutorialLayoutProps {
  children: React.ReactNode;
}

const DashboardTutorialLayout: React.FC<DashboardTutorialLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTutorialStatus = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('users')
        .select('on_tutorial')
        .eq('id', user.id)
        .single();

      if (!error && data?.on_tutorial) {
        navigate('/tour');
      }
    };

    checkTutorialStatus();
  }, [user, navigate]);

  return (
    <>
      {children}
    </>
  );
};

export default DashboardTutorialLayout;