import styles from './ingredient-page.module.scss';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import Loader from '../../components/loader/loader';
import DeveloperGuy from '../../components/developer-guy/developer-guy';
import { useAppSelector } from '../../services/hooks';
import { selectIngredientById } from '../../services/slices/ingredients';
//--------------------------------------------------------------------------------

const IngredientPage: FC = () => {
  const params = useParams<{ id: string }>();
  const { ingredientsFailed, ingredientsRequest } = useAppSelector(
    state => state.ingredients
  );
  const ingredient = useAppSelector(selectIngredientById(params.id));
  const mainStyle =
    !ingredient && !ingredientsRequest ? { justifyContent: 'flex-start' } : {};
  return (
    <main className={styles.content} style={mainStyle}>
      {ingredientsRequest && !ingredient ? (
        <div style={{ paddingTop: 220 }}>
          <Loader />
        </div>
      ) : ingredient ? (
        <div className={styles.content__ingredient}>
          <IngredientDetails />
        </div>
      ) : !ingredientsFailed ? (
        <DeveloperGuy>Ингредиент не найден!</DeveloperGuy>
      ) : (
        <DeveloperGuy>Не удалось загрузить данные!</DeveloperGuy>
      )}
    </main>
  );
};

export default IngredientPage;
