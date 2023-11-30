export type ValueBuscaType = {
  infoInput:string,
  radio: string,
};

export interface Recipe {
  strMeal?: string;
  strMealThumb?: string;
  strCategory?: string;
  strInstructions?: string;
  ingredients?: string[];
  strYoutube?: string;
  strDrink?: string;
  strDrinkThumb?: string;
  strAlcoholic?: string;
  containsAlcoholic?: boolean;
}
