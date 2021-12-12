import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import {
  Button,
  CurrencyIcon,
  DragIcon,
  ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../utils/types';

function BurgerConstructor({ ingredientsData, openModal }) {
  const pickedBun = ingredientsData[0]; //hardcode
  const filteredIngredients = ingredientsData.filter(
    item => item.type !== 'bun'
  );
  return (
    <section className={`mr-5 pl-4 ${styles.constructor}`}>
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
              ? filteredIngredients.map(ingredient => {
                  return (
                    <li key={ingredient._id} className={`mr-2 ${styles.part}`}>
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
            text={`${pickedBun ? pickedBun.name : 'булка'} (верх)`}
            price={pickedBun ? pickedBun.price : 0}
            thumbnail={pickedBun ? pickedBun.image : 'Изображение'}
          />
        </li>
      </ul>
      <div className={`mt-10 mr-4 ${styles.order}`}>
        <p className="text text_type_digits-medium">610</p>
        <span className="ml-2 mr-10">
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredientsData: PropTypes.arrayOf(PropTypes.shape(IngredientType).isRequired)
    .isRequired,
  openModal: PropTypes.func.isRequired
};

export default BurgerConstructor;
