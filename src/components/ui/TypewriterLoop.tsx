import React, { useState, useEffect } from 'react';

interface TypewriterLoopProps {
    words: string[];
    className?: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
}

const TypewriterLoop: React.FC<TypewriterLoopProps> = ({
    words,
    className = "",
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 1500
}) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[currentWordIndex];

        const handleType = () => {
            if (isDeleting) {
                setCurrentText(prev => prev.substring(0, prev.length - 1));
            } else {
                setCurrentText(prev => currentWord.substring(0, prev.length + 1));
            }

            if (!isDeleting && currentText === currentWord) {
                // Finished typing, wait before deleting
                setTimeout(() => setIsDeleting(true), pauseDuration);
            } else if (isDeleting && currentText === '') {
                // Finished deleting, move to next word
                setIsDeleting(false);
                setCurrentWordIndex(prev => (prev + 1) % words.length);
            }
        };

        const timer = setTimeout(handleType, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <span className={className}>
            {currentText}
            <span className="animate-pulse ml-1">|</span>
        </span>
    );
};

export default TypewriterLoop;
