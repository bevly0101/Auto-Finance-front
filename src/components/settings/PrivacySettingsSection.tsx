import React, { useState } from 'react';
import { Shield, Lock, Eye } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  showEmail: boolean;
  showPhone: boolean;
  allowMessages: boolean;
  twoFactorEnabled: boolean;
  dataCollection: boolean;
  analytics: boolean;
}

const PrivacySettingsSection: React.FC = () => {
  const [settings, setSettings] = useState<PrivacySettings>({
    profileVisibility: 'friends',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    twoFactorEnabled: true,
    dataCollection: false,
    analytics: true,
  });

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleSettingChange = (setting: keyof PrivacySettings, value: any) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handlePasswordChange = () => {
    console.log('Alterando senha:', passwordData);
    // Aqui você implementaria a lógica de mudança de senha
    setShowChangePassword(false);
    setPasswordData({ current: '', new: '', confirm: '' });
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

      {/* Segurança da Conta */}
      <div className="mb-6 pb-6 border-b border-border">
        <div className="flex items-center mb-4">
          <Shield className="w-5 h-5 text-primary mr-3" />
          <h2 className="text-xl font-semibold text-foreground">Segurança da Conta</h2>
        </div>
        
        {/* Seção de Senha */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <div>
              <h3 className="text-lg font-medium text-foreground">Senha</h3>
              <p className="text-sm text-muted-foreground">Última alteração há 3 meses</p>
            </div>
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Mudar Senha
            </button>
          </div>
          
          {showChangePassword && (
            <div className="bg-muted rounded-lg p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Senha Atual
                </label>
                <input
                  type="password"
                  value={passwordData.current}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nova Senha
                </label>
                <input
                  type="password"
                  value={passwordData.new}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handlePasswordChange}
                  className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Atualizar Senha
                </button>
                <button
                  onClick={() => setShowChangePassword(false)}
                  className="w-full sm:w-auto px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Autenticação de Dois Fatores */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between py-4 border-b border-border last:border-b-0">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-foreground">Autenticação de dois fatores</h4>
              <p className="text-sm text-muted-foreground mt-1">Adicione uma camada extra de segurança à sua conta</p>
            </div>
            <div className="flex items-center">
              <span className="text-xs font-semibold text-muted-foreground mr-2">EM BREVE</span>
              <Switch checked={false} disabled />
            </div>
          </div>
        </div>
      </div>

      {/* Dados e Privacidade */}
      <div>
        <div className="flex items-center mb-4">
          <Lock className="w-5 h-5 text-primary mr-3" />
          <h2 className="text-xl font-semibold text-foreground">Dados e Privacidade</h2>
        </div>
        <div className="space-y-1">
        </div>
        
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-lg font-medium text-foreground mb-4">Gerenciamento de Dados</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors opacity-50 cursor-not-allowed">
              <div className="font-medium text-foreground">Baixar seus dados <span className="text-xs font-semibold text-muted-foreground ml-2">EM BREVE</span></div>
              <div className="text-sm text-muted-foreground">Exporte seus dados, trasanções, fluxo de caixa como csv ou pdf.</div>
            </button>
            <button className="w-full text-left px-4 py-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
              <div className="font-medium text-red-600">Excluir sua conta</div>
              <div className="text-sm text-red-500">Exclua permanentemente sua conta e todos os dados</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettingsSection;
