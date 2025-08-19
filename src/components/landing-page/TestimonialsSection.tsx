import React from 'react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Benjamin, Vorarlberg",
      verified: true,
      text: "Este é exatamente o software que eu estava procurando. Adoro entender meus sonhos e os sinais que eles me dão. Acredito firmemente que meus sonhos querem me dizer algo",
      highlight: "O AutoFinance faz isso muito bem e resume perfeitamente.",
      continuation: "Ele lê nas entrelinhas e me dá insights que eu nunca imaginei. A interface é super legal."
    },
    {
      name: "Anônimo",
      verified: true,
      text: "Acho incrível, uau, obrigado! Sinto-me aliviado. Tudo se encaixa na minha realidade. Obrigado, obrigado, obrigado!"
    },
    {
      name: "Anônimo",
      verified: true,
      text: "Minhas expectativas foram mais do que superadas."
    },
    {
      name: "Anônimo",
      verified: true,
      text: "Estou realmente surpreso, esta é a melhor IA. OBRIGADO, continuem assim!"
    },
    {
      name: "Sophie, Frankfurt",
      verified: true,
      text: "Fiquei surpresa com o quão intuitivo e fácil de usar este site é. A análise de IA dos meus sonhos não foi apenas precisa, mas também muito perspicaz. Através do chat, pude explorar mais meus sonhos, o que me abriu novos insights. Um ótimo serviço que com certeza usarei novamente."
    },
    {
      name: "Anônimo",
      verified: true,
      text: "Análise muito boa, ressoa comigo."
    },
    {
      name: "Anônimo",
      verified: true,
      text: "Funcionou melhor do que o esperado, tudo faz 100% sentido."
    },
    {
      name: "Anônimo",
      verified: true,
      text: "A análise dos sonhos me ajudou muito. Agora entendo por que tenho esses sonhos e quão profundamente o tema está enraizado em mim. É incrível ver que até meu subconsciente me ajuda e me dá sinais."
    },
    {
      name: "Anônimo",
      verified: true,
      text: "A interpretação do sonho foi muito boa e me deu clareza sobre minha situação de vida."
    },
    {
      name: "Anônimo",
      verified: true,
      text: "Incrível, isso é muito legal! É uma pena que você só pode usar de graça uma vez por mês, mas é algo realmente incrível. Muito legal!"
    },
    {
      name: "Anônimo",
      verified: true,
      text: "Uma análise muito precisa do meu sonho, que também faz muito sentido para mim. Cada detalhe que descrevi foi captado e entendido exatamente como eu queria",
      highlight: "No geral, estou impressionado com a primeira impressão deste site,",
      continuation: "o quão bem funcionou."
    },
    {
      name: "Anônimo",
      verified: true,
      text: "Uma análise plausível, benevolente e orientada para o meu crescimento pessoal.",
      highlight: "Fiquei positivamente surpreso por haver também recomendações de ação e exercícios de mindfulness!"
    },
    {
      name: "Anônimo",
      verified: true,
      text: "Interpretação muito boa do meu sonho! A melhor interpretação de sonhos! Muito obrigado."
    },
    {
      name: "Anônimo",
      verified: true,
      text: "Foi perfeito.",
      highlight: "Não há mais nada que precise ser mudado.",
      continuation: "Obrigado."
    },
    {
      name: "Anônimo",
      verified: true,
      text: "Tudo é tão detalhado e aparentemente muito confiável. Eu amei! 😊"
    },
    {
      name: "Anônimo",
      verified: true,
      text: "Uau, tão detalhado e com sugestões úteis 😊."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Experiências e Avaliações <span className="text-primary">dos nossos usuários</span>
          </h2>
          <p className="text-xl text-muted-foreground">Leia sobre as experiências e resultados de outros usuários.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card rounded-lg p-6 text-card-foreground">
              <div className="flex items-center mb-4">
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                {testimonial.verified && (
                  <span className="ml-2 text-xs bg-success text-success-foreground px-2 py-1 rounded">
                    Usuário Verificado
                  </span>
                )}
              </div>
              <div className="text-muted-foreground text-sm leading-relaxed">
                {testimonial.text}
                {testimonial.highlight && (
                  <span className="bg-primary text-primary-foreground px-1 rounded">
                    {testimonial.highlight}
                  </span>
                )}
                {testimonial.continuation && (
                  <span> {testimonial.continuation}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;