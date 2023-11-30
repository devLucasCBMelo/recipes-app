import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMealsDetails } from '../utils/fetchMealsApi';
import RecipeDetails from './RecipeDetails';
import { fetchDrinksName } from '../utils/fetchDrinksApi';

function MealRecipe() {
  const [mealData, setMealData] = useState<any>({});
  const [drinkRecommendation, setDrinkRecommendation] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMealDetails = async () => {
      const data = await fetchMealsDetails(id ?? '');
      setMealData(data);

      if (data.meals && data.meals.length > 0) {
        const mealName = data.meals[0].strMeal;

        if (mealName) {
          // Certifique-se de chamar a API de bebidas correta
          const recommendation = await fetchDrinksName(mealName);
          setDrinkRecommendation(recommendation);
        }
      }
    };

    if (id) {
      fetchMealDetails();
    }
  }, [id]);

  if (mealData.meals) {
    const meal = mealData.meals[0];
    return (
      <div>
        <RecipeDetails recipe={ meal } />

        {/* Exibe a recomendação de bebida aqui */}
      </div>
    );
  }

  return <h1>Carregando...</h1>;
}

export default MealRecipe;
