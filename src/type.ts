export type ValueBuscaType = {
  infoInput:string,
  radio: string,
};

export type RecipeType = {
  id: string;
  type: string;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  doneDate?: string;
  tags?: string[];
};
export type KeyLocalStorageType = 'favoriteRecipes' | 'doneRecipes';
