import React from 'react';

export const VerifyCodeToast: React.FC = () => (
  <div>
    <div className="flex items-center">
      <svg
        className="w-6 h-6 mr-2 text-green-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.908 6.161l-1.317 4.816 4.917-1.286z" />
      </svg>
      <strong>Código Enviado</strong>
    </div>
    <div className="flex items-center mt-2">
      <span className="animate-pulse mr-2">🟢</span>
      <span>
        Enviamos um código de verificação para o seu WhatsApp.
      </span>
    </div>
  </div>
);