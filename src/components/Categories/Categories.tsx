import './Categories.scss';

import React from 'react';

import { Category } from '@components';
import { ICategories } from '@lib/types';

interface IProps {
  categories: ICategories;
}

const Categories: React.FC<IProps> = ({ categories }) => (
  <section className="categories">
    <h2 className="sr-only">Categories</h2>
    <div className="categories__wrapper">
      <ul className="categories__list">
        {categories.map((category) => (
          <li className="categories__item" key={category.id}>
            <Category category={category} />
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Categories;
