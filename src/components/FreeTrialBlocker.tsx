import React, { useState } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const FreeTrialBlocker: React.FC = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  const handleGoToPlans = () => {
    setIsVisible(false);
    window.location.href = 'https://buy.stripe.com/5kQ9AVggV2GH3f46RSafS05';
  };

  if (isVisible && profile?.plano_id === 4 && !profile?.credit_card_for_test) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg text-center text-gray-800 pointer-events-auto">
          <h2 className="text-2xl font-bold mb-4">Acesso Restrito</h2>
          <p>Para poder usar a plataforma por <strong>7 dias grátis</strong> é necessário escolher um plano. Não será combrado nada no ato da compra, apenas depois dos 7 dias.</p>
          <Button onClick={handleGoToPlans} className="mt-4">Quero 7 Dias Gŕatis</Button>
        </div>
      </div>
    );
  }

  return null;
};

export default FreeTrialBlocker;