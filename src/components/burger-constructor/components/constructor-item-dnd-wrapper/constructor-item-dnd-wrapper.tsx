import React, { useRef, useEffect, FC } from 'react';
import { useDrag, useDrop, DragPreviewImage } from 'react-dnd';
import { useDispatch } from 'react-redux';
import ConstructorItem from '../constructor-item/constructor-item';
import { reorderIngredient } from '../../../../services/slices/constructor';
import { IConstructorItem } from '../../../../utils/interfaces';
//--------------------------------------------------------------------------------

const ConstructorItemDndWrapper: FC<IConstructorItem> = ({
  ingredient,
  index,
  handleDelete
}) => {
  const dispatch = useDispatch();

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
    hover(item: { dragIndex: number }) {
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
};

export default ConstructorItemDndWrapper;
