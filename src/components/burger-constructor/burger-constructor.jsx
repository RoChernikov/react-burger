import styles from './burger-constructor.module.css';
import {
  Button,
  CurrencyIcon,
  DragIcon,
  ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor() {
  return (
    <section className={`mr-5 pl-4 ${styles.constructor}`}>
      <ul className={`mt-25 ${styles.partsList}`}>
        <li className={`mr-4 ${styles.part}`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={20}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </li>
        <li>
          <ul className={`mt-4 mb-4 ${styles.partsListScroll}`}>
            <li className={`mr-2 ${styles.part}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Соус традиционный галактический"
                price={30}
                thumbnail="https://code.s3.yandex.net/react/code/sauce-03.png"
              />
            </li>
            <li className={`mr-2 ${styles.part}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Мясо бессмертных моллюсков Protostomia"
                price={300}
                thumbnail="https://code.s3.yandex.net/react/code/meat-02.png"
              />
            </li>
            <li className={`mr-2 ${styles.part}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Плоды Фалленианского дерева"
                price={80}
                thumbnail="https://code.s3.yandex.net/react/code/sp_1.png"
              />
            </li>
            <li className={`mr-2 ${styles.part}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Хрустящие минеральные кольца"
                price={80}
                thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
              />
            </li>
            <li className={`mr-2 ${styles.part}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Хрустящие минеральные кольца"
                price={80}
                thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
              />
            </li>
          </ul>
        </li>

        <li className={`mr-4 ${styles.part}`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={20}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </li>
      </ul>
      <div className={`mt-10 mr-4 ${styles.order}`}>
        <p className="text text_type_digits-medium">610</p>
        <span className="ml-2 mr-10">
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
