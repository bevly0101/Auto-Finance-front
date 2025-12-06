import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import TypewriterText from "@/components/ui/TypewriterText";

interface ThirteenthScreenProps {
    onNext: () => void;
}

const ThirteenthScreen: React.FC<ThirteenthScreenProps> = ({ onNext }) => {
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowNotification(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#09090b] overflow-hidden">
            {/* Background Gradient Effect - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0091ff]/40 to-transparent pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-6">

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-black text-white text-left w-full leading-tight mb-12">
                    <TypewriterText text="O Auto Finance" speed={50} />
                    <br />
                    <TypewriterText text="monitora suas" delay={800} speed={50} />
                    <br />
                    <TypewriterText text="metas..." delay={1600} speed={50} />
                </h1>

                {/* Chat Notification Bubble */}
                <div className={`w-full mb-16 transition-all duration-700 ease-out transform ${showNotification ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="bg-[#1f2937] text-white p-4 rounded-2xl rounded-tl-none shadow-md relative">
                        <p className="text-sm md:text-base text-gray-100">
                            Você já atingiu 50% do limite de R$300 com uber esse mês! fique de olho👀
                        </p>
                        <p className="text-[10px] text-gray-400 text-right mt-1">14:00</p>
                    </div>
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

export default ThirteenthScreen;
