import React from 'react';
import LoginForm from '../components/login-inter/LoginForm';
import MobileContainer from '../components/login-inter/MobileContainer';

function SignInPage() {
  return (
    <div className="App">
      <MobileContainer>
        <LoginForm />
      </MobileContainer>
    </div>
  );
}

export default SignInPage;
