import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface TutorialStepProps {
    stepNumber: number;
    title: string;
    description: string;
    imageSrc?: string; // Optional: if we want to show the reference image
    onNext: () => void;
    onPrevious: () => void;
    isFirst: boolean;
    isLast: boolean;
}

const TutorialStep: React.FC<TutorialStepProps> = ({
    stepNumber,
    title,
    description,
    imageSrc,
    onNext,
    onPrevious,
    isFirst,
    isLast
}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <Card className="w-full max-w-md shadow-lg overflow-hidden">
                {/* Image Placeholder Area */}
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center relative">
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt={`Step ${stepNumber}`}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <span className="text-gray-400 font-medium">Imagem da Tela {stepNumber}</span>
                    )}
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                        {stepNumber} / 18
                    </div>
                </div>

                <CardContent className="p-6 text-center space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="flex gap-4 pt-4">
                        {!isFirst && (
                            <Button
                                variant="outline"
                                onClick={onPrevious}
                                className="flex-1"
                            >
                                Voltar
                            </Button>
                        )}
                        <Button
                            onClick={onNext}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {isLast ? 'Concluir' : 'Próximo'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TutorialStep;
