import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Receipt } from "lucide-react";
import React from "react";
import Layout from "../components/Layout";

// Data for the reminders
const reminders = [
  {
    id: 1,
    title: "Academia",
    amount: "R$75.80",
    type: "Recorrente",
    bank: "BANCO Inter",
  },
  {
    id: 2,
    title: "Conta de Luz",
    amount: "R$165.68",
    type: "Recorrente",
    bank: "BANCO Inter",
  },
];

// Calendar data
const calendarData = {
  month: "November",
  year: 2025,
  selectedDay: 10,
  weekDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  days: [
    { day: 30, month: "prev" },
    { day: 31, month: "prev" },
    { day: 1, month: "current" },
    { day: 2, month: "current" },
    { day: 3, month: "current" },
    { day: 4, month: "current" },
    { day: 5, month: "current" },
    { day: 6, month: "current" },
    { day: 7, month: "current" },
    { day: 8, month: "current" },
    { day: 9, month: "current" },
    { day: 10, month: "current", selected: true },
    { day: 11, month: "current" },
    { day: 12, month: "current" },
    { day: 13, month: "current" },
    { day: 14, month: "current" },
    { day: 15, month: "current" },
    { day: 16, month: "current" },
    { day: 17, month: "current" },
    { day: 18, month: "current" },
    { day: 19, month: "current" },
    { day: 20, month: "current" },
    { day: 21, month: "current" },
    { day: 22, month: "current" },
    { day: 23, month: "current" },
    { day: 24, month: "current" },
    { day: 25, month: "current" },
    { day: 26, month: "current" },
    { day: 27, month: "current" },
    { day: 28, month: "current" },
    { day: 29, month: "current" },
    { day: 30, month: "current" },
    { day: 1, month: "next" },
    { day: 2, month: "next" },
    { day: 3, month: "next" },
  ],
};

const Frame = (): JSX.Element => {
  return (
    <Layout>
      <div className="flex flex-col w-full max-w-[389px] mx-auto bg-background">
        {/* Header */}
        <header className="flex items-center justify-between p-4">
          <div className="w-6" /> {/* Spacer */}
          <h1 className="text-lg font-medium">Lembretes</h1>
          <Avatar className="h-8 w-8">
            <AvatarImage alt="User" />
            <AvatarFallback className="bg-primary/10">U</AvatarFallback>
          </Avatar>
        </header>

        {/* Main Content */}
        <main className="flex flex-col p-4 bg-muted/30 rounded-t-lg">
          {/* Calendar Section */}
          <div className="bg-card rounded-lg p-4 mb-4">
            {/* Month/Year Selector */}
            <div className="flex gap-2 mb-4">
              <Select defaultValue={calendarData.month.toLowerCase()}>
                <SelectTrigger className="flex-1">
                  <SelectValue>{calendarData.month}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="november">{calendarData.month}</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue={calendarData.year.toString()}>
                <SelectTrigger className="w-24">
                  <SelectValue>{calendarData.year}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={calendarData.year.toString()}>
                    {calendarData.year}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Calendar Grid */}
            <div className="mb-4">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 mb-2">
                {calendarData.weekDays.map((day, index) => (
                  <div
                    key={index}
                    className="text-center text-xs text-muted-foreground"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarData.days.map((day, index) => (
                  <button
                    key={index}
                    className={`h-8 w-8 flex items-center justify-center rounded-md text-sm ${
                      day.selected
                        ? "bg-primary text-primary-foreground"
                        : day.month !== "current"
                          ? "text-muted-foreground"
                          : ""
                    }`}
                  >
                    {day.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar Actions */}
            <div className="flex justify-between mt-4">
              <Button variant="outline" className="text-sm">
                Ver lembretes
              </Button>
              <Button className="text-sm">Adicionar</Button>
            </div>
          </div>

          {/* Reminders List */}
          <div className="space-y-3">
            {reminders.map((reminder) => (
              <Card key={reminder.id} className="bg-card border-none">
                <CardContent className="p-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <Receipt size={20} className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{reminder.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {reminder.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{reminder.amount}</p>
                    <p className="text-xs text-muted-foreground">
                      {reminder.bank}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Frame;
