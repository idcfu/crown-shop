import 'styles';

import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components';
import { Main, NotFound } from './pages';
import ROUTES from './lib/constants';

const App = function () {
  useEffect(() => {
    const handleWindowMousemove = function () {
      document.documentElement.classList.add('mouse-usage');
    };

    window.addEventListener('mousemove', handleWindowMousemove, { once: true });
  }, []);

  return (
    <Routes>
      <Route path={ROUTES.index} element={<Header />}>
        <Route index element={<Main />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
