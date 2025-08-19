import React, { useEffect, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const token = searchParams.get('token');
  const userId = searchParams.get('userId');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || !userId) {
        setError('Link de verificação inválido');
        setVerifying(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-email', {
          body: { token, userId }
        });

        if (error) {
          throw error;
        }

        if (data.success) {
          setSuccess(true);
          // Redirecionar para dashboard após 2 segundos se houver URL de redirecionamento
          if (data.redirectUrl) {
            setTimeout(() => {
              window.location.href = data.redirectUrl;
            }, 2000);
          }
        } else {
          setError(data.error || 'Erro ao verificar email');
        }
      } catch (error: any) {
        console.error('Erro ao verificar email:', error);
        setError(error.message || 'Erro ao verificar email');
      } finally {
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [token, userId]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            {verifying && <Loader2 className="h-5 w-5 animate-spin" />}
            {success && <CheckCircle className="h-5 w-5 text-green-600" />}
            {error && <XCircle className="h-5 w-5 text-red-600" />}
            Verificação de Email
          </CardTitle>
          <CardDescription>
            {verifying && "Verificando seu email..."}
            {success && "Email verificado com sucesso!"}
            {error && "Erro na verificação"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {verifying && (
            <div className="text-center text-muted-foreground">
              Aguarde enquanto verificamos seu email...
            </div>
          )}
          
          {success && (
            <div className="space-y-4">
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Seu email foi verificado com sucesso! Agora você pode acessar todas as funcionalidades do AutoFinance.
                </AlertDescription>
              </Alert>
              
              <div className="text-center">
                <Button asChild className="w-full">
                  <a href={user ? "/dashboard" : "/login"}>
                    {user ? "Ir para Dashboard" : "Fazer Login"}
                  </a>
                </Button>
              </div>
            </div>
          )}
          
          {error && (
            <div className="space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
              
              <div className="text-center space-y-2">
                <Button variant="outline" asChild className="w-full">
                  <a href="/login">Voltar ao Login</a>
                </Button>
                <p className="text-sm text-muted-foreground">
                  Se o problema persistir, entre em contato com o suporte.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;