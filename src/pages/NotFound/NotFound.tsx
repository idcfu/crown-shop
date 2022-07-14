import './NotFound.scss';

import React, { useEffect } from 'react';

const NotFound = function () {
  useEffect(() => {
    document.title = '404';
  });

  return (
    <main className="not-found">
      <h1 className="not-found__heading">404</h1>
    </main>
  );
};

export default NotFound;
