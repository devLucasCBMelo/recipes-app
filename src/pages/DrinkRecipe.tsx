import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails/RecipeDetails';
import { fetchdDrinksDetails } from '../utils/fetchDrinksApi';

function DrinkRecipe() {
  const [drinkData, setDrinkData] = useState<any>({});
  const { id } = useParams();

  useEffect(() => {
    const fetchDrinkDetails = async () => {
      try {
        const result = await fetchdDrinksDetails(id ?? '');

        if (result && result.drinks && result.drinks.length > 0) {
          const [data] = result.drinks;

          setDrinkData(data);
        } else {
          console.error('Nenhum dado de bebida encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes da bebida:', error);
      }
    };

    fetchDrinkDetails();
  }, [id]);

  if (drinkData !== 0) {
    return <RecipeDetails recipe={ drinkData } recommendationType="Meal" />;
  }

  return <h1>Carregando...</h1>;
}

export default DrinkRecipe;
