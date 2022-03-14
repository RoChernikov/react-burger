import styles from './constructor-item.module.scss';
import React from 'react';
import { forwardRef, useCallback } from 'react';
import {
  DragIcon,
  ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IConstructorItem } from '../../../../utils/interfaces';
//--------------------------------------------------------------------------------

const ConstructorItem = forwardRef<
  HTMLLIElement,
  IConstructorItem & { isDrag: boolean }
>(({ ingredient, handleDelete, index, isDrag }, ref) => {
  const deleteItem = useCallback(
    () => handleDelete(index),
    [handleDelete, index]
  );

  let opacity = isDrag ? 0.6 : 1;

  return (
    <li className={`mr-2 ${styles.item}`} ref={ref} style={{ opacity }}>
      <button className={styles.item__dragIcon}>
        <DragIcon type="primary" />
      </button>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={deleteItem}
      />
    </li>
  );
});

export default ConstructorItem;
