import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: RequestBody = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email é obrigatório' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Inicializar Supabase cliente
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verificar se o usuário existe
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, email, nome')
      .eq('email', email)
      .single();

    if (userError || !userData) {
      console.log('Usuário não encontrado para email:', email);
      return new Response(
        JSON.stringify({ error: 'Email não encontrado' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Gerar token único e seguro
    const resetToken = crypto.randomUUID();
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 24); // 24 horas

    // Criar hash do token para segurança
    const encoder = new TextEncoder();
    const data = encoder.encode(resetToken);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const tokenHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Salvar token hash na tabela users
    const { error: updateError } = await supabase
      .from('users')
      .update({
        token_verificacao: tokenHash,
        token_expira_em: tokenExpiration.toISOString()
      })
      .eq('id', userData.id);

    if (updateError) {
      console.error('Erro ao salvar token:', updateError);
      return new Response(
        JSON.stringify({ error: 'Erro interno do servidor' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Enviar email com Resend
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    const resetUrl = `https://preview--canva-clone-reborn-93.lovable.app/reset-password?token=${resetToken}&userId=${userData.id}`;

    const emailResult = await resend.emails.send({
      from: 'AutoFinance <noreply@autosfinance.com.br>',
      to: [email],
      subject: 'Redefinir sua senha - AutoFinance',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1e40af; margin-bottom: 10px;">AutoFinance</h1>
            <h2 style="color: #374151; margin-bottom: 20px;">Redefinir sua senha</h2>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #374151; margin-bottom: 15px;">Olá${userData.nome ? ` ${userData.nome}` : ''},</p>
            <p style="color: #374151; margin-bottom: 15px;">
              Recebemos uma solicitação para redefinir a senha da sua conta AutoFinance.
            </p>
            <p style="color: #374151; margin-bottom: 20px;">
              Clique no botão abaixo para criar uma nova senha:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #1e40af; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Redefinir Senha
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">
              Ou copie e cole este link no seu navegador:
            </p>
            <p style="color: #6b7280; font-size: 12px; word-break: break-all; background-color: #ffffff; padding: 10px; border-radius: 4px;">
              ${resetUrl}
            </p>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px;">
            <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">
              <strong>Importante:</strong>
            </p>
            <ul style="color: #6b7280; font-size: 14px; margin-bottom: 15px;">
              <li>Este link expira em 24 horas</li>
              <li>Se você não solicitou esta alteração, ignore este email</li>
              <li>Sua senha atual continuará funcionando até que você a redefina</li>
            </ul>
            
            <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 30px;">
              AutoFinance - Gerencie suas finanças pessoais de forma inteligente
            </p>
          </div>
        </div>
      `
    });

    if (emailResult.error) {
      console.error('Erro ao enviar email:', emailResult.error);
      return new Response(
        JSON.stringify({ error: 'Erro ao enviar email' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Email de recuperação enviado para:', email);
    return new Response(
      JSON.stringify({ success: true, message: 'Email de recuperação enviado' }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Erro na função send-password-reset:', error);
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