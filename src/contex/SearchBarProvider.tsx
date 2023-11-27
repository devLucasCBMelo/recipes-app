import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import searchBarContext from './SearchBarContex';
import { fetchMealsIngredient, fetchMealsfirstLetter,
  fetchMealsname } from '../utils/fetchMealsApi';
import { fetchDrinksIngredient,
  fetchdDrinksName, fetchDrinksFirstLetter } from '../utils/fetchDrinksApi';
import { ValueBuscaType } from '../type';

type SearchProviderProps = {
  children:React.ReactNode,
};

function SearchBarProvider({ children }:SearchProviderProps) {
  const [dataList, setDataList] = useState([]);
  // const navigate = useNavigate();
  const location = useLocation();

  const alert = "Sorry, we haven't found any recipes for these filters";

  const fetchData = async (funcFetch, value: string) => {
    const data = await funcFetch(value);
    if (location.pathname.includes('/meals')) return !data.meals && window.alert(alert);

    if (location.pathname.includes('/drinks')) return !data.drinks && window.alert(alert);

    setDataList(data);
    console.log(dataList);
    console.log(data);
    return data;
  };

  const filterApi = (value: ValueBuscaType) => {
    if (location.pathname.includes('/meals')) {
      switch (value.radio) {
        case 'ingredient':
          return fetchData(fetchMealsIngredient, value.infoInput);

        case 'name':
          return fetchData(fetchMealsname, value.infoInput);

        case 'first-letter':
          if (value.infoInput.length > 1) {
            return window.alert('Your search must have only 1 (one) character');
          }
          return fetchData(fetchMealsfirstLetter, value.infoInput);
        default:
          return window.alert(alert);
      }
    }
    if (location.pathname.includes('/drinks')) {
      switch (value.radio) {
        case 'ingredient':
          return fetchData(fetchDrinksIngredient, value.infoInput);

        case 'name':
          return fetchData(fetchdDrinksName, value.infoInput);

        case 'first-letter':
          if (value.infoInput.length > 1) {
            return window.alert('Your search must have only 1 (one) character');
          }
          return fetchData(fetchDrinksFirstLetter, value.infoInput);
        default:
          return window.alert(alert);
      }
    }
  };

  const contex = {

    filterApi,

  };

  return (
    <searchBarContext.Provider value={ contex }>
      {children}
    </searchBarContext.Provider>
  );
}

export default SearchBarProvider;
