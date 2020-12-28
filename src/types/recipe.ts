export type Ingredient = {
  name: string;
  amount: number;
  unit: string;
};

export interface Recipe {
  _id: string;
  name: string;
  link: string;
  minutesToMake: number;
  servings: number;
  ingredients: Ingredient[];
  tags: string[];
  comment: string;
  rating: number;
  userId: string;
}