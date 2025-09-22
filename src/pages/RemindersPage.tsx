import React, { useState, useEffect } from 'react';
import SidebarV2 from "../components/SidebarV2/SidebarV2";
import HeaderPixelPerfect from '../components/HeaderPixelPerfect';
import CalendarComponent from '../components/CalendarComponent';
import ReminderForm from '../components/ReminderForm';
import ReminderFilters from '../components/ReminderFilters';
import ReminderDetailsPopup from '../components/ReminderDetailsPopup';
import { Plus } from 'lucide-react';
import { addReminder, Reminder as SupabaseReminder } from '../lib/supabaseclient';
import { useAuth } from '@/contexts/AuthContext';
import { useReminders, Reminder } from '@/hooks/useReminders';

const RemindersPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = useAuth();
  const { reminders, loading, error, fetchReminders } = useReminders();
  const [filteredReminders, setFilteredReminders] = useState<Reminder[]>([]);
  const [selectedView, setSelectedView] = useState<'Mês' | 'Semana' | 'Dia'>('Mês');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showRecurrent, setShowRecurrent] = useState(true);
  const [showNonRecurrent, setShowNonRecurrent] = useState(true);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    let tempReminders = reminders;
    if (showRecurrent && !showNonRecurrent) {
      tempReminders = reminders.filter(r => r.recorrente);
    } else if (!showRecurrent && showNonRecurrent) {
      tempReminders = reminders.filter(r => !r.recorrente);
    } else if (!showRecurrent && !showNonRecurrent) {
      tempReminders = [];
    }
    setFilteredReminders(tempReminders);
    //console.log("Filtered reminders:", tempReminders);
  }, [reminders, showRecurrent, showNonRecurrent]);

  //console.log("Selected view:", selectedView);

  const handleAddReminder = async (newReminder: Omit<SupabaseReminder, 'id' | 'user_id'>) => {
    if (!user) {
      console.error("Usuário não autenticado. Não é possível adicionar lembrete.");
      return;
    }
    const reminderWithUser = { ...newReminder, user_id: user.id };
    const added = await addReminder(reminderWithUser);
    if (added) {
      fetchReminders();
    }
  };

  const upcomingReminders = filteredReminders
    .filter(r => {
      // Corrige o problema de fuso horário adicionando o T00:00:00 para tratar como local
      const reminderDate = new Date(r.data_vencimento + 'T00:00:00');
      const today = new Date();
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(today.getDate() + 30);
      return reminderDate >= today && reminderDate <= thirtyDaysFromNow;
    })
    .slice(0, 5);
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <SidebarV2 isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <HeaderPixelPerfect title="Lembretes" toggleSidebar={toggleSidebar} />
        
        {/* Page Content */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:bg-primary/90 transition-colors text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" /> Criar Lembrete
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2">
              <CalendarComponent
                reminders={filteredReminders}
                selectedView={selectedView}
                onViewChange={setSelectedView}
                onDateChange={setSelectedDate}
                onReminderClick={setSelectedReminder}
              />
            </div>
            <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              <div className="bg-card rounded-lg shadow-sm border border-border p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Próximos Lembretes</h3>
                <div className="space-y-2 sm:space-y-3">
                  {upcomingReminders.length > 0 ? (
                    upcomingReminders.map(reminder => (
                      <div key={reminder.id} className="flex items-center justify-between p-2 bg-muted rounded-md cursor-pointer" onClick={() => setSelectedReminder(reminder)}>
                        <span className="text-xs sm:text-sm font-medium text-foreground">{reminder.titulo}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(reminder.data_vencimento + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs sm:text-sm text-muted-foreground text-center py-3 sm:py-4">Nenhum lembrete próximo.</p>
                  )}
                </div>
              </div>
              <ReminderFilters
                showRecurrent={showRecurrent}
                showNonRecurrent={showNonRecurrent}
                onRecurrentChange={setShowRecurrent}
                onNonRecurrentChange={setShowNonRecurrent}
              />
            </div>
          </div>
        </div>
      </div>
      <ReminderForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddReminder}
      />
      <ReminderDetailsPopup
        reminder={selectedReminder}
        onClose={() => setSelectedReminder(null)}
        onSave={() => {
          fetchReminders();
          setSelectedReminder(null);
        }}
      />
    </div>
  );
};

export default RemindersPage;