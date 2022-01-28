import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import BurgerConstructor from '../../burger-constructor';
import { dropIngredient } from '../../../../services/actions/constructor';
//--------------------------------------------------------------------------------

function BurgerConstructorDndWrapper({ openModal }) {
  const dispatch = useDispatch();
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
