import Card from "../components/ui/card";

const Features = () => {
  return (
    <section className="container pb-10 relative overflow-hidden">
        {/* Fundo Decorativo para o Efeito Glass */}
        <div className="absolute -top-20 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-20 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10" />

      {/* Layout de Colunas Independentes */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-6">

        {/* Coluna 1 */}
        <div className="flex flex-col gap-5 md:gap-6 w-full md:w-1/3">
          <Card
            tone="pink"
            title="Como funciona?"
            desc="O AutoFinance é seu assistente financeiro digital. Através do WhatsApp ou do painel, você registra despesas, entradas, recebe alertas, vê relatórios e extratos de recibos. Simples, rápido, automatizado."
            img="/lovable-uploads/a6b664e7-e257-4c27-ac5f-5e28024be117.png"
            alt="Mockup do AutoFinance demonstrando registro de gastos por voz"
            imgPosition={{ bottom: -95, right: -54, width: 100, rotate: 0 }}
            cardStyle={{ minHeight: 558, borderRadius: 22, width: 100 }}
          />
          <Card
            tone="dark"
            title="🔒 Total privacidade."
            desc="Seus dados são só seus. Tudo é criptografado, seguro e armazenado com as melhores práticas de proteção."
            cardStyle={{ minHeight: 200, borderRadius: 22, width: 100 }}
          />
        </div>

        {/* Coluna 2 */}
        <div className="flex flex-col gap-5 md:gap-6 w-full md:w-1/3">
          <Card
            tone="lilac"
            title="📸 Mande fotos e áudios para anotar seus gastos."
            desc="Não quer digitar? Sem problemas. Tire uma foto de um recibo ou fale por áudio: 'Comprei gasolina por R$ 50 reais'. O AutoFinance interpreta, extrai os dados e registra tudo."
            img="/lovable-uploads/e7d9f13f-80b7-40fc-a58e-e11be1a4d5c0.png"
            alt="Mockup interpretando recibo no WhatsApp"
            imgPosition={{ bottom: -1, right: 64, width: 68, rotate: 0 }}
            cardStyle={{ minHeight: 558, borderRadius: 22, width: 100 }}
          />
          <Card
            tone="dark"
            title="📊 Gráficos interativos"
            desc="Visualize seus gastos com clareza. Compare meses, entenda padrões e tome decisões melhores."
            cardStyle={{ minHeight: 200, borderRadius: 22, width: 100 }}
          />
        </div>

        {/* Coluna 3 */}
        <div className="flex flex-col gap-5 md:gap-6 w-full md:w-1/3">
          <Card
            tone="purple"
            title="Tenha resumos diários pelo WhatsApp e Painel de controle"
            desc="Receba um resumo diário ou semanal com seu saldo, gastos e entradas. Tudo direto no WhatsApp!"
            img="/lovable-uploads/5a6e3df2-491e-4fc6-9d77-875d11518a38.png"
            alt="Mockup com resumo financeiro diário do AutoFinance"
            imgPosition={{ bottom: 25, right: 84, width: 87, rotate: 8 }}
            cardStyle={{ minHeight: 781, borderRadius: 22, width: 100 }}
          />
        </div>

      </div>
    </section>
  );
};

export default Features;
