import './Main.scss';

import React, { useEffect } from 'react';

import { Categories } from '@components';

const categories = [
  {
    id: 1,
    heading: 'Women',
    imageURL: 'https://i.ibb.co/GCCdy8t/womens.png',
  },
  {
    id: 2,
    heading: 'Mens',
    imageURL: 'https://i.ibb.co/R70vBrQ/men.png',
  },
  {
    id: 3,
    heading: 'Hats',
    imageURL: 'https://i.ibb.co/cvpntL1/hats.png',
  },
  {
    id: 4,
    heading: 'Jackets',
    imageURL: 'https://i.ibb.co/px2tCc3/jackets.png',
  },
  {
    id: 5,
    heading: 'Sneakers',
    imageURL: 'https://i.ibb.co/0jqHpnp/sneakers.png',
  },
];

const Main = function () {
  useEffect(() => {
    document.title = 'Crown Shop';
  });

  return (
    <main className="main">
      <h1 className="sr-only">Crown Shop</h1>
      <Categories categories={categories} />
    </main>
  );
};

export default Main;
