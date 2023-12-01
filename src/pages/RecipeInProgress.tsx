import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useRecipeData } from '../utils/functionRecipeInProgress';

function RecipeInProgress() {
  const { data, ingredients, checked, finished,
    chamarDadosApi, setFinished, setChecked, handleLocal } = useRecipeData();

  const { id: idFinal } = useParams();
  const location = useLocation();
  const typeRecipe = location.pathname;
  const tipoFinal = typeRecipe.split('/')[1];
  const localStor = JSON.parse(localStorage.getItem('inProgressRecipe')!);

  useEffect(() => {
    chamarDadosApi(idFinal, tipoFinal);
  }, [idFinal, tipoFinal]);

  useEffect(() => {
    setFinished(handleFinished());
    handleLocal(localStor, tipoFinal, idFinal);
  }, [checked]);

  useEffect(() => {
    if (
      localStor
      && localStor.drinks
      && localStor.drinks.id
      && tipoFinal === 'drinks'
      && localStor.drinks.id === idFinal
    ) {
      setChecked(localStor.drinks.ingredientsChecked);
    } else if (
      localStor
      && localStor.meals !== null
      && tipoFinal === 'meals'
      && localStor.meals.id === idFinal
    ) {
      setChecked(localStor.meals.ingredientsChecked);
    }
  }, []);

  const handleCheckBox = (index: number) => {
    setChecked((previous) => [...previous.slice(0, index),
      !previous[index], ...previous.slice(index + 1)]);
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
          onClick={ () => handleLocal(localStor, tipoFinal, idFinal) }
        >
          Finish
        </button>
      </div>
    );
  };

  return data[tipoFinal] ? renderRecipeDetails() : <h1>Loading...</h1>;
}

export default RecipeInProgress;
