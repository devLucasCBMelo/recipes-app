import { createContext } from 'react';

type SearchBarContextType = {
  setBusca: (inputBusca:object)=> void,
  filter: ()=>void,

};

const searchBarContext = createContext({} as SearchBarContextType);

export default searchBarContext;
