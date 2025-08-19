import { Card, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import React from "react";

export const WeeklySummarySection = (): JSX.Element => {
  // Card data for mapping
  const cards = [
    {
      id: 1,
      balance: {
        label: "Balance",
        value: "R$5,756",
      },
      bankInfo: {
        label: "Nome Banco",
        value: "INTER",
      },
      validThru: {
        label: "VALID THRU",
        value: "12/22",
      },
      cardNumber: "3778 **** **** 1234",
      variant: "blue",
    },
    {
      id: 2,
      balance: {
        label: "Balance",
        value: "$5,756",
      },
      bankInfo: {
        label: "CARD HOLDER",
        value: "Eddy Cusuma",
      },
      validThru: {
        label: "VALID THRU",
        value: "12/22",
      },
      cardNumber: "3778 **** **** 1234",
      variant: "white",
    },
  ];

  return (
    <div className="flex gap-5 w-full">
      {cards.map((card) => (
        <Card
          key={card.id}
          className={`w-full h-[170px] rounded-[15px] overflow-hidden ${
            card.variant === "blue"
              ? "bg-[linear-gradient(107deg,rgba(76,73,237,1)_0%,rgba(10,6,244,1)_100%)]"
              : "bg-card border-[0.84px] border-solid border-[#deeaf2]"
          }`}
        >
          <CardContent className="p-0 h-full relative">
            {/* Balance section */}
            <div className="absolute top-[17px] left-5">
              <div
                className={`text-[11px] font-normal whitespace-nowrap ${
                  card.variant === "blue" ? "text-white" : "text-[#718ebf]"
                }`}
                style={{ fontFamily: "'Lato-Regular', Helvetica" }}
              >
                {card.balance.label}
              </div>
              <div
                className={`text-base font-semibold whitespace-nowrap mt-0.5 ${
                  card.variant === "blue" ? "text-white" : "text-foreground"
                }`}
                style={{ fontFamily: "'Anek_Latin-SemiBold', Helvetica" }}
              >
                {card.balance.value}
              </div>
            </div>

            {/* Card chip icon */}
            <div className="absolute top-[18px] right-5">
              <CreditCard
                className={
                  card.variant === "blue" ? "text-white/80" : "text-[#9199af80]"
                }
                size={29}
              />
            </div>

            {/* Middle section with bank/cardholder info and valid thru */}
            <div className="absolute top-[73px] left-5 flex justify-between w-[193px]">
              {/* Bank/Cardholder info */}
              <div>
                <div
                  className={`text-[10px] font-normal whitespace-nowrap ${
                    card.variant === "blue"
                      ? "text-[#ffffffb2]"
                      : "text-[#718ebf]"
                  }`}
                  style={{
                    fontFamily: "'Lato-Regular', Helvetica",
                    textShadow: "0.28px 0.56px 0.56px #00000080",
                  }}
                >
                  {card.bankInfo.label}
                </div>
                <div
                  className={`text-[13px] font-semibold whitespace-nowrap mt-0.5 ${
                    card.variant === "blue" ? "text-white" : "text-foreground"
                  }`}
                  style={{
                    fontFamily: "'Anek_Latin-SemiBold', Helvetica",
                    textShadow: "0.28px 0.56px 0.56px #00000040",
                  }}
                >
                  {card.bankInfo.value}
                </div>
              </div>

              {/* Valid thru */}
              <div>
                <div
                  className={`text-[10px] font-normal whitespace-nowrap ${
                    card.variant === "blue"
                      ? "text-[#ffffffb2]"
                      : "text-[#718ebf]"
                  }`}
                  style={{
                    fontFamily: "'Lato-Regular', Helvetica",
                    textShadow: "0.28px 0.56px 0.56px #00000080",
                  }}
                >
                  {card.validThru.label}
                </div>
                <div
                  className={`text-[13px] font-semibold whitespace-nowrap mt-0.5 ${
                    card.variant === "blue" ? "text-white" : "text-foreground"
                  }`}
                  style={{
                    fontFamily: "'Anek_Latin-SemiBold', Helvetica",
                    textShadow: "0.28px 0.56px 0.56px #00000040",
                  }}
                >
                  {card.validThru.value}
                </div>
              </div>
            </div>

            {/* Card number and card network icons */}
            <div
              className={`absolute bottom-0 left-0 w-full h-[51px] rounded-b-[15px] flex items-center px-5 ${
                card.variant === "blue"
                  ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_100%)]"
                  : "bg-[linear-gradient(180deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_100%)] border border-solid border-[#dfeaf2]"
              }`}
            >
              <div
                className={`text-[15px] font-semibold whitespace-nowrap ${
                  card.variant === "blue" ? "text-white" : "text-foreground"
                }`}
                style={{ fontFamily: "'Anek_Latin-SemiBold', Helvetica" }}
              >
                {card.cardNumber}
              </div>

              {/* Card network icon (overlapping circles) */}
              <div className="ml-auto relative h-[18px] w-[27px]">
                <div
                  className={`absolute w-[18px] h-[18px] top-0 left-0 rounded-[9.2px] ${
                    card.variant === "blue"
                      ? "bg-[#ffffff80]"
                      : "bg-[#9199af80]"
                  }`}
                />
                <div
                  className={`absolute w-[18px] h-[18px] top-0 left-[9px] rounded-[9.2px] ${
                    card.variant === "blue"
                      ? "bg-[#ffffff80]"
                      : "bg-[#9199af80]"
                  }`}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WeeklySummarySection;
