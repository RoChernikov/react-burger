import { ReactNode } from 'react';
import { TIngredient, TMeal } from './types';

export interface IHeaderLink {
  to: string;
  icon: ReactNode;
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

export interface IBurgerIngredient {
  ingredient: TIngredient;
  openModal: (ingredient: TIngredient) => void;
  count: number;
}

export interface IIngredientsNavBar {
  handleSelect: (value: string) => void;
  selectedMeal: TMeal;
}

export interface IIngredientsCategory {
  id: string;
  title: string;
  ingredients: TIngredient[];
  openModal: (ingredient: TIngredient) => void;
  counts: { [ingredient: string]: number };
}
