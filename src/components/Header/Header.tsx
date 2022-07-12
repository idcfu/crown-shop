import './Header.scss';

import React, { useEffect, useId, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Link, Logo } from '@components';
import ROUTES from '@lib/constants';

const Header = function () {
  const { pathname: route } = useLocation();
  const navigationID = useId();
  const headerRef = useRef<HTMLElement>(null);
  const togglerRef = useRef<HTMLButtonElement>(null);

  const show = function () {
    window.scroll(0, 0);
    document.body.style.setProperty('overflow', 'hidden');
    headerRef.current?.classList.add('header_active');
    togglerRef.current?.setAttribute('aria-expanded', 'true');
  };

  const hide = function () {
    document.body.removeAttribute('style');
    headerRef.current?.scroll(0, 0);
    headerRef.current?.classList.remove('header_active');
    togglerRef.current?.setAttribute('aria-expanded', 'false');
  };

  const handleWindowResize = function () {
    hide();
  };

  const handleWindowKeydown = function ({ key }: KeyboardEvent) {
    if (key !== 'Escape') return;

    hide();
    togglerRef.current?.focus();
  };

  const handleHeaderFocusout = function ({ relatedTarget }: FocusEvent) {
    if (!(relatedTarget instanceof Node)) return;
    if (headerRef.current?.contains(relatedTarget)) return;

    hide();
  };

  const addListeners = function () {
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('keydown', handleWindowKeydown);
    headerRef.current?.addEventListener('focusout', handleHeaderFocusout);
  };

  const removeListeners = function () {
    window.removeEventListener('resize', handleWindowResize);
    window.removeEventListener('keydown', handleWindowKeydown);
    headerRef.current?.removeEventListener('focusout', handleHeaderFocusout);
  };

  const handleTogglerClick = function () {
    if (headerRef.current?.classList.contains('header_active')) {
      hide();
      removeListeners();
    } else {
      show();
      addListeners();
    }
  };

  const handleTogglerMouseenter = function () {
    togglerRef.current?.classList.add('header__toggler_hovered');
  };

  const handleTogglerMouseleave = function () {
    togglerRef.current?.classList.remove('header__toggler_hovered');
  };

  const handleTogglerTouchend = function () {
    setTimeout(() => {
      togglerRef.current?.classList.remove('header__toggler_hovered');
    }, 100);
  };

  useEffect(() => {
    hide();
  }, [route]);

  useEffect(() => {
    togglerRef.current?.addEventListener('mouseenter', handleTogglerMouseenter);
    togglerRef.current?.addEventListener('mouseleave', handleTogglerMouseleave);
    togglerRef.current?.addEventListener('touchend', handleTogglerTouchend);
  }, []);

  return (
    <>
      <header className="header" ref={headerRef}>
        <div className="header__wrapper">
          <div className="header__top-wrapper">
            <Logo />
            <button
              className="header__toggler"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded="false"
              aria-controls={navigationID}
              ref={togglerRef}
              onClick={handleTogglerClick}
            >
              <span className="header__toggler-line" />
            </button>
          </div>
          <nav className="header__navigation" id={navigationID} aria-label="Primary">
            <ul className="header__list">
              <li className="header__item">
                <Link to={ROUTES.shop}>Shop</Link>
              </li>
              <li className="header__item">
                <Link to={ROUTES.auth}>Auth</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
