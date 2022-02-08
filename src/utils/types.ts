export type TIngredient = {
  _id: string;
  name: string;
  type: TMeal;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uid?: string;
};

export type TMeal = 'bun' | 'sauce' | 'main';

export type TOpenIngredientModal = {
  openModal: (ingredient: TIngredient) => void;
};

export type TOrder = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

export type TDropIngredient = { ingredient: TIngredient };
