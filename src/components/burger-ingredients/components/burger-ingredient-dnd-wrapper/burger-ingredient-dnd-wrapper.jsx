import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import BurgerIngredient from '../burger-ingredient/BurgerIngredient';
import { IngredientType } from '../../../../utils/types';
//--------------------------------------------------------------------------------

function BurgerIngredientDndWrapper({ ingredient, openModal }) {
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
      openModal={openModal}
      isDragging={isDrag}
      ref={dragRef}
    />
  );
}

BurgerIngredientDndWrapper.propTypes = {
  ingredient: PropTypes.shape(IngredientType).isRequired,
  openModal: PropTypes.func.isRequired
};

export default BurgerIngredientDndWrapper;
