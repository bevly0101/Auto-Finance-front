import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseclient';

export const useVerifyCode = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    const interval = setInterval(async () => {
      const { data, error } = await supabase
        .from('users')
        .select('verified_code')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error checking user verification status:', error);
        return;
      }

      if (data && data.verified_code) {
        toast({
          title: "Verificação Concluída",
          description: "Seu código foi verificado com sucesso!",
        });
        navigate('/dashboard');
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Erro de Autenticação",
        description: "Usuário não encontrado. Por favor, faça login novamente.",
        variant: "destructive",
      });
      navigate('/signin');
      return;
    }

    if (code.length !== 6) {
      toast({
        title: "Código Inválido",
        description: "O código de verificação deve ter 6 dígitos.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://webhook.autosfinance.com.br/webhook/b438fe04-5903-4099-b386-d18821003ce5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          id: user.id,
        }),
      });

      const result = await response.json();

      if (result.status === true) {
        toast({
          title: "Verificação Concluída",
          description: "Seu código foi verificado com sucesso!",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Código Incorreto",
          description: "O código de verificação está incorreto. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao verificar código:", error);
      toast({
        title: "Erro de Rede",
        description: "Não foi possível conectar ao servidor de verificação. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    code,
    setCode,
    loading,
    handleSubmit,
  };
};