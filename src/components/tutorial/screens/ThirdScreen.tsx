import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import TypewriterText from "@/components/ui/TypewriterText";

interface ThirdScreenProps {
    onNext: () => void;
}

const ThirdScreen: React.FC<ThirdScreenProps> = ({ onNext }) => {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#09090b] overflow-hidden">
            {/* Background Gradient Effect - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0091ff]/40 to-transparent pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-start text-left px-8 max-w-lg w-full">

                {/* Main Title */}
                <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-10">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                        <TypewriterText text="Basta" speed={50} />
                        <span className="underline decoration-white underline-offset-8">
                            <TypewriterText text="dizer" delay={300} speed={50} />
                        </span>
                        <TypewriterText text="o" delay={550} speed={50} />
                    </div>
                    <div className="block mt-1">
                        <TypewriterText text="que" delay={650} speed={50} />
                    </div>
                    <div className="block mt-1">
                        <TypewriterText text="movimentou." delay={800} speed={50} />
                    </div>
                    <div className="block mt-1">
                        <TypewriterText text="E nós cuidamos" delay={1350} speed={50} />
                    </div>
                    <div className="block mt-1">
                        <TypewriterText text="do resto." delay={2050} speed={50} />
                    </div>
                </h1>

                {/* Subtitle Section */}
                <div className="mb-12 space-y-1">
                    <p className="text-4xl font-light text-white">
                        <TypewriterText text="Você" delay={2500} speed={50} />
                    </p>
                    <p className="text-4xl font-light italic text-white">
                        <TypewriterText text="literalmente diz" delay={2700} speed={50} />
                    </p>
                    <p className="text-2xl font-light text-gray-400 pt-2">
                        <TypewriterText text="para o Auto Finance" delay={3500} speed={50} />
                    </p>
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

export default ThirdScreen;
