import 'styles';

import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components';
import { Auth, Main, NotFound, Shop } from './pages';
import ROUTES from './lib/constants';

const App = function () {
  useEffect(() => {
    const handleWindowTouchstart = function () {
      document.documentElement.removeAttribute('class');
    };

    window.addEventListener('touchstart', handleWindowTouchstart, { once: true });
  }, []);

  return (
    <Routes>
      <Route path={ROUTES.index} element={<Header />}>
        <Route index element={<Main />} />
        <Route path={ROUTES.auth} element={<Auth />} />
        <Route path={ROUTES.shop} element={<Shop />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
