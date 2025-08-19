import React, { useState, useEffect } from 'react';
import { Mail, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const GeneralSettingsSection: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [originalData, setOriginalData] = useState(formData);

  useEffect(() => {
    if (user) {
      const userData = {
        firstName: user.user_metadata?.firstName || '',
        lastName: user.user_metadata?.lastName || '',
        email: user.email || '',
        phone: user.user_metadata?.telefone_whatsapp || '',
      };
      setFormData(userData);
      setOriginalData(userData);
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!user) return;

    const { data, error } = await supabase.auth.updateUser({
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        telefone_whatsapp: formData.phone,
      }
    });

    if (error) {
      console.error('Erro ao atualizar o usuário:', error);
    } else {
      console.log('Usuário atualizado com sucesso:', data);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">

      {/* Informações Pessoais */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Informações Pessoais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nome
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Apelido
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Endereço de Email
            </label>
            <input
              type="email"
              value={formData.email}
              readOnly
              className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Número de Telefone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Este número terá acesso ao AutoFinance no WhatsApp.
            </p>
          </div>
          
          
        </div>
        
      </div>

      {/* Botão Salvar */}
      <div className="flex flex-col md:flex-row md:justify-end gap-4 pt-6">
        <button className="w-full md:w-auto px-6 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
          Cancelar
        </button>
        <button
          onClick={handleSave}
          disabled={
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            JSON.stringify(formData) === JSON.stringify(originalData)
          }
          className="w-full md:w-auto px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

export default GeneralSettingsSection;
