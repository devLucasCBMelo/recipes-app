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

interface RecipeDetailsProps {
  recipe: Recipe;
  recommendationType: 'Drink' | 'Meal'
}

function RecipeDetails({ recipe, recommendationType }: RecipeDetailsProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const type = recommendationType === 'Drink' ? 'meal' : 'drink';

  const [recipeIsDone, setRecipeIsDone] = useState<boolean>(false);
  const [recipeInProgress, setRecipeInProgress] = useState<boolean>(false);
  const [recipeFavorite, setRecipeFavorite] = useState(false);
  const [data, setData] = useState<any>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tipoA, settipoA] = useState('');

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

      settipoA('drink');
    } else if (tipo === 'meal') {
      retorno = await fetchMealsDetails(idd);
      settipoA('meal');
    }
    setData(retorno);
  };

  const handleCopyUrl = () => {
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

    if (id && favorites && favorites.length > 0) {
      if (favorites.some((item: any) => item && item.id === id)) {
        setRecipeFavorite(true);
      } else {
        setRecipeFavorite(false);
      }
    } else {
      setRecipeFavorite(false);
    }
  };
  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage
      .getItem('favoriteRecipes') || '[]') as any[];
    const newFavorite = handleNewFavorite(data[`${type}s`]);

    if (newFavorite) {
      const favoriteIndex = favorites.findIndex((item) => item.id === id);

      if (favorites.length === 0 || favoriteIndex === -1) {
        const newFavorites = [...favorites, newFavorite];
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
        setRecipeFavorite(true);
      } else {
        const newFavorites = [...favorites
          .slice(0, favoriteIndex), ...favorites.slice(favoriteIndex + 1)];
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
        setRecipeFavorite(false);
      }
    }
  };
  const handleNewFavorite = (infoReceita: any) => {
    if (infoReceita) {
      const addFav = {
        id,
        type: tipoA,
        nationality: infoReceita[0].strArea || '',
        category: infoReceita[0].strCategory,
        name: infoReceita[0].strMeal || infoReceita[0].strDrink,
        image: infoReceita[0].strMealThumb || infoReceita[0].strDrinkThumb,
        alcoholicOrNot: infoReceita[0].strAlcoholic || '',
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
    setLoading(false);
  }, []);
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  const handleStartBtn = () => {
    if (type === 'drink') {
      navigate(`/drinks/${id}/in-progress`);
    } else { navigate(`/meals/${id}/in-progress`); }
  };
  const btnText = recipeInProgress === true ? 'Continue Recipe' : 'Start Recipe';

  return (
    <div>
      {loading ? (
        <h1>Carregando...</h1>
      ) : (
        <>
          <h1 data-testid="recipe-title">{ recipe.strMeal || recipe.strDrink}</h1>
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
        </>
      )}
    </div>
  );
}
export default RecipeDetails;
