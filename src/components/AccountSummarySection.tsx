import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export const AccountSummarySection = (): JSX.Element => {
  // Data for pagination items
  const paginationItems = [
    { number: 1, isCurrent: true },
    { number: 2, isCurrent: false },
    { number: 3, isCurrent: false },
    { number: 4, isCurrent: false },
  ];

  return (
    <div className="flex w-full justify-center py-2">
      {/* 
        O componente de paginação foi desativado porque o arquivo 
        @/components/ui/pagination.tsx não foi encontrado.
      */}
    </div>
  );
};

export default AccountSummarySection;
