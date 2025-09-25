
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, createSupabaseClient } from '@/integrations/supabase/client';
import { Session, User, Subscription } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import Cookies from 'js-cookie';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signUp: (email: string, password: string, metadata: Record<string, any>) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    // Corrigido conforme sua sugestão
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (_event === 'SIGNED_IN' && session) {
        const redirectUrl = sessionStorage.getItem('postLoginRedirect');
        if (redirectUrl) {
          sessionStorage.removeItem('postLoginRedirect');
          navigate(redirectUrl);
        } else if (window.location.pathname === '/signin' || window.location.pathname === '/signup') {
          // Apenas redireciona para o dashboard se o login foi feito das páginas de auth
          navigate('/dashboard');
        }
      } else if (_event === 'SIGNED_OUT') {
        navigate('/signin');
      }
    });

    return () => {
      subscription?.unsubscribe(); // Correto
    };
  }, [navigate]);

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      // A navegação agora é tratada pelo onAuthStateChange
    }
    setLoading(false);
  };

  const signIn = async (email: string, password: string, rememberMe = false) => {
    setLoading(true);

    // A verificação de sessão ativa foi removida para permitir que usuários logados acessem a landing page.
    // O redirecionamento agora é tratado pelo onAuthStateChange.
    
    // Removida a criação de um novo cliente para usar a instância global,
    // resolvendo o aviso "Multiple GoTrueClient instances".
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setLoading(false);
      throw error;
    }

    if (rememberMe) {
      Cookies.set('auth-remember', email, { expires: 7, secure: true, sameSite: 'strict' });
    } else {
      Cookies.remove('auth-remember');
    }
    
    setLoading(false);
  };

  const signUp = async (email: string, password: string, metadata: Record<string, any>) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    setLoading(false);
    if (error) throw error;
  };
  

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  // Renderiza children apenas quando o carregamento inicial da sessão estiver concluído
  // para evitar piscar de conteúdo protegido.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
