import { createContext } from 'react';
import { DataDrinkType, ValueBuscaType, DataMealType } from '../type';

type SearchBarContextType = {

  filterApi: (value: ValueBuscaType)=>Promise<void>,
  drinkData: DataDrinkType,
  setDrinkData:React.Dispatch<React.SetStateAction<DataDrinkType>>
  mealsData: DataMealType,
  setMealsData:React.Dispatch<React.SetStateAction<DataMealType>>
  noFilterMealsData: DataMealType,
  setNoFilterMealsData: (data: DataMealType) => void,
  noFilterDrinkData: DataDrinkType,
  setNoFilterDrinkData: (data: DataDrinkType) => void,

};

const searchBarContext = createContext({} as SearchBarContextType);

export default searchBarContext;
