import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, Check, Paperclip } from 'lucide-react';
import TypewriterText from "@/components/ui/TypewriterText";

interface TwelfthScreenProps {
    onNext: () => void;
}

const TypingIndicator = () => (
    <div className="flex space-x-1 bg-[#1f2937] p-4 rounded-2xl rounded-tl-none w-fit animate-in fade-in zoom-in duration-300">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
);

const TwelfthScreen: React.FC<TwelfthScreenProps> = ({ onNext }) => {
    const [showFirstMessage, setShowFirstMessage] = useState(false);
    const [showTyping, setShowTyping] = useState(false);
    const [showSecondMessage, setShowSecondMessage] = useState(false);

    useEffect(() => {
        // Show first message after a short delay
        const t1 = setTimeout(() => setShowFirstMessage(true), 500);

        // Start typing after first message
        const t2 = setTimeout(() => setShowTyping(true), 1500);

        // Stop typing and show second message
        const t3 = setTimeout(() => {
            setShowTyping(false);
            setShowSecondMessage(true);
        }, 3500);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#09090b] overflow-hidden">
            {/* Background Gradient Effect - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0091ff]/40 to-transparent pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-6">

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-black text-white text-left w-full leading-tight mb-8">
                    <TypewriterText text="Estabeleça" speed={50} />
                    <br />
                    <TypewriterText text="metas e limites" delay={500} speed={50} />
                    <br />
                    <TypewriterText text="em suas" delay={1200} speed={50} />
                    <br />
                    <TypewriterText text="finanças!" delay={1600} speed={50} />
                </h1>

                {/* Chat Container */}
                <div className="w-full space-y-4 mb-12">

                    {/* User Message (Right) */}
                    <div className={`flex justify-end transition-all duration-500 ${showFirstMessage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <div className="bg-[#005c4b] text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-md relative">
                            <p className="text-sm md:text-base">quero colocar um limite de R$300 reais para uber esse mês</p>
                            <div className="flex justify-end items-center space-x-1 mt-1">
                                <span className="text-[10px] text-gray-300">10:30</span>
                                <div className="flex">
                                    <Check className="w-3 h-3 text-[#53bdeb]" />
                                    <Check className="w-3 h-3 text-[#53bdeb] -ml-1" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Typing Indicator (Left) */}
                    {showTyping && (
                        <div className="flex justify-start">
                            <TypingIndicator />
                        </div>
                    )}

                    {/* System Message (Left) */}
                    {showSecondMessage && (
                        <div className="flex justify-start animate-in fade-in zoom-in duration-300 origin-top-left">
                            <div className="bg-[#1f2937] text-white p-4 rounded-2xl rounded-tl-none max-w-[90%] shadow-md">
                                <p className="text-sm md:text-base text-gray-100 flex items-start">
                                    <Paperclip className="w-4 h-4 mr-1 mt-1 text-gray-400" />
                                    Limite de 300 reais criado para gastos com uber!
                                </p>
                                <p className="text-[10px] text-gray-400 text-right mt-1">14:00</p>
                            </div>
                        </div>
                    )}
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

export default TwelfthScreen;
