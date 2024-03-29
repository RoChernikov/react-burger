import React, { FC } from 'react';
import { useDrag } from 'react-dnd';
import BurgerIngredient from '../burger-ingredient/Burger-ingredient';
import { IBurgerIngredient } from '../../../../utils/interfaces';
//--------------------------------------------------------------------------------

const BurgerIngredientsDndWrapper: FC<IBurgerIngredient> = ({
  ingredient,
  count
}) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ingredient },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });
  return (
    <BurgerIngredient
      ingredient={ingredient}
      count={count}
      isDragging={isDrag}
      ref={dragRef}
    />
  );
};

export default BurgerIngredientsDndWrapper;
