import './Link.scss';

import React from 'react';
import { NavLink } from 'react-router-dom';

interface IProps {
  to: '/' | '/auth' | '/shop';
  children: React.ReactNode;
}

const Link: React.FC<IProps> = ({ to, children }) => (
  <NavLink className="link" to={to}>{children}</NavLink>
);

export default Link;
