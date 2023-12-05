import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import searchBarContext from './SearchBarContex';
import { fetchMealsIngredient, fetchMealsfirstLetter,
  fetchMealsname } from '../utils/fetchMealsApi';
import { fetchDrinksIngredient,
  fetchDrinksName, fetchDrinksFirstLetter } from '../utils/fetchDrinksApi';
import { RecipeType, ValueBuscaType, DataDrinkType, DataMealType } from '../type';

type SearchProviderProps = {
  children:React.ReactNode,
};

function SearchBarProvider({ children }:SearchProviderProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [favorites, setFavorites] = useState<RecipeType[]>([]);
  const [doneRecipes, setDoneRecipes] = useState<RecipeType[]>([]);
  const [filtersRecipes, setFiltersRecipes] = useState<RecipeType[]>([]);
  const [mealsData, setMealsData] = useState<DataMealType>();
  const [drinkData, setDrinkData] = useState<DataDrinkType>();
  const [noFilterMealsData, setNoFilterMealsData] = useState<DataMealType>();
  const [noFilterDrinkData, setNoFilterDrinkData] = useState<DataDrinkType>();
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname.includes('/meals') ? '/meals' : '/drinks';

  const alert = "Sorry, we haven't found any recipes for these filters";

  const fetchData = async (funcFetch:any, value: string) => {
    const data = await funcFetch(value);

    if (path === '/meals') {
      if (!data.meals) {
        return window.alert(alert);
      }
      if (data.meals?.length === 1) {
        return navigate(`${path}/${data.meals[0]?.idMeal}`);
      }
      setMealsData(data);
    }

    if (path === '/drinks') {
      if (!data.drinks) {
        return window.alert(alert);
      }
      if (data.drinks?.length === 1) {
        return navigate(`${path}/${data.drinks[0]?.idDrink}`);
      }
      setDrinkData(data);
    }
  };

  const filterApi = async (value: ValueBuscaType) => {
    if (location.pathname.includes('/meals')) {
      switch (value.radio) {
        case 'name':
          return fetchData(fetchMealsname, value.infoInput);

        case 'first-letter':
          if (value.infoInput.length > 1) {
            return window.alert('Your search must have only 1 (one) character');
          }
          return fetchData(fetchMealsfirstLetter, value.infoInput);
        case 'ingredient':
          return fetchData(fetchMealsIngredient, value.infoInput);
        default:
          return fetchData(fetchMealsname, '');
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
        case 'ingredient':
          return fetchData(fetchDrinksIngredient, value.infoInput);
        default:
          return fetchData(fetchMealsname, '');
      }
    }
  };

  const contex = {

    filterApi,
    mealsData,
    setMealsData,
    drinkData,
    setDrinkData,
    showAlert,
    setShowAlert,
    favorites,
    setFavorites,
    doneRecipes,
    setDoneRecipes,
    filtersRecipes,
    setFiltersRecipes,
    noFilterDrinkData,
    setNoFilterDrinkData,
    noFilterMealsData,
    setNoFilterMealsData,
  };

  return (
    <searchBarContext.Provider value={ contex }>
      {children}
    </searchBarContext.Provider>
  );
}

export default SearchBarProvider;
