import './Auth.scss';

import React, { useEffect } from 'react';

import { SignInForm, SignUpForm } from '@components';

const Auth = function () {
  useEffect(() => {
    document.title = 'Auth';
  });

  return (
    <main className="auth">
      <h1 className="sr-only">Auth</h1>
      <div className="auth__wrapper">
        <div className="auth__sign-in-form">
          <SignInForm />
        </div>
        <SignUpForm />
      </div>
    </main>
  );
};

export default Auth;
