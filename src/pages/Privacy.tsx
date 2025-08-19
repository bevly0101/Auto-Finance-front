import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-gray-400 hover:text-white">
            <ArrowLeft className="mr-1" size={20} />
            <span>Voltar para início</span>
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto bg-transparent p-8 rounded-xl text-gray-300">
          <h1 className="text-3xl font-bold mb-4 text-white">Política de Privacidade da Autofinance</h1>
          <p className="text-gray-400 mb-8">Última atualização: 18 de agosto de 2025</p>
          
          <p className="mb-6">A Autofinance (“nós”, “nosso”, “Autofinance”) valoriza sua privacidade e está comprometida em proteger seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, armazenamos, compartilhamos e protegemos informações dos usuários (“você”, “seu”) ao utilizar nossa plataforma, aplicativo, website e serviços associados.</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Dados que coletamos</h2>
            <p className="mb-4">Podemos coletar diferentes tipos de dados sobre você, dependendo do serviço utilizado:</p>
            <h3 className="text-xl font-semibold text-white mb-2">1.1 Dados fornecidos pelo usuário</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Nome completo, endereço de e-mail, telefone, CPF/CNPJ (quando necessário).</li>
              <li>Informações financeiras, como contas bancárias, cartões, histórico de transações, gastos e receitas.</li>
              <li>Informações de login, senhas e autenticação (incluindo OAuth ou login via terceiros).</li>
              <li>Preferências de uso do serviço, histórico de interações e configurações pessoais.</li>
            </ul>
            <h3 className="text-xl font-semibold text-white mb-2">1.2 Dados coletados automaticamente</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Dados de dispositivo (modelo, sistema operacional, endereço IP, identificadores únicos).</li>
              <li>Informações de navegação (páginas visitadas, tempo de uso, cliques, interações).</li>
              <li>Cookies, pixels, web beacons e tecnologias semelhantes para rastrear comportamento e preferências.</li>
            </ul>
            <h3 className="text-xl font-semibold text-white mb-2">1.3 Dados coletados de terceiros</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Dados de integração com serviços como WhatsApp, gateways de pagamento (Stripe, PayPal), redes sociais e APIs de análise.</li>
              <li>Dados de fontes públicas ou parceiros de marketing, quando aplicável, para fins de personalização e segurança.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Como usamos seus dados</h2>
            <p className="mb-4">Podemos usar seus dados para os seguintes propósitos:</p>
            <h3 className="text-xl font-semibold text-white mb-2">2.1 Funcionalidade do serviço</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Criar, gerenciar e autenticar sua conta.</li>
              <li>Processar transações financeiras e controlar seu histórico de gastos.</li>
              <li>Enviar notificações sobre suas atividades, alertas de segurança e lembretes de serviços.</li>
              <li>Automatizar tarefas financeiras, como relatórios e classificações de gastos.</li>
            </ul>
            <h3 className="text-xl font-semibold text-white mb-2">2.2 Personalização e análise</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Analisar padrões de uso para melhorar nossa plataforma.</li>
              <li>Fornecer recomendações personalizadas de finanças e investimentos.</li>
              <li>Testar novos recursos ou serviços antes de disponibilizá-los publicamente.</li>
            </ul>
            <h3 className="text-xl font-semibold text-white mb-2">2.3 Marketing e comunicação</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Enviar comunicações promocionais, newsletters e ofertas personalizadas, quando autorizado.</li>
              <li>Criar campanhas segmentadas com base em comportamento, preferências e dados demográficos.</li>
            </ul>
            <h3 className="text-xl font-semibold text-white mb-2">2.4 Segurança e conformidade</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Monitorar atividades suspeitas e prevenir fraudes.</li>
              <li>Cumprir exigências legais, regulatórias e fiscais.</li>
              <li>Realizar auditorias internas e controles de qualidade.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Compartilhamento de dados</h2>
            <p className="mb-4">Não vendemos seus dados pessoais. Contudo, podemos compartilhá-los nas seguintes situações:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provedores de serviço: empresas que processam pagamentos, hospedagem, análises, envio de e-mails e suporte técnico.</li>
              <li>Parceiros comerciais: apenas quando autorizado para fins de marketing, análises ou integração de serviços.</li>
              <li>Obrigação legal: quando exigido por lei, regulamentação ou ordem judicial.</li>
              <li>Proteção de direitos: para prevenir fraude, abuso ou atividade ilegal em nossa plataforma.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Armazenamento e segurança</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Seus dados são armazenados em servidores seguros, com criptografia em trânsito (HTTPS/TLS) e em repouso (AES-256).</li>
              <li>Acesso restrito a funcionários autorizados e monitoramento constante de segurança.</li>
              <li>Mantemos backups periódicos para garantir integridade e recuperação de dados em caso de falhas.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Retenção de dados</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Mantemos seus dados enquanto sua conta estiver ativa ou conforme necessário para fornecer serviços.</li>
              <li>Dados desnecessários ou antigos são anonimizados ou excluídos periodicamente, respeitando obrigações legais.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Direitos do usuário</h2>
            <p className="mb-4">Você tem direito a:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Acessar, corrigir ou atualizar seus dados pessoais.</li>
              <li>Solicitar a exclusão de sua conta e informações pessoais, quando permitido por lei.</li>
              <li>Retirar consentimento para marketing e comunicações promocionais.</li>
              <li>Solicitar a portabilidade dos seus dados, quando aplicável.</li>
            </ul>
            <p className="mt-4">Para exercer esses direitos, entre em contato pelo e-mail contato@autosfinance.com.br.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Uso de cookies e tecnologias semelhantes</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Utilizamos cookies para melhorar a experiência do usuário, lembrar preferências, rastrear interações e realizar análises estatísticas.</li>
              <li>Cookies podem ser desativados nas configurações do navegador, mas algumas funcionalidades podem ficar limitadas.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">8. Integração com terceiros</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>WhatsApp: mensagens automatizadas, alertas e notificações financeiras.</li>
              <li>Gateways de pagamento: processamento de pagamentos e verificação de transações.</li>
              <li>APIs de análise: Google Analytics, Mixpanel ou ferramentas semelhantes para entender uso da plataforma.</li>
            </ul>
            <p className="mt-4">Todos os dados compartilhados são criptografados e limitados ao mínimo necessário.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Alterações nesta política</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Podemos atualizar esta política periodicamente.</li>
              <li>A versão mais recente estará sempre disponível no nosso site e aplicativo.</li>
              <li>Alterações significativas serão comunicadas via e-mail ou notificação na plataforma.</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
