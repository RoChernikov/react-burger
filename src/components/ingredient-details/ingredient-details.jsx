import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { IngredientType } from '../../utils/types';
//--------------------------------------------------------------------------------

const IngredientDetails = ({ ingredient }) => {
  return (
    <>
      <h2 className={`text text_type_main-large mt-3 ${styles.title}`}>
        Детали ингредиента
      </h2>
      <div className={styles.content}>
        <img
          className={`mt-3 ${styles.image}`}
          alt={ingredient.name}
          src={ingredient.image_large}
        />
        <p className="text text_type_main-medium mt-4 ">{ingredient.name}</p>
        <ul className={`mt-8 ${styles.nutritionList}`}>
          <li className={styles.nutritionItem}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text text_type_digits-default text_color_inactive">
              {ingredient.calories}
            </p>
          </li>
          <li className={styles.nutritionItem}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text text_type_digits-default text_color_inactive">
              {ingredient.proteins}
            </p>
          </li>
          <li className={styles.nutritionItem}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text text_type_digits-default text_color_inactive">
              {ingredient.fat}
            </p>
          </li>
          <li className={styles.nutritionItem}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text text_type_digits-default text_color_inactive">
              {ingredient.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape(IngredientType).isRequired
};

export default IngredientDetails;
