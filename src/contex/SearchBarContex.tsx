import { createContext } from 'react';
import { ValueBuscaType } from '../type';

type SearchBarContextType = {
  setBusca: (inputBusca:object)=> void,
  filterApi: (value: ValueBuscaType)=>void,
  valueBusca: object,

};

const searchBarContext = createContext({} as SearchBarContextType);

export default searchBarContext;
