import React from 'react';
import { Lock, Brain } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Mais do que um simples diário.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card 1 - Pink */}
          <div className="bg-secondary rounded-2xl p-8 text-secondary-foreground relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-4">Seus pensamentos—claros e tangíveis.</h3>
            <p className="text-secondary-foreground/80 mb-6">
              Inúmeros pensamentos passam pela sua mente todos os dias. O AutoFinance cria um espaço para organizar, 
              capturar e entender verdadeiramente eles—sem pressão ou perfeccionismo.
            </p>
            <div className="relative">
              <div className="w-56 h-[400px] bg-gray-900 rounded-[2rem] p-2 mx-auto">
                <div className="w-full h-full bg-gray-800 rounded-[1.5rem] p-4">
                  <div className="text-white text-lg font-semibold mb-4">A vida é um instante</div>
                  <div className="text-gray-300 text-sm space-y-2">
                    <p>Deveríamos aproveitar cada momento conscientemente, pois esse exato momento é a vida. Não temos mais nada.</p>
                    <p>Muitas vezes sonhamos com o futuro, em relaxar na praia e aproveitar a vida.</p>
                  </div>
                </div>
              </div>
              {/* Koala character */}
              <div className="absolute -bottom-4 -right-4">
                <div className="w-12 h-16 bg-purple-300 rounded-full relative">
                  <div className="absolute top-1 left-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                  <div className="absolute top-1 right-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-pink-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Card 2 - Dark Blue */}
          <div className="bg-muted rounded-2xl p-8 text-muted-foreground">
            <h3 className="text-2xl font-bold mb-4">90% dos nossos pensamentos são esquecidos em uma semana.</h3>
            <p className="text-muted-foreground/80 mb-6">
              A maioria das ideias, experiências e encontros desaparecem rapidamente da memória. O AutoFinance ajuda você 
              a redescobri-los com reflexões diárias e semanais inteligentes.
            </p>
          </div>

          {/* Feature Card 3 - Purple */}
          <div className="bg-primary rounded-2xl p-8 text-primary-foreground relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-4">Uma visão clara de suas anotações</h3>
            <p className="text-primary-foreground/80 mb-6">
              A vida pode parecer caótica, mas o AutoFinance traz clareza. Acompanhe facilmente todas as suas anotações—
              organizadas e estruturadas.
            </p>
            <div className="relative">
              <div className="w-56 h-[400px] bg-gray-900 rounded-[2rem] p-2 mx-auto">
                <div className="w-full h-full bg-gray-800 rounded-[1.5rem] p-4">
                  <div className="text-yellow-400 text-lg font-bold mb-4">AutoFinance</div>
                  <div className="text-white text-sm mb-2">Hoje</div>
                  <div className="bg-gray-700 rounded-lg p-3 mb-4">
                    <div className="text-white font-medium">Gratidão no dia a dia</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Hoje eu parei e simplesmente senti conscientemente...
                    </div>
                  </div>
                  <div className="text-white text-sm mb-2">Ontem</div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="text-white font-medium">O valor do silêncio</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Em um mundo cheio de estímulos, o silêncio tornou-se quase incomum...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Card 4 - Light Blue */}
          <div className="bg-info rounded-2xl p-8 text-info-foreground">
            <h3 className="text-2xl font-bold mb-4">Pensamentos são muitas vezes confusos e desestruturados.</h3>
            <p className="text-info-foreground/80 mb-6">
              Nossos mapas mentais permitem que você capture ideias assim que elas surgem—espontaneamente, criativamente 
              e livremente. Organize seu pensamento e obtenha um entendimento mais profundo.
            </p>
            <div className="relative">
              <div className="w-56 h-[400px] bg-gray-900 rounded-[2rem] p-2 mx-auto">
                <div className="w-full h-full bg-gray-800 rounded-[1.5rem] p-4">
                  <div className="text-white text-lg font-semibold mb-4">Gratidão pelos pequenos</div>
                  <div className="text-gray-300 text-sm mb-4">Pausa consciente</div>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-xs">Contar e valorizar</div>
                    <div className="text-gray-400 text-xs">Pequenas coisas do dia a dia</div>
                    <div className="text-gray-400 text-xs">Uma boa conversa</div>
                    <div className="text-gray-400 text-xs">Ar fresco</div>
                    <div className="text-gray-400 text-xs">Um momento de paz</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Card 5 - Dark */}
          <div className="bg-card rounded-2xl p-8 text-card-foreground">
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-yellow-400 mr-3" />
              <h3 className="text-2xl font-bold">Privado e seguro.</h3>
            </div>
            <p className="text-muted-foreground">
              Seus pensamentos, ideias e experiências são somente seus. Respeitamos sua privacidade e 
              armazenamos seus dados criptografados em servidores localizados na UE.
            </p>
          </div>

          {/* Feature Card 6 - Dark with Brain icon */}
          <div className="bg-muted rounded-2xl p-8 text-muted-foreground">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-pink-400 mr-3" />
              <h3 className="text-2xl font-bold">Suporte inteligente</h3>
            </div>
            <p className="text-muted-foreground/80">
              Com o Second Brain e outros recursos inteligentes, você obterá insights reais—para uma 
              autorreflexão mais profunda e clareza mental.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;