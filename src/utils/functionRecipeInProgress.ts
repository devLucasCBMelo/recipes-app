import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchdDrinksDetails } from './fetchDrinksApi';
import { fetchMealsDetails } from './fetchMealsApi';
import { getLocalStorage } from './localStorage';

export const useRecipeData = () => {
  const [data, setData] = useState<any>({});
  const [ingredients, setIngredients] = useState<any>([]);
  const [checked, setChecked] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [erro, setErro] = useState(false);

  const { id: idFinal } = useParams();
  const navigate = useNavigate();

  const chamarDadosApi = async (idd: any, type: string) => {
    try {
      let retorno;

      if (type === 'drinks') {
        retorno = await fetchdDrinksDetails(idd);
      } else if (type === 'meals') {
        retorno = await fetchMealsDetails(idd);
      }

      setData(retorno);

      const ingredientes = [];
      const dataItems = retorno[type];

      if (dataItems && dataItems.length > 0) {
        for (let i = 1; i <= 20; i++) {
          const ingrediente = dataItems[0][`strIngredient${i}`];
          const medida = dataItems[0][`strMeasure${i}`];

          if (ingrediente && ingrediente.trim() !== '') {
            ingredientes.push(`${ingrediente} ${medida}`);
            setChecked((previous) => [...previous, false]);
          }
        }
        setIngredients(ingredientes);
      } else {
        throw new Error('No data available');
      }
    } catch (error) {
      console.error('Error fetching data:', error, setErro(true));
    }
  };

  const handleLocal = (localStor: any, tipoFinal: string) => {
    if (localStor === null && tipoFinal === 'drinks') {
      const inProgressDrink = {
        drinks: {
          id: idFinal,
          ingredientsChecked: checked,
        },
      };
      localStorage.setItem('inProgressRecipe', JSON.stringify(inProgressDrink));
    } else if (tipoFinal === 'drinks'
    && localStorage.getItem('inProgressRecipe') !== null) {
      const inProgressDrink2 = {
        drinks: {
          id: idFinal,
          ingredientsChecked: checked,
        },
      };
      localStorage.setItem('inProgressRecipe', JSON.stringify(inProgressDrink2));
    } else if (localStor === null && tipoFinal === 'meals') {
      const inProgressRecipe = {
        meals: {
          id: idFinal,
          ingredientsChecked: checked,
        },
      };
      localStorage.setItem('inProgressRecipe', JSON.stringify(inProgressRecipe));
    } else if (localStor !== null && tipoFinal === 'meals') {
      const inProgressRecipe2 = {
        meals: {
          id: idFinal,
          ingredientsChecked: checked,
        },
      };
      localStorage.setItem('inProgressRecipe', JSON.stringify(inProgressRecipe2));
    }
  };

  const checkFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (favorites.length === 0) {
      setFavorite(false);
    } else if (favorites.some((item: any) => item.id === idFinal)) {
      setFavorite(true);
    }
    // console.log(favorites);
  };

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    // console.log(favorite);

    if (favorites.length === 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      const newFavorites = [...favorites, handleNewFavorite(data)];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setFavorite(true);
    } else if (favorites.some((item: any) => item.id === idFinal)) {
      const newFavorites = favorites.filter((item: any) => item.id !== idFinal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setFavorite(false);
    } else if (favorites.some((item: any) => item.id !== idFinal)) {
      const newFavorites = [...favorites, handleNewFavorite(data)];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setFavorite(true);
    }
  };

  const handleNewFavorite = (infoReceita: any) => {
    // const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (infoReceita.meals) {
      // console.log(infoReceita.meals);
      const addFav = {
        id: idFinal,
        type: 'meal',
        nationality: infoReceita.meals[0].strArea,
        category: infoReceita.meals[0].strCategory,
        name: infoReceita.meals[0].strMeal,
        image: infoReceita.meals[0].strMealThumb,
        alcoholicOrNot: '',
      };

      setFavorite(true);
      return addFav;
    } if (infoReceita.drinks) {
      const addFav = {
        id: idFinal,
        type: 'drink',
        nationality: '',
        category: infoReceita.drinks[0].strCategory,
        alcoholicOrNot: infoReceita.drinks[0].strAlcoholic,
        name: infoReceita.drinks[0].strDrink,
        image: infoReceita.drinks[0].strDrinkThumb,
      };
      setFavorite(true);
      return addFav;
    }
  };

  const handleNewDone = (infoReceita: any) => {
    const dataEHora = new Date();
    const dataFormatada = dataEHora.toISOString();
    // const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (infoReceita.meals) {
      // console.log(infoReceita.meals);
      const tagsArray = infoReceita.meals[0].strTags
        ? infoReceita.meals[0].strTags.split(',') : [];
      const addDone = {
        id: idFinal,
        type: 'meal',
        nationality: infoReceita.meals[0].strArea,
        category: infoReceita.meals[0].strCategory,
        name: infoReceita.meals[0].strMeal,
        image: infoReceita.meals[0].strMealThumb,
        alcoholicOrNot: '',
        tags: tagsArray,
        doneDate: dataFormatada,
      };

      return addDone;
    } if (infoReceita.drinks) {
      const tagsArray = infoReceita.drinks[0].strTags
        ? infoReceita.drinks[0].strTags.split(',') : [];
      const addDone = {
        id: idFinal,
        type: 'drink',
        nationality: '',
        category: infoReceita.drinks[0].strCategory,
        alcoholicOrNot: infoReceita.drinks[0].strAlcoholic,
        name: infoReceita.drinks[0].strDrink,
        image: infoReceita.drinks[0].strDrinkThumb,
        tags: tagsArray,
        doneDate: dataFormatada,
      };

      return addDone;
    }
  };

  const handleFinish = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    // console.log(favorite);

    const linkDone = '/done-recipes';

    if (doneRecipes.length === 0) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
      const newDone = [...doneRecipes, handleNewDone(data)];
      localStorage.setItem('doneRecipes', JSON.stringify(newDone));
      // const localStorageDoneRecipes = getLocalStorage(
      //   'doneRecipes',
      // );
      // console.log(localStorageDoneRecipes);
      navigate(linkDone);
    } else if (doneRecipes.some((item: any) => item.id !== idFinal)) {
      const newDone = [...doneRecipes, handleNewDone(data)];
      localStorage.setItem('doneRecipes', JSON.stringify(newDone));
      // const localStorageDoneRecipes = getLocalStorage(
      //   'doneRecipes',
      // );
      // console.log(localStorageDoneRecipes);
      navigate(linkDone);
    } else {
      navigate(linkDone);
    }
  };

  return { data,
    ingredients,
    checked,
    finished,
    setChecked,
    erro,
    setFinished,
    chamarDadosApi,
    handleLocal,
    handleFavorite,
    checkFavorites,
    favorite,
    handleFinish };
};
