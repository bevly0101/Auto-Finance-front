import React from 'react';
import FreeTrialBlocker from '@/components/FreeTrialBlocker';
import TutorialStories from '@/components/TutorialStories';

interface DashboardTutorialLayoutProps {
  children: React.ReactNode;
}

const DashboardTutorialLayout: React.FC<DashboardTutorialLayoutProps> = ({ children }) => {
  return (
    <>
      <FreeTrialBlocker />
      <TutorialStories />
      {children}
    </>
  );
};

export default DashboardTutorialLayout;