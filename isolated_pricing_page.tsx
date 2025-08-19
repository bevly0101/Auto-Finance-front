/*
  Arquivo: isolated_pricing_page.tsx
  Descrição: Este arquivo contém o componente da página de planos (Pricing) isolado do projeto original.
             Ele foi adaptado para facilitar a integração em um projeto React/TypeScript existente.

  Anotações para Integração:

  1. Dependências:
     - Certifique-se de que as seguintes dependências estejam instaladas em seu projeto:
       - `react`
       - `react-helmet-async` (para gerenciamento de meta tags e SEO)
       - `@/components/pricing/PricingCard` (Este é um componente customizado do projeto original.
                                           Você precisará recriá-lo ou adaptar um componente similar em seu projeto.
                                           A estrutura básica do PricingCard é:
                                           interface PricingCardProps {
                                             title: string;
                                             price: string;
                                             period?: string;
                                             description: string;
                                             features: string[];
                                             ctaText: string;
                                             popular?: boolean;
                                           }
                                           Você pode encontrar a implementação original em `src/components/pricing/PricingCard.tsx` no projeto fornecido.)

  2. Estilização:
     - O componente utiliza classes do Tailwind CSS. Certifique-se de que o Tailwind CSS esteja configurado em seu projeto.
     - As classes `bg-background`, `text-muted-foreground`, `font-display`, `text-gradient`, `animate-fade-in`
       são específicas do projeto original. Você pode precisar definir essas classes em seu `tailwind.config.js`
       ou substituí-las por classes equivalentes em seu sistema de design.
       - `bg-background`: Cor de fundo principal (provavelmente um tom escuro).
       - `text-muted-foreground`: Cor de texto secundária (provavelmente um cinza claro).
       - `font-display`: Uma fonte personalizada para títulos.
       - `text-gradient`: Um gradiente de cor para o texto (ex: roxo para verde).
       - `animate-fade-in`: Uma animação de fade-in.

  3. Roteamento e SEO (Helmet):
     - O `Helmet` é usado para definir o título da página, meta descrição e canonical URL.
       Se seu projeto já possui uma solução de roteamento e SEO (ex: React Router DOM, Next.js, etc.),
       você pode remover ou adaptar o uso do `Helmet`.
     - A tag `<link rel="canonical" href="/planos" />` deve ser ajustada para a URL real da sua página de planos.

  4. Dados JSON-LD:
     - O objeto `jsonLd` é para SEO e fornece dados estruturados dos planos para motores de busca.
       Você pode manter ou remover esta seção dependendo das suas necessidades de SEO.

  5. Estrutura do Componente:
     - O componente `Pricing` é um `React.FC` (Functional Component).
     - Ele renderiza uma seção principal (`<main>`) com um cabeçalho e um grid de `PricingCard`s.
     - Adapte a estrutura conforme a necessidade do seu layout.

  Exemplo de uso em seu projeto (após adaptar as dependências e estilos):

  ```typescript jsx
  import React from 'react';
  import PricingPage from './isolated_pricing_page'; // Ajuste o caminho conforme necessário

  function App() {
    return (
      <div>
        {/* Outros componentes do seu aplicativo */}
        <PricingPage />
        {/* Outros componentes do seu aplicativo */}
      </div>
    );
  }

  export default App;
  ```
*/

import React from "react";
// Importe ou recrie o componente PricingCard em seu projeto
// Exemplo: import PricingCard from "./PricingCard";
// Ou defina uma interface e um componente dummy para testes:
interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, period, description, features, ctaText, popular }) => {
  return (
    <div className={`flex flex-col p-6 rounded-lg shadow-lg ${popular ? 'border-2 border-purple-500' : 'bg-gray-800'}`}>
      {popular && <span className="text-xs font-semibold text-purple-500 mb-2">POPULAR</span>}
      <h3 className="mb-2 text-2xl font-bold text-white">{title}</h3>
      <div className="text-4xl font-extrabold text-green-400 mb-4">{price}{period && <span className="text-xl font-medium text-gray-400">{period}</span>}</div>
      <p className="text-gray-300 mb-6">{description}</p>
      <ul className="mb-6 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-200 mb-2">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button className="w-full py-3 px-6 rounded-md text-white font-semibold bg-purple-600 hover:bg-purple-700 transition-colors duration-300">
        {ctaText}
      </button>
    </div>
  );
};

// Importe Helmet se você precisar de gerenciamento de meta tags
// import { Helmet } from "react-helmet-async";

const Pricing: React.FC = () => {
  // Remova ou adapte o Helmet se seu projeto já tiver uma solução de SEO
  /*
  const title = "Planos AutoFinance — Escolha o plano ideal";
  const description =
    "Escolha o plano ideal para você. Desbloqueie recursos avançados e controle suas finanças com clareza.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Product",
        name: "Básico",
        description: "Para quem está começando.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
      },
      {
        "@type": "Product",
        name: "Standard",
        description: "Mais controle das finanças pessoais.",
        offers: { "@type": "Offer", price: "19.90", priceCurrency: "BRL" },
      },
      {
        "@type": "Product",
        name: "Família",
        description: "Controle financeiro em família.",
        offers: { "@type": "Offer", price: "59.90", priceCurrency: "BRL" },
      },
    ],
  };
  */

  return (
    // Certifique-se de que as classes Tailwind CSS como `min-h-screen`, `w-full`, `bg-background`,
    // `container`, `py-16`, `md:py-24`, `text-center`, `max-w-3xl`, `mx-auto`, `mb-12`,
    // `animate-fade-in`, `font-display`, `text-3xl`, `md:text-5xl`, `font-bold`,
    // `tracking-tight`, `text-gradient`, `mt-4`, `text-muted-foreground`,
    // `grid`, `gap-6`, `md:gap-8`, `md:grid-cols-3` estejam configuradas em seu projeto.
    <main className="min-h-screen w-full bg-background">
      {/* Remova ou adapte o Helmet se seu projeto já tiver uma solução de SEO */}
      {/*
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="/planos" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      */}

      <section className="container py-16 md:py-24">
        <header className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-gradient">
            <span className="text-gradient">Escolha o plano ideal para você</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Desbloqueie recursos avançados de gerenciamento financeiro e obtenha
            insights personalizados para controlar melhor seu dinheiro.
          </p>
        </header>

        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          <PricingCard
            title="Básico"
            price="Grátis"
            period=""
            description="Ideal para quem está começando a controlar suas finanças."
            features={[
              "Registro de despesas diárias",
              "Resumos semanais",
              "Até 5 categorias de gastos",
            ]}
            ctaText="Experimentar 7 dias Grátis"
          />

          <PricingCard
            title="Standard"
            price="R$19,90"
            description="Para quem quer mais controle das finanças pessoais."
            features={[
              "Todas as funcionalidades do Básico",
              "Lembretes personalizados",
              "Até 20 categorias de gastos",
              "Análises de consumo detalhadas",
            ]}
            ctaText="Assinar Agora"
            popular
          />

          <PricingCard
            title="Família"
            price="R$59,90"
            description="Para famílias que querem controlar finanças juntos."
            features={[
              "Todas as funcionalidades do Premium",
              "Até 5 usuários",
              "Controle parental",
              "Metas familiares compartilhadas",
              "Consultoria financeira familiar",
            ]}
            ctaText="Assinar Agora"
          />
        </div>
      </section>
    </main>
  );
};

export default Pricing;


