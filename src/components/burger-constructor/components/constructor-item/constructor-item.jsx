import styles from './constructor-item.module.css';
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

const ConstructorItem = ({ ingredient, index }) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback(() => {
    dispatch({ type: DELETE_IGREDIENT, payload: index });
  }, [dispatch]);

  return (
    <li className={`mr-2 ${styles.item}`}>
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
};

ConstructorItem.propTypes = {
  ingredient: PropTypes.shape(IngredientType).isRequired,
  index: PropTypes.number.isRequired
};

export default ConstructorItem;
