import styles from './constructor-item.module.css';
import { forwardRef, useCallback } from 'react';
import {
  DragIcon,
  ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientType } from '../../../../utils/types';
//--------------------------------------------------------------------------------

const ConstructorItem = forwardRef(
  ({ ingredient, handleDelete, index, isDrag }, ref) => {
    const deleteItem = useCallback(
      () => handleDelete(index),
      [handleDelete, index]
    );

    let opacity = isDrag ? 0.6 : 1;

    return (
      <li className={`mr-2 ${styles.item}`} ref={ref} style={{ opacity }}>
        <button className={styles.dragIcon}>
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
  }
);

ConstructorItem.propTypes = {
  ingredient: PropTypes.shape(IngredientType).isRequired,
  index: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  isDrag: PropTypes.bool
};

export default ConstructorItem;
