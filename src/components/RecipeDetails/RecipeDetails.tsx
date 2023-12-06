import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Recipe, RecipeType } from '../../type';
import Recommendations from '../Recommendations/Recommendations';
import './recipeDetails.css';
import FavoriteShare from '../FavoriteShare/FavoriteShare';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { fetchdDrinksDetails } from '../../utils/fetchDrinksApi';
import { fetchMealsDetails } from '../../utils/fetchMealsApi';
// import { favoriteRecipes } from '../../mocks/mockLocalStorage';

interface RecipeDetailsProps {
  recipe: Recipe;
  recommendationType: 'Drink' | 'Meal'
}

function RecipeDetails({ recipe, recommendationType }: RecipeDetailsProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const type = recommendationType === 'Drink' ? 'meal' : 'drink';

  // console.log(id);
  // console.log(type);

  const [recipeIsDone, setRecipeIsDone] = useState<boolean>(false);
  const [recipeInProgress, setRecipeInProgress] = useState<boolean>(false);
  const [recipeFavorite, setRecipeFavorite] = useState(false);
  const [data, setData] = useState<any>([]);
  const [copiedLink, setCopiedLink] = useState(false);

  const combineIngredientsAndMeasures = () => {
    return recipe.ingredients?.map((ingredient, index) => {
      const measure = (recipe as any)[`strMeasure${index + 1}`];
      return `${ingredient} - ${measure}`;
    });
  };

  const chamarDadosApi = async (idd: any, tipo: string) => {
    let retorno;

    if (tipo === 'drink') {
      retorno = await fetchdDrinksDetails(idd);
    } else if (tipo === 'meal') {
      retorno = await fetchMealsDetails(idd);
    } else {
      throw new Error('Invalid type');
    }

    setData(retorno);
  };

  const handleCopyUrl = () => {
    console.log(location.pathname);
    const url = `http://localhost:3000${location.pathname}`;
    navigator.clipboard.writeText(url).then(
      () => {
        setCopiedLink(true);
        setTimeout(() => {
          setCopiedLink(false);
        }, 3000);
      },
    );
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
    if (recipeProgress && typeof (id) === 'string') {
      const inProgressRecipes = Object.keys(recipeProgress[`${type}s`]);
      const recipeIsInProgress = inProgressRecipes.includes(id);
      setRecipeInProgress(recipeIsInProgress);
    }
  };

  const checkFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (favorites.length === 0 && favorites.some((item: any) => item.id !== id)) {
      setRecipeFavorite(false);
    } else if (favorites.some((item: any) => item.id === id)) {
      setRecipeFavorite(true);
    }
  };

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (favorites.length === 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      const newFavorites = [...favorites, handleNewFavorite(data)];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setRecipeFavorite(true);
    } else if (favorites.some((item: any) => item.id === id)) {
      const newFavorites = favorites.filter((item: any) => item.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setRecipeFavorite(false);
    } else if (favorites.some((item: any) => item.id !== id)) {
      const newFavorites = [...favorites, handleNewFavorite(data)];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setRecipeFavorite(true);
    }
  };

  const handleNewFavorite = (infoReceita: any) => {
    // const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (infoReceita.meals) {
      // console.log(infoReceita.meals);
      const addFav = {
        id,
        type: 'meal',
        nationality: infoReceita.meals[0].strArea,
        category: infoReceita.meals[0].strCategory,
        name: infoReceita.meals[0].strMeal,
        image: infoReceita.meals[0].strMealThumb,
        alcoholicOrNot: '',
      };

      setRecipeFavorite(true);
      return addFav;
    } if (infoReceita.drinks) {
      const addFav = {
        id,
        type: 'drink',
        nationality: '',
        category: infoReceita.drinks[0].strCategory,
        alcoholicOrNot: infoReceita.drinks[0].strAlcoholic,
        name: infoReceita.drinks[0].strDrink,
        image: infoReceita.drinks[0].strDrinkThumb,
      };
      setRecipeFavorite(true);
      return addFav;
    }
  };

  useEffect(() => {
    verifyRecipeDone();
    verifyRecipeInProg();
    checkFavorite();
    chamarDadosApi(id, type);
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
      {/* <FavoriteShare
        recipe={ recipe }
        type={ type }
        dataTestIdShare="share-btn"
        dataTestIdLike="favorite-btn"
      /> */}
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
          src={ recipeFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Favorite Recipe"
        />
        Favorite
      </button>
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
