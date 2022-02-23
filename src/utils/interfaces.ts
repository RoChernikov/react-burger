import { ReactNode, SyntheticEvent } from 'react';
import { TIngredient, TMeal } from './types';
import { Location } from 'history';

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
  counts: { [ingredient: string]: number };
}

export interface IForm {
  children: ReactNode;
  onSubmit?: (evt: SyntheticEvent) => void;
  title: string;
}

export interface IInputWrapper {
  children: ReactNode;
}

export interface ISubmit {
  children: ReactNode;
}

export interface IFormHint {
  children: string;
  link: string;
  caption: string;
}

export interface ILocationParams extends Location {
  from: {
    pathname: string;
    state: object;
    search: string;
    hash: string;
    key: string;
  };
  background?: Location;
}

export interface IRegisterForm {
  email: string;
  password: string;
  name: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}
