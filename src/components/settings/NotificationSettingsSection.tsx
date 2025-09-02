import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Monitor } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface NotificationSettings {
  email: {
    marketing: boolean;
    security: boolean;
    updates: boolean;
    comments: boolean;
  };
  push: {
    messages: boolean;
    mentions: boolean;
    followers: boolean;
    updates: boolean;
  };
  desktop: {
    enabled: boolean;
    sound: boolean;
  };
}

const NotificationSettingsSection: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      marketing: true,
      security: true,
      updates: false,
      comments: true,
    },
    push: {
      messages: true,
      mentions: true,
      followers: false,
      updates: true,
    },
    desktop: {
      enabled: true,
      sound: false,
    },
  });

  const handleToggle = (category: keyof NotificationSettings, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting as keyof typeof prev[typeof category]],
      },
    }));
  };

  const handleSave = () => {
    //console.log('Salvando configurações de notificação:', settings);
    // Aqui você implementaria a lógica de salvamento
  };

  const ToggleSwitch: React.FC<{ 
    checked: boolean; 
    onChange: () => void; 
    label: string;
    description?: string;
  }> = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-b-0">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-foreground">{label}</h4>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Notificações por Email */}
      <div className="mb-6 pb-6 border-b border-border">
        <div className="flex items-center mb-4">
          <Mail className="w-5 h-5 text-primary mr-3" />
          <h2 className="text-xl font-semibold text-foreground">Notificações por Email</h2>
        </div>
        <div className="space-y-1">
          <ToggleSwitch
            checked={settings.email.marketing}
            onChange={() => handleToggle('email', 'marketing')}
            label="Emails de Marketing"
            description="Receba emails sobre novos recursos, dicas e ofertas especiais"
          />
        </div>
      </div>

    </div>
  );
};

export default NotificationSettingsSection;
