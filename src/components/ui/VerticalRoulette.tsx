import React, { useState, useEffect } from 'react';

interface VerticalRouletteProps {
    words: string[];
    interval?: number;
    className?: string;
}

const VerticalRoulette: React.FC<VerticalRouletteProps> = ({
    words,
    interval = 2000,
    className = ""
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const extendedWords = [...words, words[0]];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => {
                setIsTransitioning(true);
                return prev + 1;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [interval]);

    useEffect(() => {
        if (currentIndex === words.length) {
            // We reached the clone. Wait for transition to finish, then reset instantly to 0.
            const timeout = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 500); // Match transition duration

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, words.length]);

    return (
        <div className={`inline-block relative h-[1.2em] overflow-hidden align-bottom ${className}`}>
            <div
                className={`flex flex-col ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                style={{ transform: `translateY(-${currentIndex * 100}%)` }}
            >
                {extendedWords.map((word, index) => (
                    <div key={index} className="h-[1.2em] flex items-center whitespace-nowrap">
                        {word}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerticalRoulette;
