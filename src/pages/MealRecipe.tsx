import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMealsDetails } from '../utils/fetchMealsApi';
import RecipeDetails from '../components/RecipeDetails/RecipeDetails';
import { fetchDrinksName } from '../utils/fetchDrinksApi';

function MealRecipe() {
  const [mealData, setMealData] = useState<any>({});
  const [drinkRecommendation, setDrinkRecommendation] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMealDetails = async () => {
      const { meals: [data] } = await fetchMealsDetails(id ?? '');
      console.log(data);
      setMealData(data);

      if (data && data.length > 0) {
        const mealName = data.strMeal;

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

  if (mealData.lenght !== 0) {
    return (
      <div>
        <RecipeDetails recipe={ mealData } recommendationType="Drink" />
      </div>
    );
  }

  return <h1>Carregando...</h1>;
}

export default MealRecipe;
