import { Card, CardContent } from "@/components/ui/card";
import { UserBank } from "@/components/dashboard/types";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useResponsive } from "@/hooks/useResponsive";

interface BalanceStatisticsSectionProps {
  cards: UserBank[];
  selectedBankId: string | null;
  onBankChange: (bankId: string) => void;
}

export default function BalanceStatisticsSection({ cards, selectedBankId, onBankChange }: BalanceStatisticsSectionProps): JSX.Element {

  const { isMobile } = useResponsive();
  const currentIndex = cards.findIndex(c => c.id === selectedBankId);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handlePrevious = () => {
    const isFirstCard = currentIndex === 0;
    const newIndex = isFirstCard ? cards.length - 1 : currentIndex - 1;
    onBankChange(cards[newIndex].id);
  };

  const handleNext = () => {
    const isLastCard = currentIndex === cards.length - 1;
    const newIndex = isLastCard ? 0 : currentIndex + 1;
    onBankChange(cards[newIndex].id);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile || cards.length <= 1) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || cards.length <= 1) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isMobile || cards.length <= 1 || touchStart === 0 || touchEnd === 0) return;
    const distance = touchStart - touchEnd;
    const swipeThreshold = 50;
    const isLeftSwipe = distance > swipeThreshold;
    const isRightSwipe = distance < -swipeThreshold;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  if (!cards || cards.length === 0) {
    return (
      <div className="flex items-center justify-center w-full p-4 bg-card text-center h-[235px] rounded-2xl border border-white/5">
        <p>Nenhum cartão cadastrado.</p>
      </div>
    );
  }

  const currentCard = cards.find(c => c.id === selectedBankId);

  if (!currentCard) {
    // Pode acontecer brevemente enquanto os dados carregam ou se o ID selecionado for inválido
    return (
        <div className="flex items-center justify-center w-full p-4 bg-card text-center h-[235px] rounded-2xl border border-white/5">
            <p>Carregando dados do cartão...</p>
        </div>
    );
  }

  // Função para formatar o saldo como moeda brasileira
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 bg-card rounded-2xl border border-white/5">
      <div className="flex items-center justify-center w-full space-x-2">
        {cards.length > 1 && !isMobile && (
          <button onClick={handlePrevious} className="p-2 rounded-full bg-primary/10 text-primary-foreground hover:bg-primary/20 transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <Card
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full max-w-[350px] h-[235px] rounded-[25px] overflow-hidden border-0 text-white shadow-2xl"
          style={{ background: currentCard.color_rgb }}
        >
          <CardContent className="relative p-4 sm:p-6 h-full flex flex-col justify-between z-10">
            {/* Top Section: Balance and Chip */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs sm:text-sm font-light text-gray-200">Saldo</p>
                <p className="text-xl sm:text-2xl font-semibold tracking-wider">{formatCurrency(currentCard.balance)}</p>
              </div>
              <div className="w-10 h-7 sm:w-12 sm:h-9 bg-card/20 rounded-md border border-white/30 grid grid-cols-2 gap-px p-1">
                  <div className="bg-card/20 rounded-sm"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-transparent"></div>
                  <div className="bg-card/20 rounded-sm"></div>
              </div>
            </div>

            {/* Middle Section: Card Number (Placeholder) */}
            <div className="flex justify-center items-center w-full absolute top-1/2 -translate-y-1/2 left-0 px-4 sm:px-6">
               <p className="text-lg sm:text-xl font-medium tracking-widest">**** **** **** {currentCard.lastFourDigits}</p>
            </div>

            {/* Bottom Section: Card Holder, Valid Thru and Logo */}
            <div className="flex justify-between items-end text-xs sm:text-sm">
              <div>
                  <p className="text-xs font-light text-gray-300">NOME DO CARTÃO</p>
                  <p className="text-sm sm:text-md font-medium">{currentCard.bankName}</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                  <div>
                      <p className="text-xs font-light text-gray-300">CÓDIGO</p>
                      <p className="text-sm sm:text-md font-medium">{currentCard.bankCode}</p>
                  </div>
                  {/* Mastercard Logo Placeholder */}
                  <div className="flex">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-300/50 rounded-full"></div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-400/50 rounded-full -ml-4 sm:-ml-5"></div>
                  </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {cards.length > 1 && !isMobile && (
          <button onClick={handleNext} className="p-2 rounded-full bg-primary/10 text-primary-foreground hover:bg-primary/20 transition-colors">
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {cards.length > 1 && isMobile && (
        <div className="flex justify-center items-center space-x-2 mt-4">
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => onBankChange(card.id)}
              className={`w-2 h-2 rounded-full transition-colors ${currentIndex === index ? 'bg-primary' : 'bg-primary/20'}`}
              aria-label={`Ir para o cartão ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
