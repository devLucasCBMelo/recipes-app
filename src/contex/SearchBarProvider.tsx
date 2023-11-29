import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import searchBarContext from './SearchBarContex';
import { fetchMealsIngredient, fetchMealsfirstLetter,
  fetchMealsname } from '../utils/fetchMealsApi';
import { fetchDrinksIngredient,
  fetchDrinksName, fetchDrinksFirstLetter } from '../utils/fetchDrinksApi';
import { ValueBuscaType } from '../type';

type SearchProviderProps = {
  children:React.ReactNode,
};

function SearchBarProvider({ children }:SearchProviderProps) {
  const [dataList, setDataList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname.includes('/meals') ? '/meals' : '/drinks';

  const alert = "Sorry, we haven't found any recipes for these filters";

  const fetchData = async (funcFetch, value: string) => {
    const data = await funcFetch(value);

    if (path === '/meals') {
      if (!data.meals) {
        return window.alert(alert);
      }
      if (data.meals?.length === 1) {
        return navigate(`${path}/${data.meals[0]?.idMeal}`);
      }
    }

    if (path === '/drinks') {
      if (!data.drinks) {
        return window.alert(alert);
      }
      if (data.drinks?.length === 1) {
        return navigate(`${path}/${data.drinks[0]?.idDrink}`);
      }
    }

    setDataList(data);
  };

  // console.log(filterDetalhes());
  const filterApi = async (value: ValueBuscaType) => {
    if (location.pathname.includes('/meals')) {
      switch (value.radio) {
        case 'name':
          console.log(fetchData(fetchMealsname, value.infoInput));
          return fetchData(fetchMealsname, value.infoInput);

        case 'first-letter':
          if (value.infoInput.length > 1) {
            return window.alert('Your search must have only 1 (one) character');
          }
          return fetchData(fetchMealsfirstLetter, value.infoInput);
        default:
          return fetchData(fetchMealsIngredient, value.infoInput);
      }
    }
    if (location.pathname.includes('/drinks')) {
      switch (value.radio) {
        case 'name':
          return fetchData(fetchDrinksName, value.infoInput);

        case 'first-letter':
          if (value.infoInput.length > 1) {
            return window.alert('Your search must have only 1 (one) character');
          }
          return fetchData(fetchDrinksFirstLetter, value.infoInput);
        default:
          return fetchData(fetchDrinksIngredient, value.infoInput);
      }
    }
  };

  const contex = {

    filterApi,
    dataList,
    showAlert,
    setShowAlert,
  };

  return (
    <searchBarContext.Provider value={ contex }>
      {children}
    </searchBarContext.Provider>
  );
}

export default SearchBarProvider;
