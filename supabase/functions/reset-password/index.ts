import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  action: 'validate' | 'reset';
  token: string;
  userId: string;
  newPassword?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, token, userId, newPassword }: RequestBody = await req.json();
    
    //console.log('Reset password request:', { action, userId, hasToken: !!token, hasNewPassword: !!newPassword });

    if (!action || !token || !userId) {
      console.error('Parâmetros ausentes:', { action, hasToken: !!token, userId });
      return new Response(
        JSON.stringify({ error: 'Parâmetros obrigatórios ausentes' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Inicializar Supabase cliente com service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Variáveis de ambiente ausentes');
      return new Response(
        JSON.stringify({ error: 'Configuração do servidor inválida' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // Criar hash do token recebido para comparação
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const tokenHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Buscar usuário e validar token
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, email, token_verificacao, token_expira_em')
      .eq('id', userId)
      .single();

    if (userError || !userData) {
      console.error('Erro ao buscar usuário:', { userId, error: userError });
      return new Response(
        JSON.stringify({ error: 'Token inválido' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    //console.log('Usuário encontrado:', { 
      userId: userData.id, 
      hasToken: !!userData.token_verificacao, 
      tokenExpiration: userData.token_expira_em 
    });

    // Verificar se o token existe e não expirou
    if (!userData.token_verificacao || !userData.token_expira_em) {
      //console.log('Token não encontrado para usuário:', userId);
      return new Response(
        JSON.stringify({ error: 'Token inválido' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Verificar se o token não expirou
    const tokenExpiration = new Date(userData.token_expira_em);
    if (tokenExpiration < new Date()) {
      //console.log('Token expirado para usuário:', userId);
      return new Response(
        JSON.stringify({ error: 'Token expirado' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Verificar se o hash do token confere
    //console.log('Comparando tokens:', { 
      receivedHash: tokenHash, 
      storedHash: userData.token_verificacao,
      match: userData.token_verificacao === tokenHash 
    });
    
    if (userData.token_verificacao !== tokenHash) {
      console.error('Token hash não confere para usuário:', userId);
      return new Response(
        JSON.stringify({ error: 'Token inválido' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Se ação é apenas validar, retornar sucesso
    if (action === 'validate') {
      return new Response(
        JSON.stringify({ success: true, message: 'Token válido' }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Se ação é reset, validar nova senha e atualizar
    if (action === 'reset') {
      if (!newPassword) {
        return new Response(
          JSON.stringify({ error: 'Nova senha é obrigatória' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      if (newPassword.length < 6) {
        return new Response(
          JSON.stringify({ error: 'Senha deve ter pelo menos 6 caracteres' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      // Atualizar senha no Supabase Auth usando Admin API
      const { error: authError } = await supabase.auth.admin.updateUserById(
        userId,
        { password: newPassword }
      );

      if (authError) {
        console.error('Erro ao atualizar senha no Auth:', authError);
        return new Response(
          JSON.stringify({ error: 'Erro ao atualizar senha' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      // Limpar token da tabela users após uso
      const { error: clearTokenError } = await supabase
        .from('users')
        .update({
          token_verificacao: null,
          token_expira_em: null
        })
        .eq('id', userId);

      if (clearTokenError) {
        console.error('Erro ao limpar token:', clearTokenError);
        // Não falhar a operação por isso, mas registrar o erro
      }

      //console.log('Senha redefinida com sucesso para usuário:', userId);
      return new Response(
        JSON.stringify({ success: true, message: 'Senha redefinida com sucesso' }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Ação inválida' }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Erro na função reset-password:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
};

serve(handler);