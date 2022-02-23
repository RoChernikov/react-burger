import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import update from 'immutability-helper';
import { TIngredient } from '../../utils/types';
//--------------------------------------------------------------------------------

interface constructorState {
  selectedIngredients: TIngredient[];
  selectedBun: TIngredient | null;
}

const initialState: constructorState = {
  selectedIngredients: [],
  selectedBun: null
};

export const burgerConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    dropIngredient(state, action: PayloadAction<TIngredient>) {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.selectedBun = ingredient;
      } else {
        state.selectedIngredients.push({ ...ingredient, uid: uuidv4() });
      }
    },
    deleteIngredient(state, action: PayloadAction<number>) {
      state.selectedIngredients = state.selectedIngredients.filter(
        (item, index) => index !== action.payload
      );
    },
    reorderIngredient(
      state,
      action: PayloadAction<{ targetIndex: number; dragIndex: number }>
    ) {
      const dragIndex = action.payload.dragIndex;
      const targetIndex = action.payload.targetIndex;
      const itemsArray = [...state.selectedIngredients];
      const draggingItem = itemsArray[dragIndex];
      state.selectedIngredients = update(itemsArray, {
        $splice: [
          [dragIndex, 1],
          [targetIndex, 0, draggingItem]
        ]
      });
    },
    clearOrderList(state) {
      state.selectedIngredients = [];
      state.selectedBun = null;
    }
  }
});

export const {
  dropIngredient,
  deleteIngredient,
  reorderIngredient,
  clearOrderList
} = burgerConstructorSlice.actions;
