import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import TypewriterLoop from "@/components/ui/TypewriterLoop";
import TypewriterText from "@/components/ui/TypewriterText";

interface EighthScreenProps {
    onNext: () => void;
}

const EighthScreen: React.FC<EighthScreenProps> = ({ onNext }) => {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#09090b] overflow-hidden">
            {/* Background Gradient Effect - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0091ff]/40 to-transparent pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-lg w-full">

                {/* Title */}
                <h1 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-12">
                    <span className="block mb-4">
                        <TypewriterText text="Você pode Consultar" speed={50} />
                    </span>
                    <TypewriterLoop
                        words={["o Mês", "a semana", "O ano", "os últimos meses"]}
                        className="text-[#00aaff]"
                    />
                </h1>

                {/* Subtitle */}
                <p className="text-4xl font-light italic text-white mb-16">
                    Basta dizer pro<br />
                    Auto Finance
                </p>

                {/* Button */}
                <Button
                    onClick={onNext}
                    className="group relative bg-[#00aaff] hover:bg-[#008ecc] text-white text-xl font-bold py-6 px-10 rounded-xl shadow-[0_0_20px_rgba(0,170,255,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,170,255,0.6)] w-full sm:w-auto"
                >
                    próximo
                    <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </div >
    );
};

export default EighthScreen;
