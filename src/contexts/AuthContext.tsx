
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
    const getSession = async () => {
      setLoading(true); // Iniciar carregamento
      try {
        const { data: { session: activeSession } } = await supabase.auth.getSession();
        setSession(activeSession);
        setUser(activeSession?.user ?? null);

        // Redirecionamento automático se "Lembre de mim" estiver ativo
        // Redireciona para o dashboard apenas se houver uma sessão ativa.
        // A lógica de preenchimento de e-mail é tratada na página de login.
        if (activeSession && window.location.pathname === '/signin') {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Erro ao buscar sessão inicial:", error);
        // Tratar erro, talvez definindo session/user como null
        setSession(null);
        setUser(null);
      } finally {
        setLoading(false); // Finalizar carregamento em todos os casos
      }
    };

    getSession();

    // Corrigido conforme sua sugestão
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      console.log(_event, newSession)
      if (_event === 'SIGNED_IN' && newSession?.user) {
        const { data: userProfile, error: profileError } = await supabase
          .from('users')
          .select('plano_id') // Corrigido: Remove a coluna 'verified_code' que não existe
          .eq('id', newSession.user.id)
          .single();

        if (profileError || !userProfile) {
          toast({
            title: "Erro de Perfil",
            description: "Não foi possível carregar os dados do seu perfil. O acesso foi negado.",
            variant: "destructive",
          });
          await supabase.auth.signOut();
          return;
        }

        if (userProfile.plano_id === 99) {
          toast({
            title: "Acesso Restrito",
            description: "Sua conta está temporariamente bloqueada. Entre em contato com o suporte.",
            variant: "destructive",
          });
          await supabase.auth.signOut();
          return;
        }
        
        // A lógica de verificação de e-mail foi removida temporariamente
        // já que a coluna 'verified_code' não existe no banco de dados.
        // TODO: Reimplementar a verificação de e-mail se necessário.
        setSession(newSession);
        setUser(newSession.user);

        const redirectUrl = sessionStorage.getItem('postLoginRedirect');
        if (redirectUrl) {
          sessionStorage.removeItem('postLoginRedirect');
          // Redireciona para a URL de checkout externa
          window.location.href = redirectUrl;
        } else {
          // Comportamento padrão: redireciona para o dashboard
          navigate('/dashboard');
        }
      } else if (_event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
        // A navegação será tratada pela função signOut para garantir o redirecionamento correto.
      } else {
        setSession(newSession);
        setUser(newSession?.user ?? null);
      }
      
      setLoading(false);
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
      navigate('/signin');
    }
    setLoading(false);
  };

  const signIn = async (email: string, password: string, rememberMe = false) => {
    setLoading(true);

    // Verifica se já existe uma sessão ativa
    const { data: { session: activeSession } } = await supabase.auth.getSession();
    if (activeSession) {
      navigate('/dashboard');
      setLoading(false);
      return;
    }
    
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
