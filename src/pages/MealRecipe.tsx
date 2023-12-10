import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMealsDetails } from '../utils/fetchMealsApi';
import RecipeDetails from '../components/RecipeDetails/RecipeDetails';

function MealRecipe() {
  const [mealData, setMealData] = useState<any>({});
  const { id } = useParams();

  useEffect(() => {
    const fetchMealDetails = async () => {
      const { meals: [data] } = await fetchMealsDetails(id as string);
      setMealData(data);
    };

    if (id) {
      fetchMealDetails();
    }
  }, [id]);

  if (mealData.length !== 0) {
    return (
      <div>
        <RecipeDetails recipe={ mealData } recommendationType="Drink" />
      </div>
    );
  }
}

export default MealRecipe;
