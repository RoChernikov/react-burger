// import PropTypes from 'prop-types';
import styles from './IngredientsCategory.module.css';
import BurgerIngredient from '../burger-ingredient/BurgerIngredient';

function IngredientsCategory(props) {
  return (
    <>
      <h2 className="text text_type_main-medium mt-10 mb-6">{props.title}</h2>
      <ul className={`ml-4 ${styles.list}`}>
        {props.ingredients.map(ingredient => (
          <li key={ingredient._id}>
            <BurgerIngredient {...ingredient} />
          </li>
        ))}
        {/* <li>
          <BurgerIngredient {...props.ingredients[0]} />
        </li> */}
      </ul>
    </>
  );
}

export default IngredientsCategory;
