import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './IngredientsCategory.module.css';
import BurgerIngredient from '../burger-ingredient/BurgerIngredient';

const IngredientsCategory = forwardRef((props, ref) => (
  <li ref={ref} id={props.id}>
    <h2 className="text text_type_main-medium mt-10 mb-6">{props.title}</h2>
    <ul className={`ml-4 ${styles.list}`}>
      {props.ingredients.map(ingredient => (
        <li key={ingredient._id}>
          <BurgerIngredient {...ingredient} />
        </li>
      ))}
    </ul>
  </li>
));

IngredientsCategory.propTypes = {
  categoryId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired
};

export default IngredientsCategory;
