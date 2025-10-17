import React, { useState, useEffect } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { supabase } from '../lib/supabaseclient';
import { useAuth } from '../contexts/AuthContext';

const images = [
  './src/assets/img_tutorial/1.jpg',
  './src/assets/img_tutorial/2.jpg',
  './src/assets/img_tutorial/3.jpg',
  './src/assets/img_tutorial/4.jpg',
  './src/assets/img_tutorial/5.jpg',
  './src/assets/img_tutorial/6.jpg',
];

const TutorialStories: React.FC = () => {
  const { user } = useAuth();
  const { profile, setProfile, loading: profileLoading } = useProfile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (profileLoading || !profile?.on_tutorial || !profile?.verified_code) {
    return null;
  }

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowConfirmation(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleStart = async () => {
    if (user) {
      const { error } = await supabase
        .from('users')
        .update({ on_tutorial: false })
        .eq('id', user.id);
      if (error) {
        console.error('Error updating tutorial status:', error);
      } else {
        if (setProfile && profile) {
          setProfile({ ...profile, on_tutorial: false });
        }
        window.location.href = 'https://wa.me/5527997404747';
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center">
      <div className="relative w-full h-full max-w-screen-md max-h-screen-lg">
        {/* Progress Bar */}
        <div className="absolute top-2 left-2 right-2 flex space-x-1">
          {images.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-gray-600 rounded-full">
              <div
                className="h-1 bg-white rounded-full"
                style={{
                  width: `${index < currentIndex ? 100 : index === currentIndex ? 100 : 0}%`,
                  transition: 'width 0.3s',
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Image */}
        <img
          src={images[currentIndex]}
          alt={`Tutorial step ${currentIndex + 1}`}
          className="object-contain w-full h-full"
        />

        {/* Navigation */}
        <div className="absolute inset-0 flex justify-between items-center">
          <button onClick={handlePrev} className="w-1/2 h-full"></button>
          <button onClick={handleNext} className="w-1/2 h-full"></button>
        </div>

        {/* Confirmation Dialog */}
        {showConfirmation && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg text-center shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Deseja começar a usar a AutoFinance?</h2>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleStart}
                  className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md transform hover:scale-105 transition-transform duration-300"
                >
                  Sim
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {!showConfirmation && (
        <div className="absolute bottom-10">
          <button
            onClick={handleNext}
            className="text-white px-8 py-4 rounded-full shadow-lg text-xl font-bold transform hover:scale-105 transition-transform duration-300"
            style={{ background: 'linear-gradient(to right, #008edb, #36e0ea)' }}
          >
            Próximo
          </button>
        </div>
      )}
    </div>
  );
};

export default TutorialStories;