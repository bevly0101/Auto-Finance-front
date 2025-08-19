import React from 'react';
import { Download, Play } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Mente cheia? Página em branco.
              <br />
              Vamos começar.
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              O aplicativo de diário para clareza mental, insights profundos e reflexões que marcam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                <Download className="w-5 h-5" />
                <span>Baixar na App Store</span>
              </button>
              <button className="flex items-center space-x-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors">
                <Play className="w-5 h-5" />
                <span>Abra o Diário Agora</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-bold">A</span>
                </div>
                <div className="w-10 h-10 bg-secondary rounded-full border-2 border-background flex items-center justify-center">
                  <span className="text-secondary-foreground text-sm font-bold">B</span>
                </div>
                <div className="w-10 h-10 bg-destructive rounded-full border-2 border-background flex items-center justify-center">
                  <span className="text-destructive-foreground text-sm font-bold">C</span>
                </div>
              </div>
              <div className="text-muted-foreground">
                <span className="font-semibold">Já usado por</span>
                <br />
                <span className="text-sm">mais de 5000+ pessoas</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="flex justify-center items-center space-x-4">
              {/* Phone mockups */}
              <div className="relative">
                <div className="w-64 h-[500px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-gray-800 rounded-[2rem] p-4">
                    <div className="text-yellow-400 text-lg font-bold mb-4">AutoFinance</div>
                    <div className="space-y-3">
                      <div className="bg-blue-500 text-white p-3 rounded-lg text-sm">
                        Revisão semanal em foco
                      </div>
                      <div className="bg-purple-500 text-white p-3 rounded-lg text-sm">
                        Tempestades, barcos afundando e controle
                      </div>
                      <div className="bg-indigo-500 text-white p-3 rounded-lg text-sm">
                        Pensativo e em silêncio hoje
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="text-white text-lg font-semibold mb-2">Diário</div>
                      <div className="text-gray-300 text-sm">Hoje</div>
                      <div className="bg-gray-700 rounded-lg p-3 mt-2">
                        <div className="text-white font-medium">Gratidão no dia a dia</div>
                        <div className="text-gray-400 text-sm mt-1">
                          Hoje eu parei e simplesmente senti conscientemente...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Cute koala character */}
                <div className="absolute -bottom-8 -left-8">
                  <div className="w-16 h-20 bg-purple-300 rounded-full relative">
                    <div className="absolute top-2 left-3 w-2 h-2 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-2 right-3 w-2 h-2 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-800 rounded-full"></div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-pink-300 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-64 h-[500px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-gray-800 rounded-[2rem] p-4">
                    <div className="text-yellow-400 text-lg font-bold mb-4">AutoFinance</div>
                    <div className="text-white text-lg font-semibold mb-4">Linha da Memória</div>
                    <div className="text-gray-300 text-sm mb-4">
                      A Linha da Memória mantém vivos seus sentimentos, objetivos e pensamentos passados.
                    </div>
                    <div className="space-y-3">
                      <div className="bg-blue-500 text-white p-3 rounded-lg text-sm">
                        Revisão semanal em foco
                      </div>
                      <div className="bg-purple-500 text-white p-3 rounded-lg text-sm">
                        Tempestades, barcos afundando e controle
                      </div>
                      <div className="bg-indigo-500 text-white p-3 rounded-lg text-sm">
                        Pensativo e em silêncio hoje
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-64 h-[500px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-gray-800 rounded-[2rem] p-4">
                    <div className="text-yellow-400 text-lg font-bold mb-4">AutoFinance</div>
                    <div className="text-white text-lg font-semibold mb-4">A vida é um instante</div>
                    <div className="text-gray-300 text-sm">
                      Aproveitar cada momento conscientemente é o caminho. Meu momento é a vida...
                    </div>
                  </div>
                </div>
                {/* Another koala character */}
                <div className="absolute -bottom-8 -right-8">
                  <div className="w-16 h-20 bg-purple-300 rounded-full relative">
                    <div className="absolute top-2 left-3 w-2 h-2 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-2 right-3 w-2 h-2 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-800 rounded-full"></div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-pink-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;