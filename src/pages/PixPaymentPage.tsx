import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';

const planDetails = {
  premium: {
    monthly: { name: 'Premium Mensal', price: 'R$19,90' },
    yearly: { name: 'Premium Anual', price: 'R$214,97' },
  },
  family: {
    monthly: { name: 'Família Mensal', price: 'R$59,90' },
    yearly: { name: 'Família Anual', price: 'R$647,97' },
  },
};

const PixPaymentPage: React.FC = () => {
  const { planId, billingCycle } = useParams<{ planId: 'premium' | 'family'; billingCycle: 'monthly' | 'yearly' }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [qrCode, setQrCode] = useState<string | null>(null);
  const [pixCode, setPixCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generatePixQrCode = async () => {
      // Executa a requisição apenas se o QR code ainda não foi gerado
      if (qrCode || !user || !planId || !billingCycle) {
        if (!user || !planId || !billingCycle) {
          setError('Informações do usuário ou do plano estão ausentes.');
          setIsLoading(false);
        }
        return;
      }

      try {
        const response = await fetch('https://webhook.autosfinance.com.br/webhook/4ad11535-1525-469f-a855-893945c0aa0a', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            userEmail: user.email,
            planId,
            billingCycle,
            price: planDetails[planId][billingCycle].price,
          }),
        });

        if (!response.ok) {
          throw new Error('Falha ao gerar o QR Code do PIX. Tente novamente.');
        }

        const data = await response.json();
        
        // O webhook retorna 'base_64' para a imagem e 'code' para o texto
        if (data.base_64 && data.code) {
          setQrCode(data.base_64);
          setPixCode(data.code);
        } else {
          throw new Error('Resposta do servidor inválida. QR Code ou código PIX ausente.');
        }

      } catch (err: any) {
        setError(err.message || 'Ocorreu um erro desconhecido.');
      } finally {
        setIsLoading(false);
      }
    };

    generatePixQrCode();
  }, [user, planId, billingCycle]);

  if (!planId || !billingCycle || !planDetails[planId] || !planDetails[planId][billingCycle]) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive">Plano Inválido</h1>
          <p className="text-muted-foreground">O plano selecionado não foi encontrado.</p>
          <Button onClick={() => navigate('/')} className="mt-4">Voltar para Início</Button>
        </div>
      </div>
    );
  }

  const details = planDetails[planId][billingCycle];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Pagamento com PIX</CardTitle>
          <CardDescription className="text-center">
            Plano: <span className="font-semibold text-primary">{details.name}</span> - <span className="font-semibold text-primary">{details.price}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          {isLoading && (
            <>
              <Skeleton className="h-64 w-64" />
              <Skeleton className="h-4 w-48" />
              <p className="text-muted-foreground animate-pulse">Gerando QR Code...</p>
            </>
          )}
          {error && !isLoading && (
            <div className="text-center text-destructive">
              <p className="font-semibold">Erro!</p>
              <p>{error}</p>
            </div>
          )}
          {qrCode && pixCode && !isLoading && (
            <>
              <img src={`data:image/png;base64,${qrCode}`} alt="PIX QR Code" className="rounded-lg" />
              <p className="text-sm text-center text-muted-foreground mt-4">
                Escaneie o QR Code ou copie o código abaixo.
              </p>
              <div className="w-full p-2 mt-2 bg-muted rounded-lg flex items-center space-x-2">
                <input
                  type="text"
                  value={pixCode}
                  readOnly
                  className="flex-1 bg-transparent text-xs text-muted-foreground truncate"
                />
                <Button
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(pixCode);
                    // Idealmente, usar um toast para notificar o usuário
                    //alert('Código PIX copiado!');
                  }}
                >
                  Copiar
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground pt-4">
                Após o pagamento, enviaremos uma mensagem no seu Whatsapp avisando que o pagamento foi realizado.
              </p>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="link" onClick={() => navigate(`/choose-payment/${planId}/${billingCycle}`)} className="w-full">
            Voltar e escolher outro método
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PixPaymentPage;