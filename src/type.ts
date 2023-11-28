export type ValueBuscaType = {
  infoInput:string,
  radio: string,
};

export type HeaderProps = {
  namePage: string
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
