import { useContext, useEffect, useState } from 'react';
import { PageProps } from '../../type';
import filterBarContext from '../../contex/FilterBarContext';
import searchBarContext from '../../contex/SearchBarContex';
import allMeals from '../../images/filtros/AllMeals.svg';
import allDrinks from '../../images/filtros/AllDriks.svg';
import beef from '../../images/filtros/beef.svg';
import chicken from '../../images/filtros/chicken.svg';
import brackfast from '../../images/filtros/breakfast.svg';
import dessert from '../../images/filtros/dessert.svg';
import goat from '../../images/filtros/goat.svg';
import cocktail from '../../images/filtros/cocktail.svg';
import cocoa from '../../images/filtros/cocoa.svg';
import shake from '../../images/filtros/shake.svg';
import ordinaryDrink from '../../images/filtros/drink.svg';
import other from '../../images/filtros/other.svg';
import styles from './FilterBar.module.css';

const iconsMeals = [beef, brackfast, chicken, dessert, goat];
const iconsDrinks = [ordinaryDrink, cocktail, shake, other, cocoa];

function FilterBar({ namePage }: PageProps) {
  const [loading, setLoading] = useState(false);
  const [mealsCategory, setMealsCategory] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);

  const { saveFilter } = useContext(filterBarContext);
  const {
    noFilterDrinkData,
    noFilterMealsData, setDrinkData, setMealsData } = useContext(searchBarContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        const newData = data
          .meals?.map((meal: { strCategory: string }) => meal.strCategory)
          .slice(0, 5);
        setMealsCategory(newData);
        setLoading(false);
      } catch (error) {
        console.log('Deu erro na API de categorias de comidas', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        const newData = data
          .drinks?.map((drink: { strCategory: string }) => drink.strCategory)
          .slice(0, 5);
        setDrinksCategory(newData);
        setLoading(false);
      } catch (error) {
        console.log('Deu erro na API de categorias de bebidas', error);
      }
    };

    fetchData();
  }, []);

  const clearAllFilters = () => {
    if (namePage === 'meals') {
      setMealsData(noFilterMealsData);
    }

    if (namePage === 'drinks') {
      setDrinkData(noFilterDrinkData);
    }
  };

  if (namePage === 'meals') {
    return (
      <div className={ styles.container_filters }>
        <button data-testid="All-category-filter" onClick={ clearAllFilters }>
          <img
            className={ styles.icons }
            src={ allMeals }
            alt="All"
          />
        </button>
        {mealsCategory.map((category, index) => (
          <button
            data-testid={ `${category}-category-filter` }
            key={ index }
            value={ category }
            onClick={ () => saveFilter(category, namePage) }
          >
            <img
              className={ styles.icons }
              src={ iconsMeals[index] }
              alt={ category }
            />
          </button>
        ))}
      </div>
    );
  }

  if (namePage === 'drinks') {
    return (
      <div className={ styles.container_filters }>
        <button data-testid="All-category-filter" onClick={ clearAllFilters }>
          <img
            className={ styles.icons }
            src={ allDrinks }
            alt="All"
          />
        </button>
        {drinksCategory.map((category, index) => (
          <button
            data-testid={ `${category}-category-filter` }
            key={ index }
            value={ category }
            onClick={ () => saveFilter(category, namePage) }
          >
            <img
              className={ styles.icons }
              src={ iconsDrinks[index] }
              alt={ category }
            />
          </button>
        ))}
      </div>
    );
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }
}

export default FilterBar;
