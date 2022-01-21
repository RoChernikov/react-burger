import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import { IngredientType } from '../../../../utils/types.js';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { REORDER_INGREDIENT } from '../../../../services/actions/actions.jsx';
import ConstructorItem from '../constructor-item/constructor-item';
//--------------------------------------------------------------------------------

function ConstructorItemDndWrapper({ ingredient, index, handleDelete }) {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [{ isDrag }, dragRef] = useDrag({
    type: 'constructor-item',
    item: { dragIndex: index },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'constructor-item',
    drop({ dragIndex }) {
      dispatch({
        type: REORDER_INGREDIENT,
        payload: {
          targetIndex: index,
          dragIndex: dragIndex
        }
      });
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });

  useEffect(
    function () {
      dragRef(dropTarget(ref));
    },
    [dragRef, dropTarget]
  );

  return (
    <ConstructorItem
      ingredient={ingredient}
      index={index}
      isHover={isHover}
      isDrag={isDrag}
      handleDelete={handleDelete}
      ref={ref}
    />
  );
}

ConstructorItemDndWrapper.propTypes = {
  ingredient: PropTypes.shape(IngredientType).isRequired,
  index: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default ConstructorItemDndWrapper;
