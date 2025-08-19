import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: LucideIcon;
  name: string; // Adicionado
  error?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
  name, // Adicionado
  error,
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          name={name} // Adicionado
          id={name} // Adicionado para o label
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            w-full pl-12 pr-4 py-4
            bg-gray-50
            border-0
            rounded-2xl
            text-gray-900
            placeholder-gray-500
            dark:bg-gray-700
            dark:text-white
            dark:placeholder-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:bg-white
            transition-all duration-200
            ${error ? 'ring-2 ring-red-500 bg-red-50' : ''}
          `}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default InputField;

