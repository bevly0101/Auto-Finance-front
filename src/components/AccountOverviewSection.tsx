import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Menu } from "lucide-react";
import React from "react";

export const AccountOverviewSection: React.FC = () => {
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="p-0">
        {/* Header with navigation */}
        <header className="flex items-center justify-between w-full p-6 bg-card">
          <button className="flex items-center justify-center lg:hidden">
            <Menu className="w-6 h-6 text-foreground" />
          </button>

          <h1 className="font-semibold text-xl text-foreground font-['Inter-SemiBold',Helvetica]">
            Painel de Controle
          </h1>

          <Avatar className="h-8 w-8">
            <AvatarImage alt="User profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </header>

        {/* Accounts section heading */}
        <div className="flex items-center justify-between w-full px-6 pb-4 pt-2">
          <h2 className="font-semibold text-base text-foreground font-['Inter-SemiBold',Helvetica]">
            Minhas contas
          </h2>

          <Button
            variant="link"
            className="h-auto p-0 font-semibold text-sm text-foreground font-['Inter-SemiBold',Helvetica]"
          >
            Ver Todos
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default AccountOverviewSection;
