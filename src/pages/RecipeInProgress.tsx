import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useRecipeData } from '../utils/functionRecipeInProgress';
import { getLocalStorage } from '../utils/localStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const { data, ingredients, checked, finished, favorite,
    chamarDadosApi, setFinished, setChecked, handleLocal, handleFavorite,
    checkFavorites } = useRecipeData();
  const [copiedLink, setCopiedLink] = useState(false);

  const { id: idFinal } = useParams();
  const location = useLocation();
  const typeRecipe = location.pathname;
  const tipoFinal = typeRecipe.split('/')[1];
  const localStor = JSON.parse(localStorage.getItem('inProgressRecipe')!);

  const imgFav = '../../src/images/blackHeartIcon.svg';
  const imgNotFav = '../../src/images/whiteHeartIcon.svg';

  useEffect(() => {
    chamarDadosApi(idFinal, tipoFinal);
  }, [idFinal, tipoFinal]);

  useEffect(() => {
    setFinished(handleFinished());
    handleLocal(localStor, tipoFinal);
    // console.log(data);
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
    checkFavorites();
  }, []);

  const handleCheckBox = (index: number) => {
    setChecked((previous) => [...previous.slice(0, index),
      !previous[index], ...previous.slice(index + 1)]);
  };

  const handleFinished = () => checked.every((checkbox) => checkbox === true);

  const handleCopyUrl = () => {
    const url = `http://localhost:3000${location.pathname.replace('/in-progress', '')}`;
    navigator.clipboard.writeText(url).then(
      () => {
        setCopiedLink(true);
        setTimeout(() => {
          setCopiedLink(false);
        }, 3000);
      },
    );
  };

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
        <button
          data-testid="share-btn"
          onClick={ () => handleCopyUrl() }
        >
          Share

        </button>
        {copiedLink && <p>Link copied!</p>}
        <button
          onClick={ handleFavorite }
        >
          <img
            data-testid="favorite-btn"
            src={ favorite ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite Recipe"

          />
          Favorite
        </button>
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
          onClick={ () => handleLocal(localStor, tipoFinal) }
        >
          Finish
        </button>
      </div>
    );
  };

  return data[tipoFinal] ? renderRecipeDetails() : <h1>Loading...</h1>;
}

export default RecipeInProgress;
