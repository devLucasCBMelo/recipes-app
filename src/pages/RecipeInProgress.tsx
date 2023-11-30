import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchdDrinksDetails } from '../utils/fetchDrinksApi';
import { fetchMealsDetails } from '../utils/fetchMealsApi';

function RecipeInProgress() {
  const [data, setData] = useState<any>({});
  const [ingredients, setIngredients] = useState<any>([]);
  const [checked, setChecked] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const param = useParams();
  const location = useLocation();

  const idFinal = param.id;
  const typeRecipe = location.pathname;
  const tipoFinal = typeRecipe.split('/')[1];
  const localStor = JSON.parse(localStorage.getItem('inProgressRecipe')!);

  const chamarDadosApi = async (idd: any, type: string) => {
    if (type === 'drinks') {
      const retorno = await fetchdDrinksDetails(idd);
      setData(retorno);

      const ingredientes = [];
      for (let i = 1; i <= 20; i++) {
        const ingrediente = retorno.drinks[0][`strIngredient${i}`];
        const medida = retorno.drinks[0][`strMeasure${i}`];
        if (ingrediente && ingrediente.trim() !== '') {
          ingredientes.push(`${ingrediente} ${medida}`);
          setChecked((previous) => [...previous, false]);
        }
      }
      setIngredients(ingredientes);
    } else if (type === 'meals') {
      const retorno = await fetchMealsDetails(idd);
      setData(retorno);

      const ingredientes = [];

      for (let i = 1; i <= 20; i++) {
        const ingrediente = retorno.meals[0][`strIngredient${i}`];
        const medida = retorno.meals[0][`strMeasure${i}`];
        if (ingrediente && ingrediente.trim() !== '') {
          ingredientes.push(`${ingrediente} ${medida}`);
          setChecked((previous) => [...previous, false]);
        }
      }
      setIngredients(ingredientes);
    } else {
      return (
        <h1>Receipt not found</h1>
      );
    }
  };

  useEffect(() => {
    chamarDadosApi(idFinal, tipoFinal);
  }, [idFinal, tipoFinal]);

  useEffect(() => {
    setFinished(handleFinished());
    handleLocal();
  }, [checked]);

  useEffect(() => {
    if (localStor && localStor.drinks && localStor.drinks.id
        && tipoFinal === 'drinks' && localStor.drinks.id === idFinal) {
      setChecked(localStor.drinks.ingredientsChecked);
    } else if (localStor && localStor.meals !== null

      && tipoFinal === 'meals' && localStor.meals.id === idFinal) {
      setChecked(localStor.meals.ingredientsChecked);
    }
  }, []);

  const handleCheckBox = (index: number) => {
    setChecked((previous) => [...previous.slice(0, index),
      !previous[index], ...previous.slice(index + 1)]);
  };

  const handleLocal = () => {
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

  const handleFinished = () => checked.every((checkbox) => checkbox === true);

  const renderRecipeDetails = () => {
    const recipeData = data.meals ? data.meals : data.drinks;
    const titleKey = tipoFinal === 'drinks' ? 'strDrink' : 'strMeal';

    return (
      <div>
        <h1 data-testid="recipe-title">{recipeData[0][titleKey]}</h1>
        <img
          data-testid="recipe-photo"
          src={ recipeData[0][`${titleKey}Thumb`] }
          alt={ tipoFinal }
        />
        <button data-testid="share-btn">Share</button>
        <button data-testid="favorite-btn">Favorite</button>
        <h3 data-testid="recipe-category">
          Category:
          {' '}
          {recipeData.strCategory}
        </h3>
        <h4 data-testid="instructions">
          Instructions:
          {' '}
          {recipeData.strInstructions}
        </h4>

        {ingredients.map((ingrediente: string, index: number) => (
          <div key={ index }>
            <label
              style={ { textDecoration: checked[index]
                ? 'line-through solid rgb(0, 0, 0)' : '' } }
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ `ingredient-${index}` }
            >
              <input
                type="checkbox"
                id={ `ingredient-${index}` }
                onChange={ () => handleCheckBox(index) }
                checked={ checked[index] }
              />
              {ingrediente}
            </label>
          </div>
        ))}

        <button
          data-testid="finish-recipe-btn"
          disabled={ !finished }
          onClick={ handleLocal }
        >
          Finish
        </button>
      </div>
    );
  };

  return data[tipoFinal] ? renderRecipeDetails() : <h1>Loading...</h1>;
}

export default RecipeInProgress;
