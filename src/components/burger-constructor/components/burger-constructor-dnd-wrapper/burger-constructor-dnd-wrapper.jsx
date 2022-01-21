import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import BurgerConstructor from '../../burger-constructor';
import { DROP_INGREDIENT } from '../../../../services/actions/actions';
//--------------------------------------------------------------------------------

function BurgerConstructorDndWrapper({ openModal }) {
  const dispatch = useDispatch();
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop({ ingredient }) {
      dispatch({ type: DROP_INGREDIENT, payload: { ingredient } });
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
