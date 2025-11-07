import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FreeTrialOfferPage: React.FC = () => {
  const navigate = useNavigate();

  const handleProceed = () => {
    window.location.href = 'https://buy.stripe.com/5kQ9AVggV2GH3f46RSafS05';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-8 space-y-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">7 Dias Grátis!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            Para poder usar a plataforma por 7 dias grátis é necessário escolher um plano. Não será cobrado nada na compra se escolher o método no Cartão de Crédito, apenas depois dos 7 dias.
          </p>
          <Button onClick={handleProceed} className="w-full">
            Adquirir 7 dias grátis
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeTrialOfferPage;