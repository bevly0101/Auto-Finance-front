import React from 'react';

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, className = '' }) => {
  const calculateStrength = (password: string): { score: number; label: string; color: string } => {
    if (!password) return { score: 0, label: '', color: '' };

    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password)
    ];
    const score = checks.filter(Boolean).length;

    if (score <= 1) return { score, label: 'Fraca', color: 'bg-red-500' };
    if (score <= 3) return { score, label: 'Média', color: 'bg-yellow-500' };
    return { score, label: 'Forte', color: 'bg-green-500' };
  }; 
  const strength = calculateStrength(password);
  const percentage = (strength.score / 4) * 100;

  if (!password) return null;

  return (
    <div className={`mt-2 ${className}`}>
      {/* Barra de força */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Label da força */}
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-600">Força da senha:</span>
        <span className={`text-xs font-medium ${
          strength.score <= 2 ? 'text-red-600' : 
          strength.score <= 4 ? 'text-yellow-600' : 
          'text-green-600'
        }`}>
          {strength.label}
        </span>
      </div>

      {/* Critérios */}
      <div className="mt-2 space-y-1">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`} />
          <span className="text-xs text-gray-600">Pelo menos 8 caracteres</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`} />
          <span className="text-xs text-gray-600">Uma letra maiúscula</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`} />
          <span className="text-xs text-gray-600">Um número</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${/[^A-Za-z0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`} />
          <span className="text-xs text-gray-600">Um caractere especial</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;

