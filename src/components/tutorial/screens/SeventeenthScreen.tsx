import React, { useEffect } from 'react';
import TypewriterText from "@/components/ui/TypewriterText";

interface SeventeenthScreenProps {
    onNext: () => void;
}

const SeventeenthScreen: React.FC<SeventeenthScreenProps> = ({ onNext }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onNext();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onNext]);

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#09090b] overflow-hidden">
            {/* Background Gradient Effect - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0091ff]/40 to-transparent pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-lg w-full">

                {/* Main Title */}
                <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                    <TypewriterText text="Estamos" speed={50} />
                    <br />
                    <TypewriterText text="preparando" delay={500} speed={50} />
                    <br />
                    <TypewriterText text="tudo para" delay={1100} speed={50} />
                    <br />
                    <TypewriterText text="Você..." delay={1700} speed={50} />
                </h1>

            </div>
        </div>
    );
};

export default SeventeenthScreen;
