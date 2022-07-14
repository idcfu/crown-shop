import './Logo.scss';

import React from 'react';
import { NavLink } from 'react-router-dom';

import CrownSVG from '@images';
import ROUTES from '@lib/constants';

const Logo = () => (
  <NavLink className="logo" to={ROUTES.index}>
    <CrownSVG />
  </NavLink>
);

export default Logo;
