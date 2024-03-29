import { ReactNode } from 'react';

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

export type TWsIngredient = {
  _id?: string;
  name?: string;
  type?: TMeal;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  calories?: number;
  price?: number;
  image?: string;
  image_mobile?: string;
  image_large?: string;
  __v?: number;
  uid?: string;
  qty?: number;
};

export type TMeal = 'bun' | 'sauce' | 'main';

export type TOrder = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

export type TDestructIngredient = { ingredient: TIngredient };

export type TCloseModal = { closeModal: () => void; children?: ReactNode };

export type TUser = {
  name: string;
  email: string;
  password?: string;
};

export type TStatus = 'pending' | 'success' | 'failed';

export type TWsOrder = {
  _id: string;
  status: string | 'pending' | 'done';
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export type TOnMessagePayload = {
  success: boolean;
  orders: TWsOrder[];
  total: number;
  totalToday: number;
};
