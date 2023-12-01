import { useState } from 'react';
import { fetchdDrinksDetails } from './fetchDrinksApi';
import { fetchMealsDetails } from './fetchMealsApi';

export const useRecipeData = () => {
  const [data, setData] = useState<any>({});
  const [ingredients, setIngredients] = useState<any>([]);
  const [checked, setChecked] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const chamarDadosApi = async (idd: any, type: string) => {
    try {
      let retorno;

      if (type === 'drinks') {
        retorno = await fetchdDrinksDetails(idd);
      } else if (type === 'meals') {
        retorno = await fetchMealsDetails(idd);
      } else {
        throw new Error('Invalid type');
      }

      setData(retorno);

      const ingredientes = [];
      const dataItems = retorno[type];

      if (dataItems && dataItems.length > 0) {
        for (let i = 1; i <= 20; i++) {
          const ingrediente = dataItems[0][`strIngredient${i}`];
          const medida = dataItems[0][`strMeasure${i}`];

          if (ingrediente && ingrediente.trim() !== '') {
            ingredientes.push(`${ingrediente} ${medida}`);
            setChecked((previous) => [...previous, false]);
          }
        }
        setIngredients(ingredientes);
      } else {
        throw new Error('No data available');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLocal = (localStor: any, tipoFinal: string, idFinal: any) => {
    if (localStor === null && tipoFinal === 'drinks') {
      const inProgressDrink = {
        drinks: {
          id: idFinal,
          ingredientsChecked: checked,
        },
      };
      localStorage.setItem('inProgressRecipe', JSON.stringify(inProgressDrink));
    } else if (tipoFinal === 'drinks'
    && localStorage.getItem('inProgressRecipe') !== null) {
      const inProgressDrink2 = {
        drinks: {
          id: idFinal,
          ingredientsChecked: checked,
        },
      };
      localStorage.setItem('inProgressRecipe', JSON.stringify(inProgressDrink2));
    } else if (localStor === null && tipoFinal === 'meals') {
      const inProgressRecipe = {
        meals: {
          id: idFinal,
          ingredientsChecked: checked,
        },
      };
      localStorage.setItem('inProgressRecipe', JSON.stringify(inProgressRecipe));
    } else if (localStor !== null && tipoFinal === 'meals') {
      const inProgressRecipe2 = {
        meals: {
          id: idFinal,
          ingredientsChecked: checked,
        },
      };
      localStorage.setItem('inProgressRecipe', JSON.stringify(inProgressRecipe2));
    }
  };

  return { data,
    ingredients,
    checked,
    finished,
    setChecked,
    setFinished,
    chamarDadosApi,
    handleLocal };
};
