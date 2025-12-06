import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
    text: string;
    className?: string;
    delay?: number;
    speed?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    className = "",
    delay = 0,
    speed = 50
}) => {
    const [visibleCount, setVisibleCount] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setStarted(true);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        const interval = setInterval(() => {
            setVisibleCount(prev => {
                if (prev < text.length) {
                    return prev + 1;
                }
                clearInterval(interval);
                return prev;
            });
        }, speed);

        return () => clearInterval(interval);
    }, [started, text, speed]);

    return (
        <span className={className}>
            {text.split('').map((char, index) => (
                <span
                    key={index}
                    className={`transition-opacity duration-500 ${index < visibleCount ? 'opacity-100' : 'opacity-0'}`}
                >
                    {char}
                </span>
            ))}
        </span>
    );
};

export default TypewriterText;
