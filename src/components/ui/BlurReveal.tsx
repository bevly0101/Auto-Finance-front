import React, { useState, useEffect } from 'react';

interface BlurRevealProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

const BlurReveal: React.FC<BlurRevealProps> = ({
    children,
    delay = 0,
    duration = 700,
    className = ""
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timeout);
    }, [delay]);

    return (
        <div
            className={`transition-all ease-out ${className}`}
            style={{
                transitionDuration: `${duration}ms`,
                opacity: isVisible ? 1 : 0,
                filter: isVisible ? 'blur(0px)' : 'blur(10px)',
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)'
            }}
        >
            {children}
        </div>
    );
};

export default BlurReveal;
