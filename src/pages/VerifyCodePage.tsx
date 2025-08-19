import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/login-inter/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const VerifyCodePage: React.FC = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div className="h-full bg-background dark:bg-gray-800 flex flex-col">
      <Logo />
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-8 pb-8">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Verifique sua Conta</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">
            Enviamos um código de 6 dígitos para o seu WhatsApp. Por favor, insira-o abaixo para continuar.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              placeholder="Digite o código de 6 dígitos"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              className="text-center text-lg tracking-[0.5em]"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Verificando...' : 'Verificar Código'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyCodePage;