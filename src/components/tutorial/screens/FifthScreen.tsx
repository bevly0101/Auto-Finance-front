import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import BlurReveal from "@/components/ui/BlurReveal";
import TypewriterText from "@/components/ui/TypewriterText";

interface FifthScreenProps {
    onNext: () => void;
}

const FifthScreen: React.FC<FifthScreenProps> = ({ onNext }) => {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#09090b] overflow-hidden">
            {/* Background Gradient Effect - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0091ff]/40 to-transparent pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-start text-left px-8 max-w-lg w-full">

                {/* Title */}
                <h1 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-12">
                    <TypewriterText text="Separamos" speed={50} />
                    <br />
                    <TypewriterText text="tudo por ..." delay={500} speed={50} />
                </h1>

                {/* List Items */}
                <div className="space-y-4 mb-16">
                    <BlurReveal delay={500}>
                        <div className="flex items-center text-3xl md:text-4xl font-light italic text-white">
                            <span className="mr-4 text-white">•</span>
                            categoria
                        </div>
                    </BlurReveal>

                    <BlurReveal delay={1000}>
                        <div className="flex items-center text-3xl md:text-4xl font-light italic text-white">
                            <span className="mr-4 text-white">•</span>
                            Banco utilizado
                        </div>
                    </BlurReveal>

                    <BlurReveal delay={1500}>
                        <div className="flex items-center text-3xl md:text-4xl font-light italic text-white">
                            <span className="mr-4 text-white">•</span>
                            Gasto / Receita
                        </div>
                    </BlurReveal>

                    <BlurReveal delay={2000}>
                        <div className="flex items-center text-3xl md:text-4xl font-light italic text-white">
                            <span className="mr-4 text-white">•</span>
                            Data da Transação
                        </div>
                    </BlurReveal>
                </div>

                {/* Button */}
                <Button
                    onClick={onNext}
                    className="group relative bg-[#00aaff] hover:bg-[#008ecc] text-white text-xl font-bold py-6 px-10 rounded-xl shadow-[0_0_20px_rgba(0,170,255,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,170,255,0.6)] w-full sm:w-auto"
                >
                    próximo
                    <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>

            </div>
        </div>
    );
};

export default FifthScreen;
