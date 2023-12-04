export type ValueBuscaType = {
  infoInput:string,
  radio: string,
};

export interface Recipe {
  idMeal?: string;
  strMeal?: string;
  strMealThumb?: string;
  strCategory?: string;
  strInstructions?: string;
  ingredients?: string[];
  strArea?: string;
  strYoutube?: string;
  idDrink?: string;
  strDrink?: string;
  strDrinkThumb?: string;
  strAlcoholic?: string;
  containsAlcoholic?: boolean;
}

export type HeaderProps = {
  namePage: string,
  pageIcon: string,
};

export type PageProps = {
  namePage: string,

};

export type DataType = {
  meals: []
};

export type MealType = {
  idMeal: number,
  strMeal: string,
  strMealThumb: string,
};

export type DataMealType = {
  meals: [MealType]
};

export type DrinkType = {
  idDrink: number,
  strDrink: string,
  strDrinkThumb: string,
};

export type DataDrinkType = {
  drinks: [DrinkType]
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

export type KeyLocalStorageType = 'favoriteRecipes' | 'doneRecipes' | 'user';

export type UserLocalStorage = {
  email: string;
};

export type DoneRecipesLocalStorage = {
  id: string;
  type: 'meal' | 'drink';
  nationality: string | '';
  category: string | '';
  alcoholicOrNot: 'alcoholic' | 'non-alcoholic' | '';
  name: string;
  image: string;
  doneDate: string;
  tags: string[];
};
