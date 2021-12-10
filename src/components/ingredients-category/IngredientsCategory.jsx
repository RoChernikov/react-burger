import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './IngredientsCategory.module.css';
import BurgerIngredient from '../burger-ingredient/BurgerIngredient';

const IngredientsCategory = forwardRef(
  ({ id, title, ingredients, openModal }, ref) => (
    <li ref={ref} id={id}>
      <h2 className="text text_type_main-medium mt-10 mb-6">{title}</h2>
      <ul className={`ml-4 ${styles.list}`}>
        {ingredients.map(ingredient => (
          <BurgerIngredient
            ingredient={ingredient}
            openModal={openModal}
            key={ingredient._id}
          />
        ))}
      </ul>
    </li>
  )
);

IngredientsCategory.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired
};

export default IngredientsCategory;
