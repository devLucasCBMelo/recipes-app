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
  strYoutube?: string;
  idDrink?: string;
  strDrink?: string;
  strDrinkThumb?: string;
  strAlcoholic?: string;
  containsAlcoholic?: boolean;
}
