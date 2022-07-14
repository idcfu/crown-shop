/* eslint-disable no-alert */

import './SignUpForm.scss';

import { FirebaseError } from 'firebase/app';
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { Button, TextField } from '@components';
import { createUserWithEmailAndPassword, setDoc } from '@lib/firebase';

const defaultFields = {
  displayName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const SignUpForm = function () {
  const [fields, setFields] = useState(defaultFields);
  const { displayName, email, password, passwordConfirmation } = fields;

  const clear = function () {
    setFields(defaultFields);
  };

  const handleFormSubmit = async function (event: FormEvent) {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      alert("The passwords don't match");

      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(email, password);
      await setDoc(user, { displayName });
      clear();
    } catch (error) {
      if (!(error instanceof FirebaseError)) return;

      if (error.code === 'auth/weak-password') alert('Password should be minimum 6 characters');
      else if (error.code === 'auth/invalid-email') alert('Invalid email');
      else if (error.code === 'auth/email-already-in-use') alert('Email already in use');
    }
  };

  const handleFieldChange = useCallback(({ target }: ChangeEvent) => {
    if (target instanceof HTMLInputElement) setFields({ ...fields, [target.name]: target.value });
  }, [fields]);

  return (
    <section className="sign-up-form">
      <h2 className="sign-up-form__heading">Don&apos;t have an account?</h2>
      <p className="sign-up-form__text">Sign up with your email and password.</p>
      <form className="sign-in-form__form" onSubmit={handleFormSubmit}>
        <div className="sign-in-form__field">
          <TextField
            label="Display Name"
            name="displayName"
            type="text"
            isRequired
            isActive={!!displayName}
            onChange={handleFieldChange}
          />
        </div>
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
        <div className="sign-in-form__field">
          <TextField
            label="Confirm Password"
            name="passwordConfirmation"
            type="password"
            isRequired
            isActive={!!passwordConfirmation}
            onChange={handleFieldChange}
          />
        </div>
        <div className="sign-up-form__sign-up">
          <Button variant="filled" isSubmit>Sign up</Button>
        </div>
      </form>
    </section>
  );
};

export default SignUpForm;
