import React, { useState } from 'react';
import { UserBank } from '@/components/dashboard/types';
import CreditCardDisplay from './CreditCardDisplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CreditCardCarouselProps {
  cards: UserBank[];
}

const CreditCardCarousel: React.FC<CreditCardCarouselProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    const isFirstCard = currentIndex === 0;
    const newIndex = isFirstCard ? cards.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const isLastCard = currentIndex === cards.length - 1;
    const newIndex = isLastCard ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (cards.length === 0) {
    return <p>Nenhum cartão cadastrado.</p>;
  }

  return (
    <div className="flex items-center justify-center space-x-4">
      {cards.length > 1 && (
        <button onClick={handlePrevious} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      <CreditCardDisplay card={cards[currentIndex]} />

      {cards.length > 1 && (
        <button onClick={handleNext} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default CreditCardCarousel;