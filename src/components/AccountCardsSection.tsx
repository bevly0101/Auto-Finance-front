import React from "react";

export const AccountCardsSection: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {/* Cartão Azul */}
        <div className="relative w-[300px] lg:w-[350px] h-[235px] flex-shrink-0 bg-gradient-to-br from-[#5B5CE6] to-[#4C4DDB] rounded-[25px] p-6 text-white overflow-hidden">
          {/* Ícone do chip */}
          <div className="absolute top-6 right-6">
            <div className="w-8 h-8 bg-card/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-card rounded-sm"></div>
            </div>
          </div>
          
          {/* Balance */}
          <div className="mt-2">
            <p className="text-white/80 text-sm font-normal">Balance</p>
            <p className="text-white text-2xl font-semibold mt-1">R$5,756</p>
          </div>
          
          {/* Card holder info */}
          <div className="absolute bottom-20 left-6 right-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white/60 text-xs font-normal uppercase tracking-wider">CARD HOLDER</p>
                <p className="text-white text-base font-semibold mt-1">Eddy Cusuma</p>
              </div>
              <div>
                <p className="text-white/60 text-xs font-normal uppercase tracking-wider">VALID THRU</p>
                <p className="text-white text-base font-semibold mt-1">12/22</p>
              </div>
            </div>
          </div>
          
          {/* Card number */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
            <p className="text-white text-xl font-semibold tracking-wider">3778 **** **** 1234</p>
            {/* Mastercard logo placeholder */}
            <div className="flex">
              <div className="w-6 h-6 bg-card/80 rounded-full"></div>
              <div className="w-6 h-6 bg-card/60 rounded-full -ml-3"></div>
            </div>
          </div>
        </div>

        {/* Cartão Branco */}
        <div className="relative w-[300px] lg:w-[350px] h-[235px] flex-shrink-0 bg-card border border-border rounded-[25px] p-6 text-foreground overflow-hidden shadow-sm">
          {/* Ícone do chip */}
          <div className="absolute top-6 right-6">
            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-card rounded-sm"></div>
            </div>
          </div>
          
          {/* Balance */}
          <div className="mt-2">
            <p className="text-muted-foreground text-sm font-normal">Balance</p>
            <p className="text-foreground text-2xl font-semibold mt-1">R$5,756</p>
          </div>
          
          {/* Card holder info */}
          <div className="absolute bottom-20 left-6 right-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-muted-foreground text-xs font-normal uppercase tracking-wider">CARD HOLDER</p>
                <p className="text-foreground text-base font-semibold mt-1">Eddy Cusuma</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-normal uppercase tracking-wider">VALID THRU</p>
                <p className="text-foreground text-base font-semibold mt-1">12/22</p>
              </div>
            </div>
          </div>
          
          {/* Card number */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
            <p className="text-foreground text-xl font-semibold tracking-wider">3778 **** **** 1234</p>
            {/* Mastercard logo placeholder */}
            <div className="flex">
              <div className="w-6 h-6 bg-muted rounded-full"></div>
              <div className="w-6 h-6 bg-muted/50 rounded-full -ml-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCardsSection;

