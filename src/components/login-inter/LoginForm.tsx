import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import InputField from './InputField';
import PasswordInput from './PasswordInput';
import Logo from './Logo';
import { useAuth } from '@/contexts/AuthContext';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Cookies from 'js-cookie';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = Cookies.get('auth-remember');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Por favor, preencha o e-mail e a senha.");
      return;
    }

    try {
      await signIn(email, password, rememberMe);
      // A navegação será tratada pelo AuthContext após a verificação do usuário
    } catch (error: any) {
      console.error("Erro de autenticação:", error.message);
      
      // A API do Supabase retorna 'Invalid login credentials' tanto para e-mail
      // não encontrado quanto para senha incorreta. Isso é uma prática de
      // segurança para evitar a enumeração de usuários.
      if (error.message.includes('Invalid login credentials')) {
        setError('E-mail ou senha inválidos.');
      } else {
        setError('Ocorreu um erro ao tentar fazer login.');
      }
    }
  };

  const handleGoogleLogin = () => {
    // Lógica de login com o Google
  };

  const handleRegisterClick = () => {
    navigate('/signup');
  };

  return (
    <div className="h-full bg-background dark:bg-gray-800 flex flex-col">
      {/* Logo Section */}
      <Logo />
      
      {/* Form Section */}
      <div className="flex-1 px-6 sm:px-8 pb-8">
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Bem-vindo de volta!</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Faça login para acessar sua conta.</p>
          </div>

          {/* Google Button */}

          

          {/* Username Input */}
          <InputField
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={setEmail}
            icon={User}
            name="email"
            error={error || undefined}
            className="mb-4"
          />

          {/* Password Input */}
          <PasswordInput
            placeholder="Senha"
            value={password}
            onChange={setPassword}
            name="password"
            className="mb-4"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember-me" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} />
              <Label htmlFor="remember-me" className="text-sm text-gray-600 dark:text-gray-300">Lembre de mim</Label>
            </div>
            <a href="https://wa.me/5527997404747?text=Oi%2C%20Auto%2C%20esqueci%20minha%20senha" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
              Esqueceu a senha?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-bold
              py-3
              px-6
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
              dark:focus:ring-offset-gray-800
              transition-all duration-300
              shadow-lg
              hover:shadow-xl
              transform hover:-translate-y-0.5
            "
          >
            Entrar
          </button>

          {/* Register Link */}
          <div className="text-center mt-6">
            <span className="text-gray-500 dark:text-gray-400">Não tem uma conta? </span>
            <button
              type="button"
              onClick={handleRegisterClick}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline transition-colors duration-200"
            >
              Crie uma agora
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

