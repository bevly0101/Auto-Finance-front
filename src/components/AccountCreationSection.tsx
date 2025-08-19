import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export const AccountCreationSection = (): JSX.Element => {
  // Form field data for mapping
  const formFields = [
    {
      id: "account-type",
      label: "Tipo de conta",
      placeholder: "Carteira/Banco",
    },
    {
      id: "account-name",
      label: "Nome da conta",
      placeholder: "My Cards",
    },
    {
      id: "initial-balance",
      label: "Saldo inicial",
      placeholder: "**** **** **** ****",
    },
    {
      id: "bank",
      label: "Banco",
      placeholder: "25 January 2025",
    },
  ];

  return (
    <div className="flex flex-col items-start gap-4">
      {formFields.map((field) => (
        <div key={field.id} className="relative w-[287px] h-[65px]">
          <label
            htmlFor={field.id}
            className="block mb-2 [font-family:'Inter-Regular',Helvetica] font-normal text-[#232323] text-[13px] tracking-[0] leading-[normal]"
          >
            {field.label}
          </label>
          <Input
            id={field.id}
            className="h-10 w-[285px] bg-card rounded-[10px] border border-solid border-[#dfeaf2] [font-family:'Inter-Regular',Helvetica] font-normal text-muted-foreground text-xs"
            placeholder={field.placeholder}
          />
        </div>
      ))}

      <div className="w-[287px] mt-4">
        <Button className="w-full h-10 bg-[#1814f3] rounded-[9px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[15px]">
          Criar
        </Button>
      </div>
    </div>
  );
};

export default AccountCreationSection;
