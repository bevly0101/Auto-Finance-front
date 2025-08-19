import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Reminder } from '@/hooks/useReminders';
import MonthView from './calendar/MonthView';
import WeekView from './calendar/WeekView';
import DayView from './calendar/DayView';

interface CalendarComponentProps {
  reminders: Reminder[];
  selectedView: 'Mês' | 'Semana' | 'Dia';
  onViewChange: (view: 'Mês' | 'Semana' | 'Dia') => void;
  onDateChange: (date: Date) => void;
  onReminderClick: (reminder: Reminder) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  reminders,
  selectedView,
  onViewChange,
  onDateChange,
  onReminderClick
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
        onViewChange(mobile ? 'Dia' : 'Mês');
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial view
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, onViewChange]);

  const handleDateClick = (date: Date) => {
    setCurrentDate(date);
    onDateChange(date);
    onViewChange('Dia');
  };

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const navigatePeriod = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (selectedView === 'Mês') {
        newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      } else if (selectedView === 'Semana') {
        newDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
      } else if (selectedView === 'Dia') {
        newDate.setDate(prev.getDate() + (direction === 'next' ? 1 : -1));
      }
      onDateChange(newDate);
      return newDate;
    });
  };

  const getRemindersForDate = (date: Date) => {
    return reminders.filter(reminder => {
      const reminderDate = new Date(reminder.data_vencimento);
      return reminderDate.toDateString() === date.toDateString();
    }).sort((a, b) => {
      const timeA = a.val_time ? parseInt(a.val_time.replace(':', '')) : 0;
      const timeB = b.val_time ? parseInt(b.val_time.replace(':', '')) : 0;
      return timeA - timeB;
    });
  };

  const getReminderColor = (reminder: Reminder) => {
    const colors = [
      'bg-blue-500/20 text-blue-500 dark:text-blue-300',
      'bg-green-500/20 text-green-500 dark:text-green-300',
      'bg-orange-500/20 text-orange-500 dark:text-orange-300',
      'bg-purple-500/20 text-purple-500 dark:text-purple-300',
      'bg-gray-500/20 text-gray-500 dark:text-gray-300'
    ];
    return colors[reminder.titulo.length % colors.length];
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border">
      <div className="p-3 sm:p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => navigatePeriod('prev')}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <h2 className="text-base sm:text-lg font-semibold text-foreground text-center">
              {selectedView === 'Mês' && `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
              {selectedView === 'Semana' && `Semana de ${currentDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}`}
              {selectedView === 'Dia' && `${currentDate.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'short' })}`}
            </h2>
            <button
              onClick={() => navigatePeriod('next')}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          
          <div className="flex bg-muted rounded-lg p-1">
            {(['Mês', 'Semana', 'Dia'] as const).map((view) => (
              <button
                key={view}
                onClick={() => onViewChange(view)}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                  selectedView === view
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedView === 'Mês' && <MonthView currentDate={currentDate} onDateClick={handleDateClick} getRemindersForDate={getRemindersForDate} getReminderColor={getReminderColor} reminders={reminders} />}
      {selectedView === 'Semana' && <WeekView currentDate={currentDate} onDateClick={handleDateClick} getRemindersForDate={getRemindersForDate} getReminderColor={getReminderColor} reminders={reminders} />}
      {selectedView === 'Dia' && <DayView currentDate={currentDate} onReminderClick={onReminderClick} getReminderColor={getReminderColor} reminders={reminders} />}
    </div>
  );
};

export default CalendarComponent;