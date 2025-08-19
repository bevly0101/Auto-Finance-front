import React from 'react';
import RegisterForm from '../components/register-inter/register.form';
import MobileContainer from '../components/login-inter/MobileContainer';

function SignUpPage() {
  return (
    <div className="App">
      <MobileContainer>
        <RegisterForm />
      </MobileContainer>
    </div>
  );
}

export default SignUpPage;
