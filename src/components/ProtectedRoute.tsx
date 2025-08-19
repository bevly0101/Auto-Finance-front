import React, { ReactElement, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Mail } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface ProtectedRouteProps {
  children: ReactElement;
}

interface UserData {
  id: string;
  email: string;
  nome: string;
}

interface VerificationLogData {
  status: string;
  verificado_em: string | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [resendingEmail, setResendingEmail] = useState(false);

  const fetchUserData = async () => {
    if (!user) {
      setUserDataLoading(false);
      return;
    }

    try {
      // Buscar dados do usuário
      const { data: userInfo, error: userError } = await supabase
        .from("users")
        .select("id, email, nome")
        .eq("id", user.id)
        .single();

      if (userError) {
        console.error('Erro ao buscar dados do usuário:', userError);
        setUserDataLoading(false);
        return;
      }

      setUserData(userInfo);

    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    } finally {
      setUserDataLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  // Recarregar dados do usuário quando voltar para a página (após verificação)
  useEffect(() => {
    const handleFocus = () => {
      if (user && verificationStatus !== 'verified') {
        fetchUserData();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [user, verificationStatus]);

  const handleResendEmail = async () => {
    if (!user || !userData) return;

    setResendingEmail(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-verification-email', {
        body: { 
          email: userData.email, 
          userId: user.id,
          nome: userData.nome 
        }
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        toast({
          title: "Email Reenviado",
          description: "Um novo email de verificação foi enviado para sua caixa de entrada.",
        });
      } else {
        toast({
          title: "Erro",
          description: data.error || "Erro ao reenviar email.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('Erro ao reenviar email:', error);
      toast({
        title: "Erro",
        description: "Erro ao reenviar email de verificação.",
        variant: "destructive"
      });
    } finally {
      setResendingEmail(false);
    }
  };

  const handleRefresh = () => {
    fetchUserData();
  };

  if (loading || userDataLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Skeleton className="h-12 w-12 rounded-full mb-4" />
        <Skeleton className="h-4 w-[250px] mb-2" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Verificar se o email foi verificado baseado no status do log

  return children;
};

export default ProtectedRoute;


