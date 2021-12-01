import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredient.module.css';
// import PropTypes from 'prop-types';

function BurgerIngredient(props) {
  return (
    <div className={styles.ingredient}>
      <Counter count={1} size="default" />
      <img src={props.image} alt={props.name} className="ml-4 mr-4" />
      <div className={`mt-2 mb-2 ${styles.priceContainer}`}>
        <p className="text text_type_digits-default pr-2">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{props.name}</p>
    </div>
  );
}

export default BurgerIngredient;
