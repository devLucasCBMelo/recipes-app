import { useContext, useState } from 'react';
import filterBarContext from './FilterBarContext';
import { fetchMealsByCategory } from '../utils/fetchMealsApi';
import searchBarContext from './SearchBarContex';
import { fetchDrinksByCategory } from '../utils/fetchDrinksApi';

type FilterBarProviderType = {
  children: React.ReactNode
};

function FilterBarProvider({ children }: FilterBarProviderType) {
  const [filterSelected, setFilterSelected] = useState('');

  const { setMealsData, setDrinkData } = useContext(searchBarContext);

  const saveFilter = async (filter: string, namePage: string) => {
    setFilterSelected(filter);
    if (namePage === 'meals') {
      const filtredMealsArray = await fetchMealsByCategory(filter);
      setMealsData(filtredMealsArray);
    }

    if (namePage === 'drinks') {
      const filtredDrinksArray = await fetchDrinksByCategory(filter);
      setDrinkData(filtredDrinksArray);
    }
  };

  const filterContext = {
    filterSelected,
    saveFilter,
  };

  return (
    <filterBarContext.Provider value={ filterContext }>
      {children}
    </filterBarContext.Provider>
  );
}

export default FilterBarProvider;
