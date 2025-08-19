import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src="/logo_autofinance2%20(1).png" alt="Autofinance Logo" className="h-8 mb-4" />
            <p className="text-gray-400">
              O aplicativo de diário para clareza mental, insights profundos e reflexões que marcam.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Recursos</a></li>
              <li><a href="#" className="hover:text-white">Preços</a></li>
              <li><a href="#" className="hover:text-white">Download</a></li>
              <li><a href="#" className="hover:text-white">Atualizações</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-white">Sobre nós</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Carreiras</a></li>
              <li><a href="/about" className="hover:text-white">Contato</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
              <li><a href="/privacy" className="hover:text-white">Privacidade</a></li>
              <li><a href="/terms" className="hover:text-white">Termos</a></li>
              <li><a href="#" className="hover:text-white">Política de Uso Justo</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 AutoFinance. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;