import { createContext } from 'react';
import { DataDrinkType, ValueBuscaType, DataMealType, RecipeType } from '../type';

type SearchBarContextType = {

  filterApi: (value: ValueBuscaType)=>Promise<void>,
  drinkData: DataDrinkType,
  setDrinkData:React.Dispatch<React.SetStateAction<DataDrinkType>>
  mealsData: DataMealType,
  setMealsData:React.Dispatch<React.SetStateAction<DataMealType>>
  showAlert: boolean,
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>
  favorites: RecipeType[],
  setFavorites: React.Dispatch<React.SetStateAction<RecipeType[]>>,
  doneRecipes: RecipeType[],
  setDoneRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>,
  filtersRecipes: RecipeType[],
  setFiltersRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>,

};

const searchBarContext = createContext({} as SearchBarContextType);

export default searchBarContext;
