import styles from './ingredient-page.module.css';
import React, { FC } from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { TIngredient } from '../../utils/types';
//--------------------------------------------------------------------------------

const selectedIngredient: TIngredient = {
  _id: '60666c42cc7b410027a1a9b6',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};

const IngredientPage: FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.ingredient}>
        <IngredientDetails ingredient={selectedIngredient} />
      </div>
    </main>
  );
};

export default IngredientPage;
