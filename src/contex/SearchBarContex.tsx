import { createContext } from 'react';
import { DataType, RecipeType, ValueBuscaType } from '../type';

type SearchBarContextType = {
  setBusca: (inputBusca:object)=> void,
  filterApi: (value: ValueBuscaType)=>void,
  valueBusca: object,
  dataList: DataType,
  showAlert: boolean,
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>
  favorites: RecipeType[],
  setFavorites: React.Dispatch<React.SetStateAction<RecipeType[]>>,
};

const searchBarContext = createContext({} as SearchBarContextType);

export default searchBarContext;
