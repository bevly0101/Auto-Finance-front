import React, { useState } from 'react';
import { ChevronDown, Phone } from 'lucide-react';

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  onPhoneChange: (value: string) => void; // Adicionado
  phoneValue: string; // Adicionado
  className?: string;
}

const countries = [
  { code: '+55', name: 'Brasil', flag: '🇧🇷' },
  { code: '+1', name: 'Estados Unidos', flag: '🇺🇸' },
  { code: '+44', name: 'Reino Unido', flag: '🇬🇧' },
  { code: '+33', name: 'França', flag: '🇫🇷' },
  { code: '+49', name: 'Alemanha', flag: '🇩🇪' },
  { code: '+34', name: 'Espanha', flag: '🇪🇸' },
  { code: '+39', name: 'Itália', flag: '🇮🇹' },
  { code: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: '+52', name: 'México', flag: '🇲🇽' },
];

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange, onPhoneChange, phoneValue, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCountry = countries.find(country => country.code === value) || countries[0];

  const handleCountrySelect = (countryCode: string) => {
    onChange(countryCode);
    setIsOpen(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value.replace(/\D/g, ''); // Remove non-digits
    onPhoneChange(phone);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex">
        {/* Country Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="
              flex items-center gap-2 px-4 py-4
              bg-gray-100 border border-r-0 border-gray-300
              rounded-l-2xl hover:bg-gray-50
              dark:bg-gray-700 dark:border-gray-600 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              transition-colors duration-200
            "
          >
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{selectedCountry.code}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="
              absolute top-full left-0 mt-1 w-64 
              bg-white border border-gray-300 rounded-xl shadow-lg
              dark:bg-gray-800 dark:border-gray-600
              z-50 max-h-60 overflow-y-auto
            ">
              {countries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country.code)}
                  className="
                    w-full flex items-center gap-3 px-4 py-3 
                    hover:bg-gray-50 dark:hover:bg-gray-700 text-left
                    first:rounded-t-xl last:rounded-b-xl
                    transition-colors duration-200
                  "
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{country.code}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone Input */}
        <div className="flex-1 relative">
          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            placeholder="Número whatsapp"
            value={phoneValue}
            onChange={handlePhoneChange}
            className="
              w-full pl-12 pr-4 py-4
              bg-gray-100 border border-gray-300 rounded-r-2xl
              placeholder-gray-500 text-gray-900
              dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              transition-all duration-200
            "
          />
        </div>
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default CountrySelect;

