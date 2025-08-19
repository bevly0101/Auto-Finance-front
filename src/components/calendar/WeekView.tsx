import React from 'react';
import { Reminder } from '@/hooks/useReminders';

interface WeekViewProps {
  currentDate: Date;
  reminders: Reminder[];
  onDateClick: (date: Date) => void;
  getRemindersForDate: (date: Date) => Reminder[];
  getReminderColor: (reminder: Reminder) => string;
}

const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

const WeekView: React.FC<WeekViewProps> = ({ currentDate, onDateClick, getRemindersForDate, getReminderColor }) => {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - (currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1));

  const daysInWeek = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  return (
    <div className="p-2 sm:p-4">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day, index) => (
          <div key={day} className="p-2 text-center text-xs sm:text-sm font-medium text-muted-foreground">
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{daysInWeek[index].getDate()}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {daysInWeek.map((date, index) => {
          const dayReminders = getRemindersForDate(date);
          const isToday = date.toDateString() === new Date().toDateString();
          return (
            <div
              key={index}
              className={`min-h-[100px] sm:min-h-[150px] p-1 border border-border bg-card ${isToday ? 'ring-2 ring-primary' : ''} cursor-pointer`}
              onClick={() => onDateClick(date)}
            >
              <div className={`text-xs sm:text-sm font-medium mb-1 ${isToday ? 'text-primary' : 'text-foreground'}`}>
                <span className="hidden sm:inline">{date.getDate()}</span>
              </div>
              <div className="space-y-1">
                {dayReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className={`text-xs px-1 py-0.5 rounded text-center truncate ${getReminderColor(reminder)}`}
                    title={reminder.titulo}
                  >
                    <span className="hidden sm:inline">
                      {reminder.val_time && <span className="font-bold mr-1">{reminder.val_time}</span>}
                    </span>
                    {reminder.titulo}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekView;