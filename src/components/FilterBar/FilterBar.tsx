import { useContext, useEffect, useState } from 'react';
import { HeaderProps } from '../../type';
import filterBarContext from '../../contex/FilterBarContext';
import searchBarContext from '../../contex/SearchBarContex';

function FilterBar({ namePage }: HeaderProps) {
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
      <>
        <button data-testid="All-category-filter" onClick={ clearAllFilters }>All</button>
        {mealsCategory.map((category, index) => (
          <button
            data-testid={ `${category}-category-filter` }
            key={ index }
            value={ category }
            onClick={ () => saveFilter(category, namePage) }
          >
            {category}

          </button>
        ))}
      </>
    );
  }

  if (namePage === 'drinks') {
    return (
      <>
        <button data-testid="All-category-filter" onClick={ clearAllFilters }>All</button>
        {drinksCategory.map((category, index) => (
          <button
            data-testid={ `${category}-category-filter` }
            key={ index }
            value={ category }
            onClick={ () => saveFilter(category, namePage) }
          >
            {category}

          </button>
        ))}
      </>
    );
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }
}

export default FilterBar;
