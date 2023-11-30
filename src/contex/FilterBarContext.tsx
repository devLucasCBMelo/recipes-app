import { createContext } from 'react';

type FilterBarContextType = {
  filterSelected: string
  saveFilter: (filter: string, namePage: string) => void
};

const filterBarContext = createContext({} as FilterBarContextType);

export default filterBarContext;
