import styles from './burger-constructor.module.css';
import React, { useCallback, useMemo, forwardRef, useState } from 'react';
import {
  Button,
  CurrencyIcon,
  ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItemDndWrapper from './components/constructor-item-dnd-wrapper/constructor-item-dnd-wrapper';
import BunPlug from './components/bun-plug/bun-plug';
import IngredientsPlug from './components/ingredients-plug/ingredients-plug';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { burgerConstructorSlice } from '../../services/slices/constructor';
import { IBurgerConstructor } from '../../utils/interfaces';
//--------------------------------------------------------------------------------

const BurgerConstructor = forwardRef<
  HTMLUListElement,
  IBurgerConstructor & { isHover: boolean }
>(({ openModal, isHover }, ref) => {
  const dispatch = useAppDispatch();

  const { deleteIngredient } = burgerConstructorSlice.actions;

  const { selectedIngredients, selectedBun } = useAppSelector(
    state => state.burgerConstructor
  );

  const [bunPlugBorder, setBunPlugBorder] = useState('white');

  const totalSum = useMemo(
    () =>
      selectedIngredients.reduce(
        (sum, ingredient) => sum + ingredient.price,
        selectedBun ? selectedBun.price * 2 : 0
      ),
    [selectedIngredients, selectedBun]
  );

  const handleDelete = useCallback(
    index => {
      dispatch(deleteIngredient(index));
    },
    [dispatch, deleteIngredient]
  );

  const handleSubmit = useCallback(() => {
    if (!selectedBun) {
      setBunPlugBorder('red');
      setTimeout(() => {
        setBunPlugBorder('white');
      }, 400);
      return;
    }
    openModal(selectedIngredients.concat(selectedBun));
  }, [openModal, selectedIngredients, selectedBun]);

  const background = isHover
    ? `radial-gradient(
  circle,
  rgba(87, 0, 255, 0.35) 0%,
  rgba(19, 19, 22, 1) 65%
)`
    : 'transparent';

  return (
    <section
      className={`mr-5 pl-4 ${styles.constructor}`}
      aria-label="Конструктор бургера">
      <ul
        className={`mt-25 ${styles.partsList}`}
        style={{ background }}
        ref={ref}>
        <li className={`mr-4 ${styles.part}`}>
          {!selectedBun ? (
            <BunPlug position="top" border={bunPlugBorder}>
              Добавьте булочку
            </BunPlug>
          ) : (
            <ConstructorElement
              isLocked={true}
              type="top"
              text={`${selectedBun.name ? selectedBun.name : 'булка'} (верх)`}
              price={selectedBun.price ? selectedBun.price : 0}
              thumbnail={selectedBun.image ? selectedBun.image : 'Изображение'}
            />
          )}
        </li>
        <li className={styles.container}>
          {selectedIngredients.length === 0 ? (
            <IngredientsPlug>Добавьте начинку</IngredientsPlug>
          ) : (
            <ul className={`mt-4 mb-4 ${styles.partsListScroll}`}>
              {selectedIngredients
                ? selectedIngredients.map((ingredient, index) => {
                    return (
                      <ConstructorItemDndWrapper
                        ingredient={ingredient}
                        handleDelete={handleDelete}
                        key={ingredient.uid}
                        index={index}
                      />
                    );
                  })
                : null}
            </ul>
          )}
        </li>

        <li className={`mr-4 ${styles.part}`}>
          {!selectedBun ? (
            <BunPlug position="bottom" border={bunPlugBorder} />
          ) : (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${selectedBun ? selectedBun.name : 'булка'} (низ)`}
              price={selectedBun ? selectedBun.price : 0}
              thumbnail={selectedBun ? selectedBun.image : 'Изображение'}
            />
          )}
        </li>
      </ul>
      <div className={`mt-10 mr-4 ${styles.order}`}>
        <p className="text text_type_digits-medium">{totalSum}</p>
        <span className="ml-2 mr-10">
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large" onClick={handleSubmit}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
});

export default BurgerConstructor;
