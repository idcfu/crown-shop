import './Shop.scss';

import React, { useEffect } from 'react';

const Shop = function () {
  useEffect(() => {
    document.title = 'Shop';
  });

  return (
    <main className="shop">
      <h1 className="sr-only">Shop</h1>
    </main>
  );
};

export default Shop;
