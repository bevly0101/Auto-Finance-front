import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseclient';
import { Reminder } from '@/hooks/useReminders';

interface ReminderDetailsPopupProps {
  reminder: Reminder | null;
  onClose: () => void;
  onSave: () => void;
}

const ReminderDetailsPopup: React.FC<ReminderDetailsPopupProps> = ({ reminder, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Reminder>>({});
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (reminder) {
      setFormData(reminder);
      setIsChanged(false);
    }
  }, [reminder]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      if (isChanged) {
        if (window.confirm('Você tem alterações não salvas. Deseja realmente fechar?')) {
          onClose();
        }
      } else {
        onClose();
      }
    }
  };

  const handleDelete = async () => {
    if (!formData.id) return;

    if (window.confirm('Tem certeza que deseja apagar este lembrete?')) {
      const { error } = await supabase
        .from('lembretes_pagamento')
        .delete()
        .eq('id', formData.id);

      if (error) {
        console.error('Error deleting reminder:', error);
      } else {
        onSave();
        onClose();
      }
    }
  };

  if (!reminder) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const { checked } = e.target as HTMLInputElement;

    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? checked : value,
    }));
    setIsChanged(true);
  };

  const handleSave = async () => {
    if (!formData.id) return;

    const { error } = await supabase
      .from('lembretes_pagamento')
      .update({
        titulo: formData.titulo,
        valor: formData.valor,
        descricao: formData.descricao,
        data_vencimento: formData.data_vencimento,
        val_time: formData.val_time,
        recorrente: formData.recorrente,
      })
      .eq('id', formData.id);

    if (error) {
      console.error('Error updating reminder:', error);
    } else {
      onSave();
      onClose();
    }
  };

  const isSaveDisabled = !isChanged || !formData.titulo || !formData.data_vencimento;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOutsideClick}>
      <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Detalhes do Lembrete</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Título</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Valor</label>
            <input
              type="number"
              name="valor"
              value={formData.valor || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Data de Vencimento</label>
            <input
              type="date"
              name="data_vencimento"
              value={formData.data_vencimento ? new Date(formData.data_vencimento).toISOString().split('T')[0] : ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Hora</label>
            <input
              type="time"
              name="val_time"
              value={formData.val_time || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="recorrente"
              checked={formData.recorrente || false}
              onChange={handleChange}
              className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label className="ml-2 block text-sm text-muted-foreground">Recorrente</label>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 transition-colors"
          >
            Deletar
          </button>
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-muted text-muted-foreground rounded-md shadow-sm hover:bg-muted/80 transition-colors"
            >
              Fechar
            </button>
            <button
              onClick={handleSave}
              disabled={isSaveDisabled}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:bg-primary/90 transition-colors disabled:bg-gray-400"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderDetailsPopup;