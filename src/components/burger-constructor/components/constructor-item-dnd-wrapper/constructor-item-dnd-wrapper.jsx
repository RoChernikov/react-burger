import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import { IngredientType } from '../../../../utils/types.js';
import { useDrag, useDrop, DragPreviewImage } from 'react-dnd';
import { useDispatch } from 'react-redux';
import ConstructorItem from '../constructor-item/constructor-item';
import { burgerConstructorSlice } from '../../../../services/slices/burger-constructor';
//--------------------------------------------------------------------------------

function ConstructorItemDndWrapper({ ingredient, index, handleDelete }) {
  const dispatch = useDispatch();
  const { reorderIngredient } = burgerConstructorSlice.actions;

  const ref = useRef(null);

  const [{ isDrag }, dragRef, dragPreview] = useDrag({
    type: 'constructor-item',
    item: { dragIndex: index },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });
  const [, dropTarget] = useDrop({
    accept: 'constructor-item',
    collect: monitor => ({
      handlerId: monitor.getHandlerId()
    }),
    hover(item) {
      if (!ref.current) {
        return;
      }
      const targetIndex = index;
      const dragIndex = item.dragIndex;
      if (dragIndex === targetIndex) {
        return;
      }
      dispatch(reorderIngredient({ targetIndex, dragIndex }));
      item.dragIndex = targetIndex;
    }
  });

  useEffect(
    function () {
      dragRef(dropTarget(ref));
    },
    [dragRef, dropTarget]
  );

  return (
    <>
      <DragPreviewImage src={ingredient.image} connect={dragPreview} />
      <ConstructorItem
        ingredient={ingredient}
        index={index}
        isDrag={isDrag}
        handleDelete={handleDelete}
        ref={ref}
      />
    </>
  );
}

ConstructorItemDndWrapper.propTypes = {
  ingredient: PropTypes.shape(IngredientType).isRequired,
  index: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default ConstructorItemDndWrapper;
