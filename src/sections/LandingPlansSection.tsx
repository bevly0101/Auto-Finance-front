import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { useAuth } from '@/contexts/AuthContext';

// Componente PricingCard
interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
  onCtaClick: () => void;
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
  isFree?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, period, description, features, ctaText, popular, onCtaClick, billingCycle, setBillingCycle, isFree }) => {
  return (
    <div className={`flex flex-col p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 ${popular ? 'border-2 border-primary bg-card' : 'bg-card border border-border'}`}>
      {popular && <span className="text-xs font-semibold text-primary mb-2 self-start bg-primary/10 px-3 py-1 rounded-full">POPULAR</span>}
      <h3 className="mb-2 text-2xl font-bold text-foreground">{title}</h3>
      <div className="text-4xl font-extrabold text-foreground mb-4">{price}{period && <span className="text-xl font-medium text-muted-foreground">{period}</span>}</div>
      <p className="text-muted-foreground mb-6 h-12">{description}</p>
      
      {!isFree && (
        <div className="flex items-center justify-center space-x-4 my-4 md:hidden">
          <Label htmlFor={`billing-cycle-${title}`} className={billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}>Mensal</Label>
          <Switch
            id={`billing-cycle-${title}`}
            checked={billingCycle === 'yearly'}
            onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
          />
          <Label htmlFor={`billing-cycle-${title}`} className={billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}>Anual</Label>
        </div>
      )}

      <ul className="mb-8 flex-grow space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-foreground/90">
            <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button onClick={onCtaClick} className={`w-full py-3 ${popular ? '' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
        {ctaText}
      </Button>
    </div>
  );
};

const LandingPlansSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Usar o hook de autenticação
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const paymentLinks = {
    premium: {
      monthly: "https://buy.stripe.com/bJe3cwb2O9LGctF1NK9sk09",
      yearly: "https://buy.stripe.com/fZu4gA7QCf6065h1NK9sk0a",
    },
    family: {
      monthly: "https://buy.stripe.com/8x25kEfj4ga4gJV4ZW9sk07",
      yearly: "https://buy.stripe.com/4gM5kE2wif6065h4ZW9sk08",
    },
  };

  const handleSubscribe = (planId: 'premium' | 'family' | 'basic') => {
    if (planId === 'basic') {
      navigate('/signup');
      return;
    }

    const targetUrl = `/choose-payment/${planId}/${billingCycle}`;

    if (user) {
      // Usuário está logado, redireciona para a página de escolha de pagamento
      navigate(targetUrl);
    } else {
      // Usuário não está logado, salva a URL de escolha de pagamento e redireciona para o cadastro
      sessionStorage.setItem('postLoginRedirect', targetUrl);
      navigate('/signup');
    }
  };

  const premiumFeatures = [
    "Registro de compromissos e afazeres",
    "Registro de gastos e receitas",
    "Transações recorrentes",
    "Pergunte o que quiser saber",
    "Lembretes ilimitados",
    "Painel para acompanhamento e relatórios",
    "Conecte mais pessoas a sua conta",
    "Receba resumo diário do seu dia",
    "Categorias ilimitadas",
  ];

  const plansData = [
    {
      id: 'basic',
      title: "Teste Grátis",
      price: { monthly: "Grátis" },
      description: "7 dias de acesso a todas as funcionalidades Premium.",
      features: premiumFeatures,
      ctaText: "Começar Teste",
    },
    {
      id: 'premium',
      title: "Premium",
      price: { monthly: "R$19,90", yearly: "R$214,97" },
      period: { monthly: "/mês", yearly: "/ano" },
      description: "Para quem quer mais controle das finanças pessoais.",
      features: premiumFeatures,
      ctaText: "Assinar Agora",
      popular: true,
    },
    {
      id: 'family',
      title: "Família",
      price: { monthly: "R$59,90", yearly: "R$647,97" },
      period: { monthly: "/mês", yearly: "/ano" },
      description: "Para famílias que querem controlar finanças juntos.",
      features: [
        "Todas as funcionalidades do Premium",
        "Até 5 usuários",
        "Controle parental",
        "Metas familiares compartilhadas",
      ],
      ctaText: "Assinar Agora",
    },
  ];

  return (
    <div className="text-center max-w-7xl mx-auto mt-12 animate-fade-in">
      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
        <span className="text-gradient">Escolha o plano ideal para você</span>
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">
        Desbloqueie recursos avançados de gerenciamento financeiro e obtenha
        insights personalizados para controlar melhor seu dinheiro.
      </p>
      <div className="hidden md:flex items-center justify-center space-x-4 mt-8 mb-12">
        <Label htmlFor="billing-cycle-cta" className={billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}>Mensal</Label>
        <Switch
          id="billing-cycle-cta"
          checked={billingCycle === 'yearly'}
          onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
        />
        <Label htmlFor="billing-cycle-cta" className={billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}>Anual</Label>
      </div>
      <div className="grid gap-6 md:gap-8 md:grid-cols-3">
        {plansData.map((plan) => (
          <PricingCard
            key={plan.id}
            title={plan.title}
            price={plan.price[billingCycle] || plan.price['monthly']}
            period={plan.period ? plan.period[billingCycle] : undefined}
            description={plan.description}
            features={plan.features}
            ctaText={plan.ctaText}
            popular={plan.popular}
            onCtaClick={() => handleSubscribe(plan.id as 'premium' | 'family' | 'basic')}
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
            isFree={plan.id === 'basic'}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPlansSection;