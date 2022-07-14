import './Button.scss';

import React from 'react';

interface IProps {
  variant: 'filled' | 'google' | 'outlined' | 'transparent';
  isSubmit?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<IProps> = ({ variant, isSubmit, children, onClick }) => (
  <button
    className={`button button_variant_${variant}`}
    type={isSubmit ? 'submit' : 'button'}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
