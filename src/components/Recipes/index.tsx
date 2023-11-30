import { useContext, useEffect, useState } from 'react';
import { DrinkType, HeaderProps, MealType } from '../../type';
import styles from './recipes.module.css';
import FilterBar from '../FilterBar/FilterBar';
import searchBarContext from '../../contex/SearchBarContex';

function Recipes({ namePage }: HeaderProps) {
  const [loading, setLoading] = useState(false);
  const { drinkData, setDrinkData, mealsData,
    setMealsData,
    setNoFilterDrinkData, setNoFilterMealsData } = useContext(searchBarContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setMealsData(data);
        setNoFilterMealsData(data);
        setLoading(false);
      } catch (error) {
        console.log('Deu erro', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setDrinkData(data);
        setNoFilterDrinkData(data);
        setLoading(false);
      } catch (error) {
        console.log('Deu erro', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (namePage === 'meals' && mealsData) {
    const limitedMeals = mealsData && mealsData.meals.slice(0, 12);

    return (
      <>
        <FilterBar namePage={ namePage } />
        {limitedMeals.map((recipe: MealType, index: number) => (
          <div
            key={ recipe.idMeal }
            data-testid={ `${index}-recipe-card` }
            className={ styles.recipeCard }
          >
            <p data-testid={ `${index}-card-name` }>
              {recipe.strMeal}
              {' '}
              comida
            </p>
            <img
              src={ recipe.strMealThumb }
              alt=""
              className={ styles.recipeImg }
              data-testid={ `${index}-card-img` }
            />
            <p>{recipe.idMeal}</p>
          </div>
        ))}
      </>
    );
  }

  if (namePage === 'drinks' && drinkData) {
    const limitedDrinks = drinkData.drinks.slice(0, 12);

    return (
      <>
        <FilterBar namePage={ namePage } />
        {limitedDrinks.map((recipe: DrinkType, index: number) => (
          <div key={ recipe.idDrink } data-testid={ `${index}-recipe-card` }>
            <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
            <img
              src={ recipe.strDrinkThumb }
              alt=""
              className={ styles.recipeImg }
              data-testid={ `${index}-card-img` }
            />
            <p>{recipe.idDrink}</p>
          </div>
        ))}
      </>
    );
  }

  return null;
}

export default Recipes;
