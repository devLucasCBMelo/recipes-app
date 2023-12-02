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

  const {
    setMealsData,
    setDrinkData,
    noFilterMealsData,
    noFilterDrinkData,
  } = useContext(searchBarContext);

  const saveFilter = async (filter: string, namePage: string) => {
    setFilterSelected(filter);

    // checa se é o mesmo filtro, se for, traz o array sem filtros
    if (filter === filterSelected && namePage === 'meals') {
      console.log(filter);

      return setMealsData(noFilterMealsData);
    }

    if (filter === filterSelected && namePage === 'drinks') {
      return setDrinkData(noFilterDrinkData);
    }

    // caso não seja o mesmo filtro, filtra o array
    if (namePage === 'meals') {
      const filtredMealsArray = await fetchMealsByCategory(filter);
      return setMealsData(filtredMealsArray);
    }

    if (namePage === 'drinks') {
      const filtredDrinksArray = await fetchDrinksByCategory(filter);
      return setDrinkData(filtredDrinksArray);
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
