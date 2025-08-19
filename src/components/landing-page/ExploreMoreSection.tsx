import React from 'react';

const ExploreMoreSection: React.FC = () => {
  return (
    <section className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="bg-primary rounded-2xl p-8">
              <div className="w-64 h-[500px] bg-gray-900 rounded-[2.5rem] p-2 mx-auto shadow-2xl">
                <div className="w-full h-full bg-gray-800 rounded-[2rem] p-4">
                  <div className="text-white text-lg font-semibold mb-4">Ablenkung Insta</div>
                  <div className="text-gray-300 text-sm space-y-3">
                    <p>Heute hab ich mich wieder in Instagram verloren, stundenlang nur gescrollt, ohne wirklich etwas mitzubekommen. Alles fühlt sich leer an, ich fühl mich leer und gleichzeitig überfördert.</p>
                    <p>Ich weiß es so viel machen, bin nur so viel genervt, fühlen - aber jetzt sitz ich hier und weiß nicht mal, wo ich anfangen soll.</p>
                  </div>
                  {/* Keyboard mockup */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-gray-700 rounded-lg p-2">
                      <div className="grid grid-cols-10 gap-1 text-xs">
                        <div className="bg-gray-600 text-white text-center py-1 rounded">q</div>
                        <div className="bg-gray-600 text-white text-center py-1 rounded">w</div>
                        <div className="bg-gray-600 text-white text-center py-1 rounded">e</div>
                        <div className="bg-gray-600 text-white text-center py-1 rounded">r</div>
                        <div className="bg-gray-600 text-white text-center py-1 rounded">t</div>
                        <div className="bg-gray-600 text-white text-center py-1 rounded">z</div>
                        <div className="bg-gray-600 text-white text-center py-1 rounded">u</div>
                        <div className="bg-gray-600 text-white text-center py-1 rounded">i</div>
                        <div className="bg-gray-600 text-white text-center py-1 rounded">o</div>
                        <div className="bg-gray-600 text-white text-center py-1 rounded">p</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Sentindo-se travado? Clique para se libertar.
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              O Explore Mais oferece uma pergunta inteligente e pessoal exatamente quando você precisa — quando está travado, 
              sem saber o que escrever, pronto para aprofundar ou apenas desejando uma nova perspectiva. Porque, às vezes, 
              a pergunta certa te leva mais longe do que qualquer resposta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreMoreSection;