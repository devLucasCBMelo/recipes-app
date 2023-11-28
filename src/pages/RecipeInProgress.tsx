import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchdDrinksDetails } from '../utils/fetchDrinksApi';
import { fetchMealsDetails } from '../utils/fetchMealsApi';
import './RecipeInProgress.css';

function RecipeInProgress() {
  const [data, setData] = useState<any>({});
  const [ingredients, setIngredients] = useState<any>([]);
  const [checked, setChecked] = useState<boolean[]>([]);

  const param = useParams();
  const location = useLocation();

  const idFinal = param.id;

  const typeRecipe = location.pathname;
  const tipoLocation = typeRecipe.split('/');
  const tipoFinal = tipoLocation[1];

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
  }, []);

  const handleCheckBox = (index: number) => {
    setChecked((previous) => {
      const updatedChecked = [...previous];
      updatedChecked[index] = !updatedChecked[index];
      return updatedChecked;
    });
  };

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

        {ingredients.map((ingrediente: string, index: number) => (
          <div
            key={ index }
          >

            <label
              style={ { textDecoration:
                checked[index] ? 'line-through solid rgb(0, 0, 0)' : '' } }
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
        {ingredients.map((ingrediente: string, index: number) => (
          <div key={ index }>

            <label
              style={ { textDecoration:
              checked[index] ? 'line-through solid rgb(0, 0, 0)' : '' } }
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
        >
          Finish

        </button>
      </div>
    );
  }
  return (
    <h1>Loading...</h1>
  );
}

export default RecipeInProgress;
