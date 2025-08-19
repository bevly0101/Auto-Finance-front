import React from "react";
import { CreditCard, Lock, Smartphone, Apple, Store } from "lucide-react";

// Dados das configurações baseados na imagem
const settingsData = [
  {
    id: 1,
    title: "Bloquear Cartão",
    description: "Bloqueie seu cartão instantaneamente",
    icon: CreditCard,
    iconBgColor: "bg-[#FFF4E6]",
    iconColor: "text-[#FFBB38]",
  },
  {
    id: 2,
    title: "Mudar Código PIN",
    description: "Escolha outro código PIN",
    icon: Lock,
    iconBgColor: "bg-[#E7EDFF]",
    iconColor: "text-[#396AFF]",
  },
  {
    id: 3,
    title: "Adicionar ao Google Pay",
    description: "Saque sem precisar de cartão",
    icon: Smartphone,
    iconBgColor: "bg-[#FFE0EB]",
    iconColor: "text-[#FF82AC]",
  },
  {
    id: 4,
    title: "Adicionar ao Apple Pay",
    description: "Saque sem precisar de cartão",
    icon: Apple,
    iconBgColor: "bg-[#E0F7FA]",
    iconColor: "text-[#4ECDC4]",
  },
  {
    id: 5,
    title: "Adicionar à Apple Store",
    description: "Saque sem precisar de cartão",
    icon: Store,
    iconBgColor: "bg-[#E0F7FA]",
    iconColor: "text-[#4ECDC4]",
  },
];

export default function AccountSettingsComponent(): JSX.Element {
  return (
    <div className="bg-card rounded-[25px] p-6 shadow-sm">
      <h2 className="text-foreground text-[22px] font-semibold mb-6">
        Configuração das contas
      </h2>
      
      <div className="space-y-4">
        {settingsData.map((setting) => {
          const IconComponent = setting.icon;
          
          return (
            <div key={setting.id} className="flex items-center gap-4 p-3 hover:bg-[#F5F7FA] rounded-[15px] cursor-pointer transition-colors">
              <div className={`w-[50px] h-[50px] rounded-[15px] ${setting.iconBgColor} flex items-center justify-center`}>
                <IconComponent className={`w-5 h-5 ${setting.iconColor}`} />
              </div>
              
              <div className="flex-1">
                <h3 className="text-foreground text-base font-medium">
                  {setting.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {setting.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

