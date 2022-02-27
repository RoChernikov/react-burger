import styles from './IngredientsCategory.module.css';
import React, { forwardRef } from 'react';
import BurgerIngredientsDndWrapper from '../burger-ingredients-dnd-wrapper/burger-ingredients-dnd-wrapper';
import { IIngredientsCategory } from '../../../../utils/interfaces';
import { TIngredient } from '../../../../utils/types';
//--------------------------------------------------------------------------------

const IngredientsCategory = forwardRef<HTMLLIElement, IIngredientsCategory>(
  ({ id, title, ingredients, counts }, ref) => (
    <li ref={ref} id={id}>
      <h2 className="text text_type_main-medium mt-10 mb-6">{title}</h2>
      <ul className={`ml-4 ${styles.list}`}>
        {ingredients.map((ingredient: TIngredient) => (
          <BurgerIngredientsDndWrapper
            ingredient={ingredient}
            count={counts[ingredient._id]}
            key={ingredient._id}
          />
        ))}
      </ul>
    </li>
  )
);

export default IngredientsCategory;
