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

const TestimonialCard = ({ author, text }: { author: string; text: string }) => (
  <div className="flex flex-col flex-shrink-0 w-72 h-48 bg-gradient-to-b from-gray-900/60 to-transparent backdrop-blur-sm rounded-xl p-6 mx-5">
    <p className="font-semibold text-white mb-4">{author}</p>
    <p className="text-gray-300 leading-relaxed">{text}</p>
  </div>
);

const TestimonialsTicker = () => {
  return (
    <section className="relative overflow-y-hidden overflow-x-hidden py-16 sm:py-24 bg-background">
      <div className="container mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          O que nossos clientes dizem
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Histórias reais de quem transformou a vida financeira com o AutoFinance.
        </p>
      </div>
      <div className="w-full overflow-x-hidden">
        <Marquee pauseOnHover={false} gradient={true} gradientColor="#030712" gradientWidth={150}>
          {longTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TestimonialsTicker;
