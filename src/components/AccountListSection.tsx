import { Card, CardContent } from "@/components/ui/card";
import { Building2Icon, CreditCardIcon, WalletIcon } from "lucide-react";
import React from "react";

export const AccountListSection = (): JSX.Element => {
  // Data for account cards
  const accounts = [
    {
      id: 1,
      icon: <WalletIcon className="h-6 w-6 text-blue-500" />,
      type: "carteira",
      bankName: null,
      iconBgColor: "bg-blue-100",
    },
    {
      id: 2,
      icon: <Building2Icon className="h-6 w-6 text-pink-500" />,
      type: "Banco",
      bankName: "C6 banco",
      iconBgColor: "bg-pink-100",
    },
    {
      id: 3,
      icon: <CreditCardIcon className="h-6 w-6 text-yellow-500" />,
      type: "Banco",
      bankName: "BV",
      iconBgColor: "bg-yellow-100",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-3.5 w-full max-w-[327px]">
      <h2 className="w-full text-center [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#333b69] text-base">
        Lista de Contas
      </h2>

      {accounts.map((account) => (
        <Card key={account.id} className="w-full">
          <CardContent className="p-3 flex items-center">
            <div
              className={`w-[45px] h-[45px] rounded-full flex items-center justify-center ${account.iconBgColor}`}
            >
              {account.icon}
            </div>

            <div className="ml-4 flex-1">
              <div className="flex">
                <div className="mr-8">
                  <div className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#232323] text-sm">
                    Tipo
                  </div>
                  <div className="[font-family:'Inter-Regular',Helvetica] font-normal text-muted-foreground text-xs">
                    {account.type}
                  </div>
                </div>

                {account.bankName && (
                  <div>
                    <div className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#232323] text-sm">
                      {account.id === 3 ? "Bank" : "Banco"}
                    </div>
                    <div className="[font-family:'Inter-Regular',Helvetica] font-normal text-muted-foreground text-xs">
                      {account.bankName}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <a
              href="#"
              className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#1814f3] text-[11px] whitespace-nowrap"
            >
              Ver Detalhes
            </a>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default AccountListSection;
