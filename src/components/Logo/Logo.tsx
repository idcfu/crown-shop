import './Logo.scss';

import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import CrownSVG from '@images';
import ROUTES from '@lib/constants';

const Logo = function () {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleLogoMouseenter = function () {
    ref.current?.classList.add('logo_hovered');
  };

  const handleLogoMouseleave = function () {
    ref.current?.classList.remove('logo_hovered');
  };

  const handleLogoTouchend = function () {
    setTimeout(() => {
      ref.current?.classList.remove('logo_hovered');
    }, 0);
  };

  useEffect(() => {
    ref.current?.addEventListener('mouseenter', handleLogoMouseenter);
    ref.current?.addEventListener('mouseleave', handleLogoMouseleave);
    ref.current?.addEventListener('touchend', handleLogoTouchend);
  }, []);

  return (
    <NavLink className="logo" to={ROUTES.index} ref={ref}>
      <CrownSVG />
    </NavLink>
  );
};

export default Logo;
