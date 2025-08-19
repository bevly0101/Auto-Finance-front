import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom'; // Importar o Link
import { CheckCircle2 } from 'lucide-react';
import Marquee from "react-fast-marquee";
import { Helmet } from 'react-helmet-async';
import { LOGO_URL, FEATURE_IMAGES, CTA_TEXT, SEO } from './landing/constants';
import TestimonialsTicker from '../sections/TestimonialsTicker';

// From landing_page/src/hooks/useInViewOnce.ts
export function useInViewOnce<T extends HTMLElement = HTMLElement>(options: IntersectionObserverInit = { threshold: 0.2 }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return; // already triggered

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      });
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [inView, options]);

  return { ref, inView } as const;
}


// From landing_page/src/sections/Hero.tsx
const Logo = () => (
  <img
    src={LOGO_URL}
    alt="AutoFinance logo"
    width={180}
    height={36}
    className="h-8 md:h-9 w-auto"
    loading="eager"
    decoding="async"
  />
);

const Hero = () => {
  const { ref: titleRef, inView: titleIn } = useInViewOnce();
  const { ref: descRef, inView: descIn } = useInViewOnce();
  const { ref: ctaRef, inView: ctaIn } = useInViewOnce();
  const { ref: loginRef, inView: loginIn } = useInViewOnce();

  return (
    <header className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-glow-radial" aria-hidden />
      <nav className="container flex items-center justify-between py-6">
        <a href="#" className="story-link"><Logo /></a>
        <div className="flex items-center gap-5 md:gap-6 text-sm md:text-base text-muted-foreground">
          <a href="#planos" className="hover-scale">Planos</a>
          <a href="#cadastro" className="hover-scale">Cadastre-se</a>
          {/* Login com efeito + tamanhos responsivos */}
          <Button asChild variant="hero" size="sm" className={`rounded-full md:hidden ${loginIn ? "animate-fade-in" : "opacity-0"}`}>
            <a ref={loginRef as any} href="#login" className="hover-scale">Login</a>
          </Button>
          <Button asChild variant="hero" size="lg" className={`rounded-full hidden md:inline-flex ${loginIn ? "animate-fade-in" : "opacity-0"}`}>
            <a href="#login" className="hover-scale">Login</a>
          </Button>
        </div>
      </nav>

      <section className="container pt-8 pb-16 text-center">
        
        <h1
          ref={titleRef as any}
          className={`mx-auto max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl ${titleIn ? "animate-fade-in" : "opacity-0"}`}
        >
          Organize suas finanças de forma
          <br />
          <span className="block mt-2">Simples, Inteligente e</span>
          <span className="block mt-2 bg-gradient-to-r from-brand to-brand-2 bg-clip-text text-transparent">Feita para você</span>
        </h1>
        <p
          ref={descRef as any}
          className={`mx-auto mt-4 max-w-2xl text-base md:text-lg text-muted-foreground ${descIn ? "animate-fade-in" : "opacity-0"}`}
        >
          Com a <strong>AutoFinance</strong>, você fala, e a mágica acontece: gastos anotados, organizados e analisados — tudo pelo <strong>WhatsApp</strong>.
        </p>
        <div className="mt-8 flex items-center justify-center">
          <Button
            ref={ctaRef as any}
            variant="hero"
            size="lg"
            className={`rounded-full px-8 ${ctaIn ? "animate-fade-in" : "opacity-0"}`}
          >
            {CTA_TEXT}
          </Button>
        </div>
      </section>
    </header>
  );
};


// From landing_page/src/sections/Features.tsx
const Card = ({
  title,
  desc,
  tone,
  img,
  alt,
}: {
  title: string;
  desc: string;
  tone: "pink" | "lilac" | "purple" | "dark";
  img?: string;
  alt?: string;
}) => {
  const toneClass = {
    pink: "bg-surface-pink",
    lilac: "bg-surface-indigo",
    purple: "bg-surface-purple",
    dark: "bg-card",
  }[tone];

  const sizeClass = {
    pink: "min-h-[320px] md:min-h-[440px]",
    lilac: "min-h-[320px] md:min-h-[440px]",
    purple: "min-h-[360px] md:min-h-[520px]",
    dark: "min-h-[280px] md:min-h-[340px]",
  }[tone];

  return (
    <article className={`${toneClass} ${sizeClass} relative overflow-hidden rounded-2xl p-6 md:p-8 text-foreground/95`}>
      <div className="max-w-prose">
        <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm md:text-base opacity-90 leading-relaxed">{desc}</p>
      </div>

      {img && alt && (
        <>
          {/* Versão desktop: mockup absoluto no canto inferior direito */}
          <img
            src={img}
            alt={alt}
            loading="lazy"
            width={900}
            height={1900}
            className="hidden md:block absolute bottom-2 right-2 w-[68%] max-h-[85%] object-contain pointer-events-none select-none drop-shadow-2xl"
          />
          {/* Versão mobile: mockup abaixo do texto */}
          <img
            src={img}
            alt={alt}
            loading="lazy"
            width={900}
            height={1900}
            className="block md:hidden mt-5 w-full object-contain pointer-events-none select-none drop-shadow-2xl"
          />
        </>
      )}
    </article>
  );
};

const Features = () => {
  return (
    <section className="container pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {/* Linha superior */}
        <Card
          tone="pink"
          title="Como funciona?"
          desc="O AutoFinance é seu assistente financeiro digital. Através do WhatsApp ou do painel, você registra despesas, entradas, recebe alertas, vê relatórios e extratos de recibos. Simples, rápido, automatizado."
          img={FEATURE_IMAGES.howItWorks}
          alt="Mockup do AutoFinance demonstrando registro de gastos por voz"
        />

        <Card
          tone="lilac"
          title="📸 Mande fotos e áudios para anotar seus gastos."
          desc="Não quer digitar? Sem problemas. Tire uma foto de um recibo ou fale por áudio: 'Comprei gasolina por R$ 50 reais'. O AutoFinance interpreta, extrai os dados e registra tudo."
          img={FEATURE_IMAGES.ocrAndAudio}
          alt="Mockup interpretando recibo no WhatsApp"
        />

        <Card
          tone="purple"
          title="Tenha resumos diários pelo WhatsApp e Painel de controle"
          desc="Receba um resumo diário ou semanal com seu saldo, gastos e entradas. Tudo direto no WhatsApp!"
          img={FEATURE_IMAGES.dailySummary}
          alt="Mockup com resumo financeiro diário do AutoFinance"
        />

        {/* Linha inferior */}
        <Card
          tone="dark"
          title="🔒 Total privacidade."
          desc="Seus dados são só seus. Tudo é criptografado, seguro e armazenado com as melhores práticas de proteção."
        />

        <Card
          tone="dark"
          title="📊 Gráficos interativos"
          desc="Visualize seus gastos com clareza. Compare meses, entenda padrões e tome decisões melhores."
        />

        {/* Espaçador da terceira coluna para manter o grid alinhado no desktop */}
        <div className="hidden md:block" />
      </div>
    </section>
  );
};

// From landing_page/src/sections/SimpleIntelligent.tsx
const SimpleIntelligent = () => {
  return (
    <section className="container relative py-20 md:py-28">
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 hidden md:block">
        <div className="h-[520px] w-[520px] rounded-full bg-glow-radial" aria-hidden />
      </div>

      <div className="grid items-center gap-10 md:grid-cols-2">
        <article>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-card/60 px-3 py-1 text-xs text-muted-foreground ring-1 ring-border">
            Already used by over 5000+ people
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Desenvolvido para ser simples e inteligente.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-prose">
            Você não precisa ser especialista em finanças. Só precisa de uma conversa.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Registrar gastos e entradas com texto, áudio ou até foto do recibo.",
              "Receber lembretes automáticos no WhatsApp antes dos vencimentos.",
              "Ver seu saldo e resumo mensal com clareza.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand" aria-hidden />
                <span className="text-sm md:text-base text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <aside className="relative">
          <img
            src="/lovable-uploads/6af0302e-3639-4808-9f57-091522f86b12.png"
            alt="Dois iPhones mostrando o painel de controle financeiro do AutoFinance"
            loading="lazy"
            width={1100}
            height={960}
            className="mx-auto max-w-[560px] md:max-w-[620px] h-auto drop-shadow-[0_0_40px_hsl(var(--brand)/0.45)]"
          />
        </aside>
      </div>
    </section>
  );
};

// From landing_page/src/sections/MidCTA.tsx
const MidCTA = () => (
  <section className="container text-center py-24">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-2">E isso é só o começo...</h2>
    <p className="text-muted-foreground max-w-xl mx-auto">
      Experimentar é melhor do que adiar de novo. Por que não tentar agora?
    </p>
    <div className="mt-8">
      <Button variant="hero" size="lg" className="rounded-full px-8">{CTA_TEXT}</Button>
    </div>
  </section>
);

// From landing_page/src/sections/Footer.tsx
const Footer = () => (
  <footer className="border-t border-border/60 py-10 mt-10">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} AutoFinance. Todos os direitos reservados.</p>
      <nav className="flex items-center gap-6">
        <Link to="/privacy" className="hover:text-foreground transition-colors">Privacidade</Link>
        <Link to="/terms" className="hover:text-foreground transition-colors">Termos</Link>
        <Link to="/about#contato" className="hover:text-foreground transition-colors">Contato</Link>
      </nav>
    </div>
  </footer>
);

// Main component to be exported
const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>AutoFinance - Simplifique sua Vida Financeira</title>
        <meta name="description" content={SEO.jsonLd.description} />
        <link rel="canonical" href="https://www.autofinance.com.br/" />
        <script type="application/ld+json">{JSON.stringify(SEO.jsonLd)}</script>
      </Helmet>
      <Hero />
      <Features />
      <TestimonialsTicker />
      <SimpleIntelligent />
      <MidCTA />
      <Footer />
    </main>
  );
};

export default Index;
