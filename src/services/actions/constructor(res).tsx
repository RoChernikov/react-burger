import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '../../utils/types';
export const DROP_INGREDIENT = 'DROP_INGREDIENT';
export const DELETE_IGREDIENT = 'DELETE_IGREDIENT';
export const REORDER_INGREDIENT = 'REORDER_IGREDIENT';
export const CLEAR_ORDER_LIST = 'CLEAR_ORDER_LIST';
//--------------------------------------------------------------------------------

export interface IDropIngredient {
  readonly type: typeof DROP_INGREDIENT;
  readonly ingredient: TIngredient;
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_IGREDIENT;
  readonly index: number;
}

export interface IReorderIngredient {
  readonly type: typeof REORDER_INGREDIENT;
  readonly targetIndex: number;
  readonly dragIndex: number;
}

export interface IClearOrderList {
  readonly type: typeof CLEAR_ORDER_LIST;
}

export type TConstructorActions =
  | IDropIngredient
  | IDeleteIngredient
  | IReorderIngredient
  | IClearOrderList;

export const dropIngredient = (ingredient: TIngredient): IDropIngredient => {
  return {
    type: DROP_INGREDIENT,
    ingredient: { ...ingredient, uid: uuidv4() }
  };
};

export const deleteIngredient = (index: number): IDeleteIngredient => {
  return { type: DELETE_IGREDIENT, index };
};

export const reorderIngredient = (
  targetIndex: number,
  dragIndex: number
): IReorderIngredient => {
  return {
    type: REORDER_INGREDIENT,
    targetIndex,
    dragIndex
  };
};

export const clearOrderList = (): IClearOrderList => {
  return {
    type: CLEAR_ORDER_LIST
  };
};
