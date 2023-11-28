import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchdDrinksDetails } from '../utils/fetchDrinksApi';
import { fetchMealsDetails } from '../utils/fetchMealsApi';

function RecipeInProgress() {
  const [data, setData] = useState<any>({});

  const param = useParams();
  const location = useLocation();

  const idFinal = param.id;
  console.log(idFinal);

  const typeRecipe = location.pathname;
  const tipoo = typeRecipe.split('/');
  const tipoFinal = tipoo[1];
  console.log(tipoFinal);

  const chamarDadosApi = async (idd: any, type: string) => {
    if (type === 'drinks') {
      const dataa = await fetchdDrinksDetails(idd);
      setData(dataa);
    } else if (type === 'meals') {
      const dataa = await fetchMealsDetails(idd);
      setData(dataa);
    }
  };

  useEffect(() => {
    chamarDadosApi(idFinal, tipoFinal);
  }, [idFinal, tipoFinal]);

  if (data.drinks) {
    return (
      <div>
        <h1 data-testid="recipe-title">{data.drinks[0].strDrink}</h1>
        <img
          data-testid="recipe-photo"
          src={ data.drinks[0].strDrinkThumb }
          alt="drink"
        />
        <button
          data-testid="share-btn"
        >
          Share

        </button>
        <button
          data-testid="favorite-btn"
        >
          Favorite

        </button>
        <h3
          data-testid="recipe-category"
        >
          Category:
          {' '}
          {data.drinks[0].strCategory}
        </h3>
        <h4
          data-testid="instructions"
        >
          Instructions:
          {' '}
          {data.drinks[0].strInstructions}
        </h4>
        <button
          data-testid="finish-recipe-btn"
        >
          Finish

        </button>
      </div>
    );
  }
  if (data.meals) {
    return (
      <div>
        <h1 data-testid="recipe-title">{data.meals[0].strMeal}</h1>
        <img
          data-testid="recipe-photo"
          src={ data.meals[0].strMealThumb }
          alt="meal"
        />
        <button
          data-testid="share-btn"
        >
          Share

        </button>
        <button
          data-testid="favorite-btn"
        >
          Favorite

        </button>
        <h3
          data-testid="recipe-category"
        >
          Category:
          {' '}
          {data.meals[0].strCategory}
        </h3>
        <h4
          data-testid="instructions"
        >
          Instructions:
          {' '}
          {data.meals[0].strInstructions}
        </h4>
        <button
          data-testid="finish-recipe-btn"
        >
          Finish

        </button>
      </div>
    );
  }
  return (
    <h1>Carregando...</h1>
  );
}

export default RecipeInProgress;
