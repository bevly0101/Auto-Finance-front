import React from 'react';

const SecondMindSection: React.FC = () => {
  return (
    <section className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Segunda Mente – Sua segunda perspectiva.
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Seu diário revela mais do que você pensa. A Segunda Mente lê nas entrelinhas, 
              detecta padrões e reflete o que está realmente acontecendo—de forma empática, perspicaz 
              e como um igual. Quer ir mais fundo? Continue a conversa com sua segunda perspectiva, 
              diretamente no chat.
            </p>
          </div>
          <div className="relative">
            <div className="bg-secondary rounded-2xl p-8">
              <div className="w-64 h-[500px] bg-gray-900 rounded-[2.5rem] p-2 mx-auto shadow-2xl">
                <div className="w-full h-full bg-gray-800 rounded-[2rem] p-4">
                  <div className="text-white text-lg font-semibold mb-4">Ablenkung Insta</div>
                  <div className="text-gray-300 text-sm space-y-3">
                    <p>Heute hab ich mich wieder in Instagram verloren, stundenlang nur gescrollt, ohne wirklich etwas mitzubekommen. Alles fühlt sich leer an, ich fühl mich leer und gleichzeitig überfördert.</p>
                    <p>Ich weiß es so viel machen, bin nur so viel genervt, fühlen - aber jetzt sitz ich hier und weiß nicht mal, wo ich anfangen soll.</p>
                    <p>Vielleicht sollte ich das Handy an und wieder mehr lesen. Die Zeit ist weg und ich hatte so viel vor, jetzt ist es schon wieder so spät und ich komme nicht vorwärts.</p>
                    <p>Morgen. Gestern war's genauso. Ich bin ich mir nicht sicher. Man sollte zwei das man aufhören sollte, aber kommt man weg vom Handy.</p>
                    <p>Ich ich mir nicht sicher. Man sollte zwei das man aufhören sollte, aber kommt man weg vom Handy.</p>
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

export default SecondMindSection;