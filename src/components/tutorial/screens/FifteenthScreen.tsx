import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import TypewriterText from "@/components/ui/TypewriterText";

interface FifteenthScreenProps {
    onNext: () => void;
}

const FifteenthScreen: React.FC<FifteenthScreenProps> = ({ onNext }) => {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#09090b] overflow-hidden">
            {/* Background Gradient Effect - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0091ff]/40 to-transparent pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-start text-left px-8 max-w-lg w-full">

                {/* Main Title */}
                <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-12">
                    <TypewriterText text="Separamos" speed={50} />
                    <br />
                    <TypewriterText text="suas" delay={500} speed={50} />
                    <br />
                    <TypewriterText text="transações por" delay={800} speed={50} />
                    <br />
                    <TypewriterText text="bancos" delay={1500} speed={50} />
                </h1>

                {/* Subtitle */}
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-24">
                    <TypewriterText text="Mas também" delay={2000} speed={50} />
                    <br />
                    <TypewriterText text="pode nomear" delay={2600} speed={50} />
                    <br />
                    <TypewriterText text="sua conta" delay={3200} speed={50} />
                    <br />
                    <TypewriterText text="como quiser" delay={3700} speed={50} />
                </h2>

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

export default FifteenthScreen;
