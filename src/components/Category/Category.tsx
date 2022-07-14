import './Category.scss';

import React from 'react';

import { ICategory } from '@lib/types';

interface IProps {
  category: ICategory;
}

const Category: React.FC<IProps> = ({ category: { heading, imageURL } }) => (
  <div className="category">
    <img className="category__image" src={imageURL} alt={heading} />
    <div className="category__wrapper">
      <h3 className="category__heading">{heading}</h3>
      <button className="category__buy" type="button">Shop now</button>
    </div>
  </div>
);

export default Category;
