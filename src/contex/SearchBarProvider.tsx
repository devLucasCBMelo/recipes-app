import { useState } from 'react';
import searchBarContext from './SearchBarContex';
import { fetchMealsIngredient, fetchMealsfirstLetter,
  fetchMealsname } from '../utils/fetchMealsApi';
import { ValueBuscaType } from '../type';

type SearchProviderProps = {
  children:React.ReactNode,
};

function SearchBarProvider({ children }:SearchProviderProps) {
  const [valueBusca, setBusca] = useState<ValueBuscaType>();
  console.log(valueBusca);

  const fetchIngredientFunction = async () => {
    const data = await fetchMealsIngredient(valueBusca?.infoInput as string);
    console.log(data);
    return data;
  };

  const fetchNameFunction = async () => {
    const data = await fetchMealsname(valueBusca?.infoInput as string);
    console.log(data);
    return data;
  };

  const fetchfirstLetterFunction = async () => {
    const data = await fetchMealsfirstLetter(valueBusca?.infoInput as string);
    console.log(data);
    return data;
  };

  const filter = () => {
    switch (valueBusca?.radio) {
      case 'ingredient':
        return fetchIngredientFunction();

      case 'name':
        return fetchNameFunction();

      case 'first-letter':
        return fetchfirstLetterFunction();
      default: return 'alert';
    }
  };

  const contex = {
    setBusca,
    filter,
  };

  return (
    <searchBarContext.Provider value={ contex }>
      {children}
    </searchBarContext.Provider>
  );
}

export default SearchBarProvider;
