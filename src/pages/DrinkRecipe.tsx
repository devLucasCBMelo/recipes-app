import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';
import { fetchdDrinksDetails } from '../utils/fetchDrinksApi';

function DrinkRecipe() {
  const [drinkData, setDrinkData] = useState<any>({});
  const { id } = useParams();

  useEffect(() => {
    const fetchDrinkDetails = async () => {
      const { drinks: [data] } = await fetchdDrinksDetails(id ?? '');
      setDrinkData(data);
    };

    if (id) {
      fetchDrinkDetails();
    }
  }, [id]);

  if (drinkData !== 0) {
    return <RecipeDetails recipe={ drinkData } recommendationType="Meal" />;
  }

  return <h1>Carregando...</h1>;
}

export default DrinkRecipe;
