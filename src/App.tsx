import 'styles';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components';
import { Main, NotFound } from './pages';
import ROUTES from './lib/constants';

const App = () => (
  <Routes>
    <Route path={ROUTES.index} element={<Header />}>
      <Route index element={<Main />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
