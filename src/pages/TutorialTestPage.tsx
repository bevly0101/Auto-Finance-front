import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TutorialStep from '@/components/tutorial/TutorialStep';
import { supabase } from '@/lib/supabaseclient';
import WelcomeScreen from '@/components/tutorial/screens/WelcomeScreen';
import SecondScreen from '@/components/tutorial/screens/SecondScreen';
import ThirdScreen from '@/components/tutorial/screens/ThirdScreen';
import FourthScreen from '@/components/tutorial/screens/FourthScreen';
import FifthScreen from '@/components/tutorial/screens/FifthScreen';
import SixthScreen from '@/components/tutorial/screens/SixthScreen';
import SeventhScreen from '@/components/tutorial/screens/SeventhScreen';
import EighthScreen from '@/components/tutorial/screens/EighthScreen';
import NinthScreen from '@/components/tutorial/screens/NinthScreen';
import TenthScreen from '@/components/tutorial/screens/TenthScreen';
import EleventhScreen from '@/components/tutorial/screens/EleventhScreen';
import TwelfthScreen from '@/components/tutorial/screens/TwelfthScreen';
import ThirteenthScreen from '@/components/tutorial/screens/ThirteenthScreen';
import FourteenthScreen from '@/components/tutorial/screens/FourteenthScreen';
import FifteenthScreen from '@/components/tutorial/screens/FifteenthScreen';
import SixteenthScreen from '@/components/tutorial/screens/SixteenthScreen';
import SeventeenthScreen from '@/components/tutorial/screens/SeventeenthScreen';
import EighteenthScreen from '@/components/tutorial/screens/EighteenthScreen';

// Import images
import img1 from '@/tutorial_telas/TELA.png';
import img2 from '@/tutorial_telas/TELA2.png';
import img3 from '@/tutorial_telas/TELA3.png';
import img4 from '@/tutorial_telas/TELA4.png';
import img5 from '@/tutorial_telas/TELA5.png';
import img6 from '@/tutorial_telas/TELA6.png';
import img7 from '@/tutorial_telas/TELA7.png';
import img8 from '@/tutorial_telas/TELA8.png';
import img9 from '@/tutorial_telas/TELA9.png';
import img10 from '@/tutorial_telas/TELA10.png';
import img11 from '@/tutorial_telas/TELA11.png';
import img12 from '@/tutorial_telas/TELA12.png';
import img13 from '@/tutorial_telas/TELA13.png';
import img14 from '@/tutorial_telas/TELA14.png';
import img15 from '@/tutorial_telas/TELA15.png';
import img16 from '@/tutorial_telas/TELA16.png';
import img17 from '@/tutorial_telas/TELA17.png';
import img18 from '@/tutorial_telas/TELA18.png';

const tutorialSteps = [
    { id: 1, title: "Bem-vindo", description: "Descrição da tela 1. Substitua este texto pelo conteúdo real.", image: img1 },
    { id: 2, title: "Passo 2", description: "Descrição da tela 2. Substitua este texto pelo conteúdo real.", image: img2 },
    { id: 3, title: "Passo 3", description: "Descrição da tela 3. Substitua este texto pelo conteúdo real.", image: img3 },
    { id: 4, title: "Passo 4", description: "Descrição da tela 4. Substitua este texto pelo conteúdo real.", image: img4 },
    { id: 5, title: "Passo 5", description: "Descrição da tela 5. Substitua este texto pelo conteúdo real.", image: img5 },
    { id: 6, title: "Passo 6", description: "Descrição da tela 6. Substitua este texto pelo conteúdo real.", image: img6 },
    { id: 7, title: "Passo 7", description: "Descrição da tela 7. Substitua este texto pelo conteúdo real.", image: img7 },
    { id: 8, title: "Passo 8", description: "Descrição da tela 8. Substitua este texto pelo conteúdo real.", image: img8 },
    { id: 9, title: "Passo 9", description: "Descrição da tela 9. Substitua este texto pelo conteúdo real.", image: img9 },
    { id: 10, title: "Passo 10", description: "Descrição da tela 10. Substitua este texto pelo conteúdo real.", image: img10 },
    { id: 11, title: "Passo 11", description: "Descrição da tela 11. Substitua este texto pelo conteúdo real.", image: img11 },
    { id: 12, title: "Passo 12", description: "Descrição da tela 12. Substitua este texto pelo conteúdo real.", image: img12 },
    { id: 13, title: "Passo 13", description: "Descrição da tela 13. Substitua este texto pelo conteúdo real.", image: img13 },
    { id: 14, title: "Passo 14", description: "Descrição da tela 14. Substitua este texto pelo conteúdo real.", image: img14 },
    { id: 15, title: "Passo 15", description: "Descrição da tela 15. Substitua este texto pelo conteúdo real.", image: img15 },
    { id: 16, title: "Passo 16", description: "Descrição da tela 16. Substitua este texto pelo conteúdo real.", image: img16 },
    { id: 17, title: "Passo 17", description: "Descrição da tela 17. Substitua este texto pelo conteúdo real.", image: img17 },
    { id: 18, title: "Conclusão", description: "Descrição da tela 18. Substitua este texto pelo conteúdo real.", image: img18 },
];

const TutorialTestPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isProgressGlowing, setIsProgressGlowing] = useState(false);

    React.useEffect(() => {
        setIsProgressGlowing(true);
        const timer = setTimeout(() => {
            setIsProgressGlowing(false);
        }, 1000); // Match transition duration
        return () => clearTimeout(timer);
    }, [currentStepIndex]);

    // Check if user should be on tutorial
    React.useEffect(() => {
        const checkTutorialStatus = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('users')
                .select('on_tutorial')
                .eq('id', user.id)
                .single();

            if (!error && data && !data.on_tutorial) {
                navigate('/dashboard');
            }
        };

        checkTutorialStatus();
    }, [navigate]);

    const handleNext = () => {
        if (currentStepIndex < tutorialSteps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            // Tutorial finished
            // Update user's on_tutorial status
            supabase.auth.getUser().then(({ data: { user } }) => {
                if (user) {
                    supabase
                        .from('users')
                        .update({ on_tutorial: false })
                        .eq('id', user.id)
                        .then(() => {
                            // Send webhook notification
                            fetch('https://webhook.autosfinance.com.br/webhook/tour-completed', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ id: user.id }),
                            }).catch(err => console.error('Error sending webhook:', err));

                            navigate('/dashboard');
                        });
                } else {
                    navigate('/dashboard');
                }
            });
        }
    };

    const handlePrevious = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        }
    };

    const currentStep = tutorialSteps[currentStepIndex];

    // Progress Bar Component
    const ProgressBar = () => {
        const progress = ((currentStepIndex + 1) / tutorialSteps.length) * 100;
        return (
            <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
                <div
                    className="h-full bg-[#00aaff] transition-all duration-1000 ease-out relative"
                    style={{ width: `${progress}%` }}
                >
                    <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_20px_8px_rgba(0,170,255,1)] transition-opacity duration-700 ease-in-out ${isProgressGlowing ? 'opacity-100' : 'opacity-0'}`} />
                </div>
            </div>
        );
    };

    // Wrapper to include ProgressBar
    const withProgressBar = (Component: React.ReactNode) => (
        <>
            <ProgressBar />
            {Component}
        </>
    );

    // Special case for the first step (Welcome Screen)
    if (currentStepIndex === 0) {
        return withProgressBar(<WelcomeScreen onStart={handleNext} />);
    }

    // Special case for the second step (Second Screen)
    if (currentStepIndex === 1) {
        return withProgressBar(<SecondScreen onNext={handleNext} />);
    }

    // Special case for the third step (Third Screen)
    if (currentStepIndex === 2) {
        return withProgressBar(<ThirdScreen onNext={handleNext} />);
    }

    // Special case for the fourth step (Fourth Screen)
    if (currentStepIndex === 3) {
        return withProgressBar(<FourthScreen onNext={handleNext} />);
    }

    // Special case for the fifth step (Fifth Screen)
    if (currentStepIndex === 4) {
        return withProgressBar(<FifthScreen onNext={handleNext} />);
    }

    // Special case for the sixth step (Sixth Screen)
    if (currentStepIndex === 5) {
        return withProgressBar(<SixthScreen onNext={handleNext} />);
    }

    // Special case for the seventh step (Seventh Screen)
    if (currentStepIndex === 6) {
        return withProgressBar(<SeventhScreen onNext={handleNext} />);
    }

    // Special case for the eighth step (Eighth Screen)
    if (currentStepIndex === 7) {
        return withProgressBar(<EighthScreen onNext={handleNext} />);
    }

    // Special case for the ninth step (Ninth Screen)
    if (currentStepIndex === 8) {
        return withProgressBar(<NinthScreen onNext={handleNext} />);
    }

    // Special case for the tenth step (Tenth Screen)
    if (currentStepIndex === 9) {
        return withProgressBar(<TenthScreen onNext={handleNext} />);
    }

    // Special case for the eleventh step (Eleventh Screen)
    if (currentStepIndex === 10) {
        return withProgressBar(<EleventhScreen onNext={handleNext} />);
    }

    // Special case for the twelfth step (Twelfth Screen)
    if (currentStepIndex === 11) {
        return withProgressBar(<TwelfthScreen onNext={handleNext} />);
    }

    // Special case for the thirteenth step (Thirteenth Screen)
    if (currentStepIndex === 12) {
        return withProgressBar(<ThirteenthScreen onNext={handleNext} />);
    }

    // Special case for the fourteenth step (Fourteenth Screen)
    if (currentStepIndex === 13) {
        return withProgressBar(<FourteenthScreen onNext={handleNext} />);
    }

    // Special case for the fifteenth step (Fifteenth Screen)
    if (currentStepIndex === 14) {
        return withProgressBar(<FifteenthScreen onNext={handleNext} />);
    }

    // Special case for the sixteenth step (Sixteenth Screen)
    if (currentStepIndex === 15) {
        return withProgressBar(<SixteenthScreen onNext={handleNext} />);
    }

    // Special case for the seventeenth step (Seventeenth Screen)
    if (currentStepIndex === 16) {
        return withProgressBar(<SeventeenthScreen onNext={handleNext} />);
    }

    // Special case for the eighteenth step (Eighteenth Screen)
    if (currentStepIndex === 17) {
        return withProgressBar(<EighteenthScreen onNext={handleNext} />);
    }

    return withProgressBar(
        <TutorialStep
            stepNumber={currentStepIndex + 1}
            title={currentStep.title}
            description={currentStep.description}
            imageSrc={currentStep.image}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirst={currentStepIndex === 0}
            isLast={currentStepIndex === tutorialSteps.length - 1}
        />
    );
};

export default TutorialTestPage;
