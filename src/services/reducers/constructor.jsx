import update from 'immutability-helper';
import {
  DROP_INGREDIENT,
  DELETE_IGREDIENT,
  REORDER_INGREDIENT,
  CLEAR_ORDER_LIST
} from '../actions/constructor';
//--------------------------------------------------------------------------------

const burgerConstructorInitialState = {
  selectedIngredients: [],
  selectedBun: null
};

export const burgerConstructorReducer = (
  state = burgerConstructorInitialState,
  action
) => {
  switch (action.type) {
    case DROP_INGREDIENT: {
      const { ingredient } = action.payload;
      if (ingredient.type === 'bun') {
        return {
          ...state,
          selectedBun: ingredient
        };
      }
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, ingredient]
      };
    }
    case DELETE_IGREDIENT: {
      return {
        ...state,
        selectedIngredients: state.selectedIngredients.filter(
          (item, index) => index !== action.payload.index
        )
      };
    }
    case REORDER_INGREDIENT: {
      const { dragIndex, targetIndex } = action.payload;
      const itemsArray = [...state.selectedIngredients];
      const draggingItem = itemsArray[dragIndex];
      return {
        ...state,
        selectedIngredients: update(itemsArray, {
          $splice: [
            [dragIndex, 1],
            [targetIndex, 0, draggingItem]
          ]
        })
      };
    }
    case CLEAR_ORDER_LIST: {
      return {
        ...state,
        selectedIngredients: [],
        selectedBun: null
      };
    }
    default: {
      return state;
    }
  }
};
