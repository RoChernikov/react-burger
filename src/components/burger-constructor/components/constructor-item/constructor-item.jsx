import styles from './constructor-item.module.css';
import { forwardRef } from 'react';
import { useCallback } from 'react';
import {
  DragIcon,
  ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientType } from '../../../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_IGREDIENT } from '../../../../services/actions/actions';
//--------------------------------------------------------------------------------

const ConstructorItem = forwardRef(({ ingredient, index, isHover }, ref) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback(() => {
    dispatch({ type: DELETE_IGREDIENT, payload: index });
  }, [dispatch]);

  return (
    <li
      className={
        !isHover ? `mr-2 ${styles.item}` : `mr-2 ${styles.item} ${styles.hover}`
      }
      ref={ref}>
      <button className={styles.dragIcon}>
        <DragIcon type="primary" />
      </button>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleDelete}
      />
    </li>
  );
});

ConstructorItem.propTypes = {
  ingredient: PropTypes.shape(IngredientType).isRequired,
  index: PropTypes.number.isRequired,
  isHover: PropTypes.bool
};

export default ConstructorItem;
