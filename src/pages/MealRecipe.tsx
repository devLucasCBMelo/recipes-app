import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';
import { fetchMealsDetails } from '../utils/fetchMealsApi';

function MealRecipe() {
  const [mealData, setMealData] = useState<any>({});
  const { id } = useParams();

  useEffect(() => {
    const fetchMealDetails = async () => {
      const data = await fetchMealsDetails(id ?? '');
      setMealData(data);
    };

    fetchMealDetails();
  }, [id]);

  if (mealData.meals) {
    const meal = mealData.meals[0];
    return <RecipeDetails recipe={ meal } />;
  }

  return <h1>Carregando...</h1>;
}

export default MealRecipe;
