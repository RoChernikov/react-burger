import styles from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../utils/types';

function BurgerIngredient({ ingredient, openModal }) {
  return (
    <li className={styles.ingredient} onClick={() => openModal(ingredient)}>
      <Counter count={1} size="default" />
      <img src={ingredient.image} alt={ingredient.name} className="ml-4 mr-4" />
      <div className={`mt-2 mb-2 ${styles.priceContainer}`}>
        <p className="text text_type_digits-default pr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </li>
  );
}

BurgerIngredient.propTypes = {
  ingredient: PropTypes.shape(IngredientType).isRequired,
  openModal: PropTypes.func.isRequired
};

export default BurgerIngredient;
