import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8">
      {/* Light Mode Logo */}
      <img
        src="/logo_autofinance2%20(1).png"
        alt="Autofinance Logo"
        className="h-10 dark:hidden"
      />
      {/* Dark Mode Logo */}
      <img
        src="/lovable-uploads/logo_autofinance3.png"
        alt="Autofinance Logo"
        className="h-10 hidden dark:block"
      />
    </div>
  );
};

export default Logo;