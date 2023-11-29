import { createContext } from 'react';
import { DataType, ValueBuscaType } from '../type';

type SearchBarContextType = {
  setBusca: (inputBusca:object)=> void,
  filterApi: (value: ValueBuscaType)=>void,
  valueBusca: object,
  dataList: DataType,
  showAlert: boolean,
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>
};

const searchBarContext = createContext({} as SearchBarContextType);

export default searchBarContext;
