import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ReminderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reminder: {
    titulo: string;
    valor?: number;
    descricao: string;
    data_vencimento: string;
    val_time?: string;
    recorrente: boolean;
  }) => void;
}

const ReminderForm: React.FC<ReminderFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    valor: '',
    descricao: '',
    data_vencimento: '',
    val_time: '',
    recorrente: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.data_vencimento) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }

    const reminderData = {
      titulo: formData.titulo,
      valor: formData.valor ? parseFloat(formData.valor) : undefined,
      descricao: formData.descricao,
      data_vencimento: formData.data_vencimento,
      val_time: formData.val_time,
      recorrente: formData.recorrente
    };

    onSubmit(reminderData);
    
    // Reset form
    setFormData({
      titulo: '',
      valor: '',
      descricao: '',
      data_vencimento: '',
      val_time: '',
      recorrente: false
    });
    
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Criar Lembrete</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nome do Lembrete */}
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-foreground mb-1">
              Nome do Lembrete *
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground"
              placeholder="Digite o nome do lembrete"
              required
            />
          </div>

          {/* Valor (Opcional) */}
          <div>
            <label htmlFor="valor" className="block text-sm font-medium text-foreground mb-1">
              Valor (Opcional)
            </label>
            <input
              type="number"
              id="valor"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground"
              placeholder="R$ 0,00"
            />
          </div>

          {/* Descrição */}
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-foreground mb-1">
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-input text-foreground"
              placeholder="Digite uma descrição para o lembrete"
            />
          </div>

          {/* Data de Vencimento */}
          <div>
            <label htmlFor="data_vencimento" className="block text-sm font-medium text-foreground mb-1">
              Data de Vencimento *
            </label>
            <input
              type="date"
              id="data_vencimento"
              name="data_vencimento"
              value={formData.data_vencimento}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground"
              required
            />
          </div>

          {/* Hora de Vencimento (Novo Campo) */}
          <div>
            <label htmlFor="val_time" className="block text-sm font-medium text-foreground mb-1">
              Hora de Vencimento (Opcional)
            </label>
            <input
              type="time"
              id="val_time"
              name="val_time"
              value={formData.val_time}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground"
            />
          </div>

          {/* Recorrente */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="recorrente"
              name="recorrente"
              checked={formData.recorrente}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary border-border rounded bg-input"
            />
            <label htmlFor="recorrente" className="ml-2 block text-sm text-foreground">
              Este lembrete é recorrente
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-foreground bg-muted hover:bg-accent rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors"
            >
              Criar Lembrete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReminderForm;

