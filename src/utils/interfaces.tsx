import { ReactNode } from 'react';
import { TIngredient } from './types';

export interface IHeaderLink {
  icon: ReactNode;
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}

export interface IBurgerConstructor {
  openModal: (selectedIngredients: TIngredient[]) => void;
}

export interface IBunBlug {
  children?: string;
  position: string;
  border: string;
}

export interface IIngredientsPlug {
  children?: string;
}

export interface IConstructorItem {
  ingredient: TIngredient;
  handleDelete: (index: number) => void;
  index: number;
}
