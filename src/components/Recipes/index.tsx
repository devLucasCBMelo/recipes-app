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
      <div
        className={ styles.container }
      >
        <FilterBar namePage={ namePage } />
        <div
          className={ styles.container_recipes }
        >

          {limitedMeals.map((recipe: MealType, index: number) => (
            <div
              key={ recipe.idMeal }
              data-testid={ `${index}-recipe-card` }
              className={ styles.recipeCard }
            >

              <img
                src={ recipe.strMealThumb }
                alt=""
                className={ styles.recipeImg }
                data-testid={ `${index}-card-img` }
              />
              <p
                className={ styles.name_recipe }
                data-testid={ `${index}-card-name` }
              >
                {recipe.strMeal}

              </p>
              {/* <p>{recipe.idMeal}</p> */}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (namePage === 'drinks' && drinkData) {
    const limitedDrinks = drinkData.drinks.slice(0, 12);

    return (
      <div
        className={ styles.container }
      >
        <FilterBar namePage={ namePage } />
        <div
          className={ styles.container_recipes }
        >
          {limitedDrinks.map((recipe: DrinkType, index: number) => (
            <div
              className={ styles.recipeCard }
              key={ recipe.idDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ recipe.strDrinkThumb }
                alt=""
                className={ styles.recipeImg }
                data-testid={ `${index}-card-img` }
              />
              <p
                className={ styles.name_recipe }
                data-testid={ `${index}-card-name` }
              >
                {recipe.strDrink}

              </p>
              {/* <p>{recipe.idDrink}</p> */}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default Recipes;
