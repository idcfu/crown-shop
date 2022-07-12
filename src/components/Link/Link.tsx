import './Link.scss';

import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import IRoutes from '@lib/types';

interface IProps {
  to: IRoutes;
  children: React.ReactNode;
}

const Link: React.FC<IProps> = function ({ to, children }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleLinkMouseenter = function () {
    ref.current?.classList.add('link_hovered');
  };

  const handleLinkMouseleave = function () {
    ref.current?.classList.remove('link_hovered');
  };

  const handleLinkTouchend = function () {
    setTimeout(() => {
      ref.current?.classList.remove('logo_hovered');
    }, 0);
  };

  useEffect(() => {
    ref.current?.addEventListener('mouseenter', handleLinkMouseenter);
    ref.current?.addEventListener('mouseleave', handleLinkMouseleave);
    ref.current?.addEventListener('touchend', handleLinkTouchend);
  }, []);

  return <NavLink className="link" to={to} ref={ref}>{children}</NavLink>;
};

export default Link;
