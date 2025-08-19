import React from 'react';
import { UserBank } from '@/components/dashboard/types';

interface CreditCardDisplayProps {
  card: UserBank;
}

const CreditCardDisplay: React.FC<CreditCardDisplayProps> = ({ card }) => {
  // Lógica de exibição do cartão aqui
  return (
    <div>
      <h2>{card.bankName}</h2>
      <p>**** **** **** {card.lastFourDigits}</p>
      <p>Bandeira: {card.cardBrand}</p>
    </div>
  );
};

export default CreditCardDisplay;