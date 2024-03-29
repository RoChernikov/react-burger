import React, { FC } from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch } from '../../../../services/hooks';
import BurgerConstructor from '../../burger-constructor';
import { dropIngredient } from '../../../../services/slices/constructor';
import { TDestructIngredient } from '../../../../utils/types';
import { IBurgerConstructor } from '../../../../utils/interfaces';
//--------------------------------------------------------------------------------

const BurgerConstructorDndWrapper: FC<IBurgerConstructor> = ({ openModal }) => {
  const dispatch = useAppDispatch();
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop({ ingredient }: TDestructIngredient) {
      dispatch(dropIngredient(ingredient));
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });

  return (
    <BurgerConstructor
      openModal={openModal}
      isHover={isHover}
      ref={dropTarget}
    />
  );
};
export default BurgerConstructorDndWrapper;
