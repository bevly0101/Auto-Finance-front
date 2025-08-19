import { CheckCircle2 } from "lucide-react";

const SimpleIntelligent = () => {
  return (
    <section className="container relative py-10 md:py-14">
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
            className="mx-auto w-full max-w-[560px] md:max-w-[620px] h-auto drop-shadow-[0_0_40px_hsl(var(--brand)/0.45)]"
          />
        </aside>
      </div>
    </section>
  );
};

export default SimpleIntelligent;
