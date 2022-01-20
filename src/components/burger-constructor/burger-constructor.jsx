import styles from './burger-constructor.module.css';
import { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CurrencyIcon,
  DragIcon,
  ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import BunPlug from './components/bun-plug';
import IngredientsPlug from './components/ingredients-plug';
import { useDispatch, useSelector } from 'react-redux';

function BurgerConstructor({ openModal }) {
  const dispatch = useDispatch();

  const selectedIngredients = useSelector(
    state => state.burgerConstructor.selectedIngredients
  );
  const selectedBun = useSelector(state => state.burgerConstructor.selectedBun);

  const totalSum = useMemo(
    () =>
      selectedIngredients.reduce(
        (sum, ingredient) => sum + ingredient.price,
        selectedBun ? selectedBun.price * 2 : 0
      ),
    [selectedIngredients, selectedBun]
  );

  const handleSubmit = useCallback(() => {
    if (!selectedBun) {
      return;
    }
    openModal(selectedIngredients);
  }, [openModal, selectedIngredients, selectedBun]);

  return (
    <section
      className={`mr-5 pl-4 ${styles.constructor}`}
      aria-label="Конструктор бургера">
      <ul className={`mt-25 ${styles.partsList}`}>
        <li className={`mr-4 ${styles.part}`}>
          {!selectedBun ? (
            <BunPlug position="top">Добавьте булочку</BunPlug>
          ) : (
            <ConstructorElement
              isLocked={true}
              type="top"
              text={`${selectedBun ? selectedBun.name : 'булка'} (верх)`}
              price={selectedBun ? selectedBun.price : 0}
              thumbnail={selectedBun ? selectedBun.image : 'Изображение'}
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
                      <li
                        key={ingredient._id + index}
                        className={`mr-2 ${styles.part}`}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                          text={ingredient.name}
                          price={ingredient.price}
                          thumbnail={ingredient.image}
                        />
                      </li>
                    );
                  })
                : null}
            </ul>
          )}
        </li>

        <li className={`mr-4 ${styles.part}`}>
          {!selectedBun ? (
            <BunPlug position="bottom" />
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
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default BurgerConstructor;

//HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--
// const selectedIngredients = [
//   {
//     _id: '60d3b41abdacab0026a733c8',
//     name: 'Филе Люминесцентного тетраодонтимформа',
//     type: 'main',
//     proteins: 44,
//     fat: 26,
//     carbohydrates: 85,
//     calories: 643,
//     price: 988,
//     image: 'https://code.s3.yandex.net/react/code/meat-03.png',
//     image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
//     image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
//     __v: 0
//   },
//   {
//     _id: '60d3b41abdacab0026a733cb',
//     name: 'Биокотлета из марсианской Магнолии',
//     type: 'main',
//     proteins: 420,
//     fat: 142,
//     carbohydrates: 242,
//     calories: 4242,
//     price: 424,
//     image: 'https://code.s3.yandex.net/react/code/meat-01.png',
//     image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
//     image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
//     __v: 0
//   }
// ];
// const selectedBun = {
//   _id: '60d3b41abdacab0026a733c6',
//   name: 'Краторная булка N-200i',
//   type: 'bun',
//   proteins: 80,
//   fat: 24,
//   carbohydrates: 53,
//   calories: 420,
//   price: 1255,
//   image: 'https://code.s3.yandex.net/react/code/bun-02.png',
//   image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
//   image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
//   __v: 0
// };
//HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--HARDCODE--
