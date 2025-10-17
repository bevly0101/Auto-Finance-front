import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import PixIcon from '@/assets/pix-icon.svg';
import { paymentLinks } from '@/constants';

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

const ChoosePaymentMethodPage: React.FC = () => {
  const { planId, billingCycle } = useParams<{ planId: 'premium' | 'family'; billingCycle: 'monthly' | 'yearly' }>();
  const navigate = useNavigate();

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

  const handleCardPayment = () => {
    const checkoutLink = paymentLinks[planId]?.[billingCycle];
    if (checkoutLink) {
      window.location.href = checkoutLink;
    } else {
      // Idealmente, mostrar um erro para o usuário
      console.error('Link de checkout para cartão não encontrado.');
    }
  };

  const handlePixPayment = () => {
    navigate(`/pix-payment/${planId}/${billingCycle}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Escolha o Método de Pagamento</CardTitle>
          <CardDescription className="text-center">
            Você está assinando o plano <span className="font-semibold text-primary">{details.name}</span> por <span className="font-semibold text-primary">{details.price}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleCardPayment}
            className="w-full py-6 text-lg"
            variant="outline"
          >
            <CreditCard className="mr-3 h-6 w-6" />
            Cartão de Crédito
          </Button>
          <Button
            onClick={handlePixPayment}
            className="w-full py-6 text-lg"
            variant="outline"
          >
            <img src={PixIcon} alt="PIX" className="mr-3 h-6 w-6" />
            PIX
          </Button>
        </CardContent>
        <CardFooter>
          <Button variant="link" onClick={() => navigate('/')} className="w-full">
            Cancelar e voltar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChoosePaymentMethodPage;