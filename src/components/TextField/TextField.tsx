import './TextField.scss';

import React, { ChangeEvent, useId } from 'react';

interface IProps {
  label: string;
  name: 'displayName' | 'email' | 'password' | 'passwordConfirmation';
  type?: string;
  isRequired?: boolean;
  isActive: boolean;
  onChange: ({ target }: ChangeEvent) => void;
}

const TextField: React.FC<IProps> = function ({
  label,
  name,
  type = 'text',
  isRequired,
  isActive,
  onChange,
}) {
  const id = useId();

  return (
    <div className={isActive ? 'text-field text-field_active' : 'text-field'}>
      <label className="text-field__label" htmlFor={id}>{label}</label>
      <input
        className="text-field__input"
        id={id}
        name={name}
        type={type}
        required={isRequired}
        autoComplete="off"
        onChange={onChange}
      />
    </div>
  );
};

export default TextField;
