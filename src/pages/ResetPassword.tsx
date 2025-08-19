import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Lock, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/components/ui/use-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [validatingToken, setValidatingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const token = searchParams.get('token');
  const userId = searchParams.get('userId');

  useEffect(() => {
    if (!token || !userId) {
      toast({
        title: "Link inválido",
        description: "Este link de recuperação é inválido ou expirou.",
        variant: "destructive",
      });
      navigate('/forgot-password');
      return;
    }

    // Validar token
    validateToken();
  }, [token, userId, navigate]);

  const validateToken = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('reset-password', {
        body: { 
          action: 'validate',
          token, 
          userId 
        }
      });

      if (error) {
        console.error('Erro na função:', error);
        throw new Error(error.message || 'Erro ao validar token');
      }

      if (data && !data.success) {
        throw new Error(data.error || 'Token inválido');
      }

      setTokenValid(true);
    } catch (error: any) {
      console.error('Erro ao validar token:', error);
      toast({
        title: "Token inválido",
        description: error.message || "Este link de recuperação é inválido ou expirou.",
        variant: "destructive",
      });
      navigate('/forgot-password');
    } finally {
      setValidatingToken(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "As senhas digitadas são diferentes.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      console.log('Enviando solicitação de reset:', { token, userId });
      
      const { data, error } = await supabase.functions.invoke('reset-password', {
        body: { 
          action: 'reset',
          token, 
          userId, 
          newPassword: password 
        }
      });

      if (error) {
        console.error('Erro na função:', error);
        throw new Error(error.message || 'Erro ao chamar função de reset');
      }

      if (data && !data.success) {
        throw new Error(data.error || 'Erro ao redefinir senha');
      }

      setPasswordReset(true);
      toast({
        title: "Senha redefinida!",
        description: "Sua senha foi alterada com sucesso.",
      });
    } catch (error: any) {
      console.error('Erro ao redefinir senha:', error);
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao redefinir a senha. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  if (validatingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-autofinance-gray-light">
        <div className="text-center">
          <p className="text-gray-600">Validando link de recuperação...</p>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen flex flex-col bg-autofinance-gray-light">
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <Lock className="mx-auto w-16 h-16 text-red-500 mb-4" />
              <h1 className="text-2xl font-bold text-gray-900">Link Inválido</h1>
              <p className="text-gray-600 mt-2">
                Este link de recuperação é inválido ou expirou.
              </p>
            </div>
            
            <Button onClick={() => navigate('/forgot-password')} className="w-full bg-autofinance-blue hover:bg-autofinance-blue-dark">
              Solicitar Novo Link
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (passwordReset) {
    return (
      <div className="min-h-screen flex flex-col bg-autofinance-gray-light">
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Senha Redefinida!</h1>
              <p className="text-gray-600 mt-2">
                Sua senha foi alterada com sucesso. Agora você pode fazer login com sua nova senha.
              </p>
            </div>
            
            <Button onClick={goToLogin} className="w-full bg-autofinance-blue hover:bg-autofinance-blue-dark">
              Fazer Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-autofinance-gray-light">
      <div className="p-4">
        <button onClick={goToLogin} className="flex items-center text-gray-600 hover:text-autofinance-blue">
          <ArrowLeft className="mr-1" size={20} />
          <span>Voltar ao Login</span>
        </button>
      </div>
      
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <img alt="AutoFinance Logo" src="/lovable-uploads/d26be550-b458-42d4-82c9-9cc2a23b1720.png" className="h-10 w-auto mx-auto object-fill" />
            </Link>
            <h1 className="text-2xl font-bold mt-4">Redefinir Senha</h1>
            <p className="text-gray-500 mt-2">
              Digite sua nova senha
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Nova Senha
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                required
                disabled={loading}
                minLength={6}
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar Nova Senha
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1"
                required
                disabled={loading}
                minLength={6}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-autofinance-blue hover:bg-autofinance-blue-dark" 
              disabled={loading}
            >
              {loading ? 'Redefinindo...' : 'Redefinir Senha'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;