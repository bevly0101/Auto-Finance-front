import React from 'react';
import { Reminder } from '@/hooks/useReminders';

interface DayViewProps {
  currentDate: Date;
  reminders: Reminder[];
  onReminderClick: (reminder: Reminder) => void;
  getReminderColor: (reminder: Reminder) => string;
}

const DayView: React.FC<DayViewProps> = ({ currentDate, reminders, onReminderClick, getReminderColor }) => {
  const hours = Array.from({ length: 24 }).map((_, i) => i);
  const dayReminders = reminders.filter(reminder => {
    const reminderDate = new Date(reminder.data_vencimento);
    return reminderDate.toDateString() === currentDate.toDateString();
  }).sort((a, b) => {
    const timeA = a.val_time ? parseInt(a.val_time.replace(':', '')) : 0;
    const timeB = b.val_time ? parseInt(b.val_time.replace(':', '')) : 0;
    return timeA - timeB;
  });

  return (
    <div className="p-2 sm:p-4">
      <div className="grid grid-cols-[auto,1fr] gap-1">
        {hours.map((hour) => {
          const hourReminders = dayReminders.filter(r => {
            if (!r.val_time) return hour === 5; // Default to 5 AM
            const [h] = r.val_time.split(':').map(Number);
            return h === hour;
          });
          return (
            <React.Fragment key={hour}>
              <div className="text-right pr-2 text-xs sm:text-sm text-muted-foreground">
                {`${hour.toString().padStart(2, '0')}:00`}
              </div>
              <div className="min-h-[30px] sm:min-h-[40px] border-b border-border p-1">
                <div className="space-y-1">
                  {hourReminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className={`text-xs px-1 py-0.5 rounded truncate ${getReminderColor(reminder)} cursor-pointer`}
                      title={reminder.titulo}
                      onClick={() => onReminderClick(reminder)}
                    >
                      {reminder.val_time && <span className="font-bold mr-1">{reminder.val_time}</span>}
                      {reminder.titulo}
                    </div>
                  ))}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default DayView;