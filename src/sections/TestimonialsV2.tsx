import Marquee from "react-fast-marquee";

const testimonials = [
  {
    author: "Ana B.",
    text: "Finalmente uma forma simples de ver para onde meu dinheiro está indo. O app mudou minha vida financeira!",
  },
  {
    author: "Carlos S.",
    text: "Excelente para controle de gastos. A categorização automática por foto é simplesmente mágica. Recomendo!",
  },
  {
    author: "Juliana M.",
    text: "Amo os relatórios semanais no WhatsApp. Me mantém na linha sem que eu precise abrir uma planilha.",
  },
  {
    author: "Ricardo P.",
    text: "A melhor ferramenta de gestão financeira que já usei. Intuitiva, rápida e realmente eficaz.",
  },
  {
    author: "Fernanda L.",
    text: "Consegui economizar 20% a mais no primeiro mês de uso. Só tenho a agradecer!",
  },
  {
    author: "Lucas T.",
    text: "O design é limpo e o app é muito fácil de usar. Registrar um gasto por áudio é genial.",
  },
];

// Duplicamos a lista para garantir que o loop seja suave.
const longTestimonials = [...testimonials, ...testimonials];

const TestimonialCardV2 = ({ author, text }: { author: string; text: string }) => (
  <div className="flex flex-col overflow-y-hidden flex-shrink-0 w-72 h-48 bg-card dark:bg-gradient-to-b dark:from-gray-900/60 dark:to-transparent backdrop-blur-sm rounded-xl p-6 mx-5 border border-border">
    <p className="font-semibold text-foreground mb-4">{author}</p>
    <p className="text-muted-foreground leading-relaxed">{text}</p>
  </div>
);

const TestimonialsV2 = () => {
  return (
    <section className="relative py-8 sm:py-10 bg-background">
      <div className="w-full overflow-x-hidden">
        <Marquee pauseOnHover={false} gradient={true} gradientColor="#030712" gradientWidth={150}>
          {longTestimonials.map((testimonial, index) => (
            <TestimonialCardV2 key={index} {...testimonial} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TestimonialsV2;