import { Card, CardContent } from "@/components/ui/card";
import { Gamepad2, ShoppingBag, User } from "lucide-react";
import React from "react";

export const FixedAccountsDetailsSection = (): JSX.Element => {
  // Transaction data for mapping
  const transactions = [
    {
      id: 1,
      name: "Apple Store",
      time: "5h atrás",
      amount: "R$450",
      icon: <ShoppingBag size={20} />,
      iconBg: "bg-[#dcfaf8]",
      iconColor: "text-teal-500",
    },
    {
      id: 2,
      name: "Michael",
      time: "2 dias atrás",
      amount: "R$160",
      icon: <User size={20} />,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-500",
    },
    {
      id: 3,
      name: "Playstation",
      time: "5 dias atrás",
      amount: "R$1085",
      icon: <Gamepad2 size={20} />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      id: 4,
      name: "William",
      time: "10 dias atrás",
      amount: "R$90",
      icon: <User size={20} />,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-500",
    },
  ];

  return (
    <Card className="w-full rounded-[15px]">
      <CardContent className="p-5 flex flex-col gap-[15px]">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center">
              <div
                className={`w-[45px] h-[45px] ${transaction.iconBg} rounded-xl flex items-center justify-center`}
              >
                <div className={`${transaction.iconColor}`}>
                  {transaction.icon}
                </div>
              </div>

              <div className="ml-3">
                <div className="[font-family:'Inter-Medium',Helvetica] font-medium text-[#333b69] text-sm">
                  {transaction.name}
                </div>
                <div className="[font-family:'Inter-Regular',Helvetica] font-normal text-muted-foreground text-xs">
                  {transaction.time}
                </div>
              </div>
            </div>

            <div className="[font-family:'Inter-Regular',Helvetica] font-normal text-muted-foreground text-xs text-right">
              {transaction.amount}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FixedAccountsDetailsSection;
