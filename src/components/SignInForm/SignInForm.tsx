/* eslint-disable no-alert */

import './SignInForm.scss';

import { FirebaseError } from 'firebase/app';
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { Button, TextField } from '@components';
import { signInWithEmailAndPassword, signInWithPopup } from '@lib/firebase';

const defaultFields = {
  email: '',
  password: '',
};

const SignInForm = function () {
  const [fields, setFields] = useState(defaultFields);
  const { email, password } = fields;

  const handleFormSubmit = async function (event: FormEvent) {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(email, password);
    } catch (error) {
      if (!(error instanceof FirebaseError)) return;

      if (error.code === 'auth/user-not-found') alert('User not found');
      else if (error.code === 'auth/wrong-password') alert('Wrong password');
    }
  };

  const handleGoogleButtonClick = useCallback(async () => {
    try {
      await signInWithPopup();
    } catch (error) {
      // auth/popup-closed-by-user or auth/cancelled-popup-request.
    }
  }, []);

  const handleFieldChange = useCallback(({ target }: ChangeEvent) => {
    if (target instanceof HTMLInputElement) setFields({ ...fields, [target.name]: target.value });
  }, [fields]);

  return (
    <section className="sign-in-form">
      <h2 className="sign-in-form__heading">I already have an account</h2>
      <p className="sign-in-form__text">Sign in with your email and password.</p>
      <form className="sign-in-form__form" onSubmit={handleFormSubmit}>
        <div className="sign-in-form__field">
          <TextField
            label="Email"
            name="email"
            type="email"
            isRequired
            isActive={!!email}
            onChange={handleFieldChange}
          />
        </div>
        <div className="sign-in-form__field">
          <TextField
            label="Password"
            name="password"
            type="password"
            isRequired
            isActive={!!password}
            onChange={handleFieldChange}
          />
        </div>
        <div className="sign-in-form__buttons">
          <div className="sign-in-form__sign-in">
            <Button variant="filled" isSubmit>Sign in</Button>
          </div>
          <Button variant="google" onClick={handleGoogleButtonClick}>Sign in with Google</Button>
        </div>
      </form>
    </section>
  );
};

export default SignInForm;
