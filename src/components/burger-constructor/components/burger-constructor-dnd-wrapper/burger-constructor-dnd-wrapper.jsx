import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { useAppDispatch } from '../../../../services/hooks/hooks';
import BurgerConstructor from '../../burger-constructor';
import { burgerConstructorSlice } from '../../../../services/slices/burger-constructor';
//--------------------------------------------------------------------------------

function BurgerConstructorDndWrapper({ openModal }) {
  const dispatch = useAppDispatch();
  const { dropIngredient } = burgerConstructorSlice.actions;
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop({ ingredient }) {
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
}

BurgerConstructorDndWrapper.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default BurgerConstructorDndWrapper;
