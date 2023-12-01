import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Recipe, RecipeType } from '../../type';
import Recommendations from '../Recommendations/Recommendations';
import './RecipeDetails.css';

interface RecipeDetailsProps {
  recipe: Recipe;
  recommendationType: 'Drink' | 'Meal'
}

function RecipeDetails({ recipe, recommendationType }: RecipeDetailsProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [recipeIsDone, setRecipeIsDone] = useState<boolean>(false);
  const [recipeInProgress, setRecipeInProgress] = useState<boolean>(false);
  const combineIngredientsAndMeasures = () => {
    return recipe.ingredients?.map((ingredient, index) => {
      const measure = (recipe as any)[`strMeasure${index + 1}`];
      return `${ingredient} - ${measure}`;
    });
  };

  const verifyRecipeDone = () => {
    const doneRecipies = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const recipeIsCompleted = doneRecipies
      .filter(({ id: recipeId }: RecipeType) => recipeId === id);
    setRecipeIsDone(recipeIsCompleted.length !== 0);
  };

  const verifyRecipeInProg = () => {
    const recipeProgress = JSON.parse(localStorage.getItem('inProgressRecipes')
    || 'null');
    const type = recommendationType === 'Drink' ? 'meals' : 'drinks';
    if (recipeProgress && typeof (id) === 'string') {
      console.log(Object.keys(recipeProgress[type]));
      const inProgressRecipes = Object.keys(recipeProgress[type]);
      const recipeIsInProgress = inProgressRecipes.includes(id);
      setRecipeInProgress(recipeIsInProgress);
    }
  };

  useEffect(() => {
    verifyRecipeDone();
    verifyRecipeInProg();
  });

  const handleStartBtn = () => {
    navigate(`${location.pathname}/in-progress`);
  };

  const btnText = recipeInProgress === true ? 'Continue Recipe' : 'Start Recipe';
  return (
    <div>
      <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid="recipe-photo"
      />
      <div>
        <h3 data-testid="recipe-category">
          Categoria:
          {' '}
          {`${recipe.strCategory} - ${recipe.strAlcoholic || ''}`}
        </h3>
        <h4 data-testid="instructions">
          Instruções:
          {' '}
          {recipe.strInstructions}
        </h4>
        <h4>Ingredientes:</h4>
        <ul>
          {combineIngredientsAndMeasures()?.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      {recipe.containsAlcoholic !== undefined && (
        <h3 data-testid="contains-alcoholic">
          {recipe.containsAlcoholic ? 'Alcoholic' : 'Não contém álcool'}
        </h3>
      )}

      {recipe.strYoutube && (
        <div>
          <h4>Vídeo:</h4>
          <iframe
            title="Recipe Video"
            width="560"
            height="315"
            src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
            data-testid="video"
            allowFullScreen
          />
        </div>
      )}
      <Recommendations recommendationType={ recommendationType } />
      {!recipeIsDone && (
        <button
          className="start__recipe__btn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleStartBtn }
        >
          {btnText}
        </button>)}
    </div>
  );
}

export default RecipeDetails;
