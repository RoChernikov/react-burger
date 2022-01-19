import styles from './burger-constructor.module.css';
import { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CurrencyIcon,
  DragIcon,
  ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsContext } from '../../services/ingredients-context';
import { useDispatch, useSelector } from 'react-redux';

function BurgerConstructor({ openModal }) {
  const dispatch = useDispatch();
  const ingredientsData = useContext(IngredientsContext);
  const [totalSum, setTotalSum] = useState(0);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [pickedBun, setPickedBun] = useState({});

  useEffect(() => {
    setFilteredIngredients(ingredientsData.filter(item => item.type !== 'bun'));
    const bun = ingredientsData.find(item => item.type === 'bun');
    if (bun) setPickedBun(bun);
  }, [ingredientsData]);

  useEffect(() => {
    const pricesList = filteredIngredients.map(item => Number(item.price));
    const bunPrice = pickedBun.price ? pickedBun.price * 2 : 0;
    setTotalSum(pricesList.reduce((prev, cur) => prev + cur, bunPrice));
  }, [filteredIngredients, pickedBun]);

  const handleSubmit = useCallback(() => {
    if (!pickedBun) {
      return;
    }
    openModal(ingredientsData); //-------------------------------тут будут выбранные ингредиенты
  }, [openModal, ingredientsData, pickedBun]);

  return (
    <section
      className={`mr-5 pl-4 ${styles.constructor}`}
      aria-label="Конструктор бургера">
      <ul className={`mt-25 ${styles.partsList}`}>
        <li className={`mr-4 ${styles.part}`}>
          <ConstructorElement
            isLocked={true}
            type="top"
            text={`${pickedBun ? pickedBun.name : 'булка'} (верх)`}
            price={pickedBun ? pickedBun.price : 0}
            thumbnail={pickedBun ? pickedBun.image : 'Изображение'}
          />
        </li>

        <li>
          <ul className={`mt-4 mb-4 ${styles.partsListScroll}`}>
            {filteredIngredients
              ? filteredIngredients.map((ingredient, index) => {
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
        </li>

        <li className={`mr-4 ${styles.part}`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${pickedBun ? pickedBun.name : 'булка'} (низ)`}
            price={pickedBun ? pickedBun.price : 0}
            thumbnail={pickedBun ? pickedBun.image : 'Изображение'}
          />
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
