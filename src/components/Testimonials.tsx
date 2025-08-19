
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

const Testimonials = () => {
  return (
    <div className="py-16 bg-background">
      <Marquee pauseOnHover={false} gradient={true} gradientColor="#030712" gradientWidth={500}>
        {longTestimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </Marquee>
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-background z-10" />
    </div>
  );
};

export default Testimonials;
