import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SELECT_INGREDIENT,
  UNSELECT_INGREDIENT,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  DELETE_ORDER,
  DROP_INGREDIENT,
  DELETE_IGREDIENT,
  REORDER_IGREDIENT
} from '../actions/actions';
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------ingredients
const ingredientsInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  selectedIngredient: null
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredientsRequest: false,
        ingredients: action.payload.ingredients
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...ingredientsInitialState,
        ingredientsFailed: true
      };
    }
    case SELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: action.payload.ingredient
      };
    }
    case UNSELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: null
      };
    }
    default: {
      return state;
    }
  }
};

//--------------------------------------------------------------------------------order
const orderInitialState = {
  order: null,
  orderNumberRequest: false,
  orderNumberFailed: false
};

export const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderNumberRequest: true
      };
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderNumberRequest: false,
        orderNumberFailed: false,
        order: action.payload.order
      };
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...orderInitialState,
        orderNumberFailed: true
      };
    }
    case DELETE_ORDER: {
      return {
        ...state,
        order: null
      };
    }
    default:
      return state;
  }
};

//--------------------------------------------------------------------------------burger constructor
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
      const { ingredient } = action.payload;
      return {
        ...state,
        selectedIngredients: state.selectedIngredients.filter(
          (item, index) => index !== ingredient.deleteIndex
        )
      };
    }
    case REORDER_IGREDIENT: {
    }
    default: {
      return state;
    }
  }
};
