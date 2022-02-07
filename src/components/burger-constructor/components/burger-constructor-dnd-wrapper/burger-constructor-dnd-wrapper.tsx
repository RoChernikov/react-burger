import React, { FC } from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch } from '../../../../services/hooks';
import BurgerConstructor from '../../burger-constructor';
import { burgerConstructorSlice } from '../../../../services/slices/constructor';
import { TDropIngredient } from '../../../../utils/types';
import { IBurgerConstructor } from '../../../../utils/interfaces';
//--------------------------------------------------------------------------------

const BurgerConstructorDndWrapper: FC<IBurgerConstructor> = ({ openModal }) => {
  const dispatch = useAppDispatch();
  const { dropIngredient } = burgerConstructorSlice.actions;
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop({ ingredient }: TDropIngredient) {
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
