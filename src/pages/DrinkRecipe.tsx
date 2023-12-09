import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails/RecipeDetails';
import { fetchdDrinksDetails } from '../utils/fetchDrinksApi';

function DrinkRecipe() {
  const [drinkData, setDrinkData] = useState<any>({});
  const { id } = useParams();

  useEffect(() => {
    const fetchDrinkDetails = async () => {
      const result = await fetchdDrinksDetails(id as string);

      if (result && result.drinks && result.drinks.length > 0) {
        const [data] = result.drinks;

        setDrinkData(data);
      }
    };

    fetchDrinkDetails();
  }, [id]);

  if (drinkData !== 0) {
    return <RecipeDetails recipe={ drinkData } recommendationType="Meal" />;
  }
}

export default DrinkRecipe;
