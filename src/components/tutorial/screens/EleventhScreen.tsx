import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, Megaphone } from 'lucide-react';
import TypewriterText from "@/components/ui/TypewriterText";

interface EleventhScreenProps {
    onNext: () => void;
}

const EleventhScreen: React.FC<EleventhScreenProps> = ({ onNext }) => {
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowNotification(true), 500);
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
                    <TypewriterText text="Te lembramos" speed={50} />
                    <br />
                    <TypewriterText text="de qualquer" delay={600} speed={50} />
                    <br />
                    <TypewriterText text="coisa," delay={1100} speed={50} />
                    <br />
                    <TypewriterText text="qualquer" delay={1400} speed={50} />
                    <br />
                    <TypewriterText text="horário." delay={1800} speed={50} />
                </h1>

                {/* Notification Card */}
                <div className={`w-full mb-16 transition-all duration-700 ease-out transform ${showNotification ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="bg-[#1f2937]/90 backdrop-blur-sm text-white p-5 rounded-xl shadow-lg border border-gray-700/50">
                        <div className="flex items-center space-x-2 mb-3">
                            <Megaphone className="w-5 h-5 text-gray-300" />
                            <span className="font-semibold text-gray-200">Lembrete de sua Reunião!</span>
                        </div>

                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            Sua reunião começa em meia hora, prepare tudo para não se atrasar!
                        </p>

                        <div className="text-right">
                            <span className="text-xs text-gray-500">14:00</span>
                        </div>
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

export default EleventhScreen;
