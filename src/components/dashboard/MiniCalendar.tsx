import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, Filter, RotateCcw } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, subDays, startOfYear, endOfYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface MiniCalendarProps {
  dateRange?: DateRange;
  onDateRangeSelect?: (range: DateRange) => void;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ dateRange, onDateRangeSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  // Preencher o calendário com dias da semana anterior/posterior para completar a grade
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - monthStart.getDay());
  
  const endDate = new Date(monthEnd);
  endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()));
  
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const handleDateClick = (date: Date) => {
    if (!onDateRangeSelect) return;

    if (!dateRange?.start || (dateRange.start && dateRange.end)) {
      // Começar nova seleção
      onDateRangeSelect({ start: date, end: null });
    } else if (dateRange.start && !dateRange.end) {
      // Completar seleção
      if (date >= dateRange.start) {
        onDateRangeSelect({ start: dateRange.start, end: date });
      } else {
        onDateRangeSelect({ start: date, end: dateRange.start });
      }
    }
  };

  const handleQuickFilter = (type: 'today' | '7days' | 'thisMonth' | 'thisYear') => {
    if (!onDateRangeSelect) return;

    const today = new Date();
    switch (type) {
      case 'today':
        onDateRangeSelect({ start: today, end: today });
        break;
      case '7days':
        onDateRangeSelect({ start: subDays(today, 7), end: today });
        break;
      case 'thisMonth':
        onDateRangeSelect({ start: startOfMonth(today), end: endOfMonth(today) });
        break;
      case 'thisYear':
        onDateRangeSelect({ start: startOfYear(today), end: endOfYear(today) });
        break;
    }
  };

  const handleClearFilter = () => {
    if (onDateRangeSelect) {
      onDateRangeSelect({ start: null, end: null });
    }
  };

  const isDateInRange = (date: Date) => {
    if (!dateRange?.start) return false;
    if (!dateRange.end) return isSameDay(date, dateRange.start);
    return date >= dateRange.start && date <= dateRange.end;
  };

  const isDateRangeStart = (date: Date) => {
    return dateRange?.start && isSameDay(date, dateRange.start);
  };

  const isDateRangeEnd = (date: Date) => {
    return dateRange?.end && isSameDay(date, dateRange.end);
  };

  const getDayClassName = (date: Date) => {
    let className = "h-8 w-8 text-xs flex items-center justify-center rounded-md cursor-pointer transition-all duration-200";
    
    if (!isSameMonth(date, currentMonth)) {
      className += " text-muted-foreground opacity-30";
    } else if (isDateRangeStart(date) || isDateRangeEnd(date)) {
      className += " bg-primary text-primary-foreground font-semibold";
    } else if (isDateInRange(date)) {
      className += " bg-primary/20 text-primary font-medium";
    } else if (isToday(date)) {
      className += " bg-accent text-accent-foreground font-semibold border-2 border-primary";
    } else {
      className += " text-foreground hover:bg-accent hover:text-accent-foreground";
    }
    
    return className;
  };

  const formatDateRange = () => {
    if (!dateRange?.start) return "Selecione um período";
    if (!dateRange.end) return `${format(dateRange.start, 'dd/MM/yy', { locale: ptBR })} - ...`;
    return `${format(dateRange.start, 'dd/MM/yy', { locale: ptBR })} - ${format(dateRange.end, 'dd/MM/yy', { locale: ptBR })}`;
  };

  return (
    <Card className="w-80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPreviousMonth}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-lg font-semibold">
            {format(currentMonth, 'MMMM', { locale: ptBR })}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNextMonth}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Quick filters */}
        <div className="flex gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickFilter('today')}
            className="text-xs"
          >
            Hoje
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickFilter('7days')}
            className="text-xs"
          >
            7 dias atrás
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickFilter('thisMonth')}
            className="text-xs flex-1"
          >
            Esse mês
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickFilter('thisYear')}
            className="text-xs flex-1"
          >
            Esse ano
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-3 pt-0">
        {/* Selected date range display */}
        <div className="mb-3 p-2 bg-muted rounded-md flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{formatDateRange()}</span>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
            <div key={day} className="h-6 flex items-center justify-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-3">
          {calendarDays.map((date, index) => (
            <div
              key={index}
              className={getDayClassName(date)}
              onClick={() => handleDateClick(date)}
            >
              {format(date, 'd')}
            </div>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            className="flex-1 text-xs"
            disabled={!dateRange?.start}
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Atualizar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilter}
            className="flex-1 text-xs"
          >
            <Filter className="h-3 w-3 mr-1" />
            Limpar filtro
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MiniCalendar;