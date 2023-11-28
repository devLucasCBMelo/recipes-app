interface Recipe {
  strMeal?: string;
  strMealThumb?: string;
  strCategory?: string;
  strInstructions?: string;
  ingredients?: string[];
}

interface RecipeDetailsProps {
  recipe: Recipe;
}

function RecipeDetails({ recipe }: RecipeDetailsProps) {
  return (
    <div>
      <h1>{recipe.strMeal}</h1>
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
      />
      <div>
        <h3>
          Categoria:
          {' '}
          {recipe.strCategory}
        </h3>
        <h4>
          Instruções:
          {' '}
          {recipe.strInstructions}
        </h4>
        <h4>Ingredientes:</h4>
        <ul>
          {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
            <li key={ index }>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecipeDetails;
