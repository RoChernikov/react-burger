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
  ({ ingredient, handleDelete, index, isHover, isDrag }, ref) => {
    const deleteItem = useCallback(
      () => handleDelete(index),
      [handleDelete, index]
    );
    const visibilityStyle = isDrag ? 'hidden' : 'visible';
    const hoverStyle = isHover
      ? `mr-2 ${styles.item} ${styles.hover}`
      : `mr-2 ${styles.item}`;

    return (
      <li
        className={hoverStyle}
        ref={ref}
        style={{ visibility: `${visibilityStyle}` }}>
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
  isHover: PropTypes.bool,
  isDrag: PropTypes.bool
};

export default ConstructorItem;
