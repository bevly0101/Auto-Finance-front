import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export const CardDetailsSection = (): JSX.Element => {
  // Data for the balance statistics
  const balanceData = [
    { name: "NUbank", color: "bg-[#4c78ff]" },
    { name: "BV", color: "bg-[#16dbcc]" },
    { name: "ITI", color: "bg-[#ff82ac]" },
    { name: "Inter", color: "bg-[#ffbb38]" },
  ];

  return (
    <Card className="w-full border-0 shadow-none">
      <CardContent className="flex flex-col items-center p-0">
        <h2 className="text-[22px] font-semibold text-[#333b69] mb-4">
          Statisticas de Saldos
        </h2>

        <div className="relative w-full flex justify-center">
          {/* Donut chart visualization */}
          <div className="relative w-[200px] h-[200px]">
            {/* This would typically be a proper chart component */}
            {/* For now using a placeholder image that represents the donut chart */}
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <div className="absolute inset-0 flex">
                <div className="w-1/2 h-full">
                  <div className="h-1/2 bg-[#4c78ff]"></div>
                  <div className="h-1/2 bg-[#ffbb38]"></div>
                </div>
                <div className="w-1/2 h-full">
                  <div className="h-1/2 bg-[#ff82ac]"></div>
                  <div className="h-1/2 bg-[#16dbcc]"></div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[40%] h-[40%] bg-card rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2">
            {balanceData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div className={`w-3 h-3 ${item.color} rounded-[6px]`}></div>
                <span className="ml-[10px] text-xs font-medium text-muted-foreground">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardDetailsSection;
