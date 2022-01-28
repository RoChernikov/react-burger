import { v4 as uuidv4 } from 'uuid';
export const DROP_INGREDIENT = 'DROP_INGREDIENT';
export const DELETE_IGREDIENT = 'DELETE_IGREDIENT';
export const REORDER_INGREDIENT = 'REORDER_IGREDIENT';
export const CLEAR_ORDER_LIST = 'CLEAR_ORDER_LIST';
//--------------------------------------------------------------------------------

export const dropIngredient = ingredient => {
  return {
    type: DROP_INGREDIENT,
    payload: { ingredient: { ...ingredient, uid: uuidv4() } }
  };
};

export const deleteIngredient = index => {
  return { type: DELETE_IGREDIENT, payload: { index } };
};

export const reorderIngredient = (targetIndex, dragIndex) => {
  return {
    type: REORDER_INGREDIENT,
    payload: {
      targetIndex: targetIndex,
      dragIndex: dragIndex
    }
  };
};

export const clearOrderList = () => {
  return {
    type: CLEAR_ORDER_LIST
  };
};
