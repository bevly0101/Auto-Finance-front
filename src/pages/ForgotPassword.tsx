import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/components/ui/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Verificar se o email existe
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email')
        .eq('email', email)
        .single();

      if (userError || !userData) {
        toast({
          title: "Email não encontrado",
          description: "Não encontramos uma conta com este email.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Chamar edge function para enviar email de recuperação
      const { error } = await supabase.functions.invoke('send-password-reset', {
        body: { email }
      });

      if (error) {
        throw error;
      }

      setEmailSent(true);
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    } catch (error: any) {
      console.error('Erro ao enviar email de recuperação:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar o email. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex flex-col bg-autofinance-gray-light">
        <div className="p-4">
          <button onClick={goToLogin} className="flex items-center text-gray-600 hover:text-autofinance-blue">
            <ArrowLeft className="mr-1" size={20} />
            <span>Voltar ao Login</span>
          </button>
        </div>
        
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Email Enviado!</h1>
              <p className="text-gray-600 mt-2">
                Enviamos um link de recuperação para <strong>{email}</strong>
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Verifique sua caixa de entrada e clique no link para redefinir sua senha.
              </p>
              
              <Button onClick={goToLogin} className="w-full bg-autofinance-blue hover:bg-autofinance-blue-dark">
                Voltar ao Login
              </Button>
            </div>
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
            <h1 className="text-2xl font-bold mt-4">Esqueceu sua senha?</h1>
            <p className="text-gray-500 mt-2">
              Digite seu email e enviaremos um link para redefinir sua senha
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                required
                disabled={loading}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-autofinance-blue hover:bg-autofinance-blue-dark" 
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
            </Button>
            
            <div className="text-center text-sm text-gray-600">
              Lembrou da senha?{" "}
              <Link to="/login" className="text-autofinance-blue hover:underline">
                Fazer login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;