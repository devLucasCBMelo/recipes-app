import Recommendations from '../components/Recommendations/Recommendations';
import { Recipe } from '../type';

interface RecipeDetailsProps {
  recipe: Recipe;
  recommendationType: 'Drink' | 'Meal'
}

function RecipeDetails({ recipe, recommendationType }: RecipeDetailsProps) {
  const combineIngredientsAndMeasures = () => {
    return recipe.ingredients?.map((ingredient, index) => {
      const measure = (recipe as any)[`strMeasure${index + 1}`];
      return `${ingredient} - ${measure}`;
    });
  };

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
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}
      <Recommendations recommendationType={ recommendationType } />
    </div>
  );
}

export default RecipeDetails;
