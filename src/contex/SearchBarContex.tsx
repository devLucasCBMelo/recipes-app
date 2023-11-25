import { createContext } from 'react';

type SearchBarContextType = {
  setBusca: ({})=> void,
  filter: ()=>void,

};

const searchBarContext = createContext({} as SearchBarContextType);

export default searchBarContext;
