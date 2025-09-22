import React from 'react';
import { Reminder } from '@/hooks/useReminders';

interface MonthViewProps {
  currentDate: Date;
  reminders: Reminder[];
  onDateClick: (date: Date) => void;
  getRemindersForDate: (date: Date) => Reminder[];
  getReminderColor: (reminder: Reminder) => string;
}

const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

const MonthView: React.FC<MonthViewProps> = ({ currentDate, reminders, onDateClick, getRemindersForDate, getReminderColor }) => {
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay();

    const days = [];
    
    for (let i = 1; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, 1 - (startingDayOfWeek - i));
      days.push({ day: prevMonthDay.getDate(), isCurrentMonth: false, date: prevMonthDay });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ day, isCurrentMonth: true, date: new Date(year, month, day) });
    }

    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const nextMonthDay = new Date(year, month + 1, i);
      days.push({ day: nextMonthDay.getDate(), isCurrentMonth: false, date: nextMonthDay });
    }

    return days;
  };

  const days = getDaysInMonth();

  return (
    <div className="p-2 sm:p-4">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-1 sm:p-2 text-center text-xs sm:text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((dayInfo, index) => {
          const dayReminders = getRemindersForDate(dayInfo.date);
          const isToday = dayInfo.date.toDateString() === new Date().toDateString();
          
          return (
            <div
              key={index}
              className={`min-h-[60px] sm:min-h-[80px] p-1 border border-border ${dayInfo.isCurrentMonth ? 'bg-card' : 'bg-muted/50'} ${isToday ? 'ring-2 ring-primary' : ''} cursor-pointer`}
              onClick={() => onDateClick(dayInfo.date)}
            >
              <div className={`text-xs sm:text-sm font-medium mb-1 ${dayInfo.isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'} ${isToday ? 'text-primary' : ''}`}>
                {dayInfo.day}
              </div>
              
              <div className="space-y-1">
                {dayReminders.slice(0, 2).map((reminder) => (
                  <div
                    key={reminder.id}
                    className={`text-xs px-1 py-0.5 rounded text-center truncate ${getReminderColor(reminder)}`}
                    title={reminder.titulo}
                  >
                    {reminder.titulo}
                  </div>
                ))}
                {dayReminders.length > 2 && (
                  <div className="text-xs text-muted-foreground text-center">
                    +{dayReminders.length - 2} mais
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;