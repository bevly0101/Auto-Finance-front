import React from 'react';

interface ReminderFiltersProps {
  showRecurrent: boolean;
  showNonRecurrent: boolean;
  onRecurrentChange: (checked: boolean) => void;
  onNonRecurrentChange: (checked: boolean) => void;
}

const ReminderFilters: React.FC<ReminderFiltersProps> = ({
  showRecurrent,
  showNonRecurrent,
  onRecurrentChange,
  onNonRecurrentChange
}) => {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtrar</h3>
      <div className="flex space-x-2">
        <button
          onClick={() => onRecurrentChange(!showRecurrent)}
          className={`w-full px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            showRecurrent
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Recorrente
        </button>
        <button
          onClick={() => onNonRecurrentChange(!showNonRecurrent)}
          className={`w-full px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            showNonRecurrent
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Não Recorrente
        </button>
      </div>
    </div>
  );
};

export default ReminderFilters;

