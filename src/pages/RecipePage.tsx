import RecipeDetails from '../components/RecipeDetails/RecipeDetails';
import { Recipe } from '../type';

interface RecipePageProps {
  recipe: Recipe;
}

function RecipePage({ recipe }: RecipePageProps) {
  return (
    <div>
      <RecipeDetails recipe={ recipe } />
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
    </div>
  );
}

export default RecipePage;
