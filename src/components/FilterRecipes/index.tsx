// esse componente renderizará os botões para filtrar as receitas;
import { useContext } from 'react';
import ALLRecipes from '../../images/filtros/AllRecipes.svg';
import Foots from '../../images/filtros/foods.svg';
import Drinks from '../../images/filtros/drinks.svg';
import searchBarContext from '../../contex/SearchBarContex';
import styles from './filterRecipes.module.css';

type FilterRecipesProps = {
  testIDAll: string;
  testIDMeal: string;
  testIDDrink: string;
};

export default function FilterRecipes({ testIDAll,
  testIDDrink, testIDMeal }: FilterRecipesProps) {
  const { favorites, doneRecipes, setFiltersRecipes } = useContext(searchBarContext);
  // esse componente devera filtrar as receitas por meals, drinks e all
  // OBS: all dever ser o padrão, ou seja, quando a pagina for carregada
  // todas as receitas devem ser mostradas do que foi resgatadas do localStorage
  // Esse filtro, ira filtrar de acordo com a pagina que estiver
  // podendo ser a com o caminho /favorite-recipes" ou "/done-recipes".
  // O filtro deve ser feito com base no estado global de acordo com o tipo
  // podendo ser Favorites ou DoneRecipes OBS: DoneRecipes não sei como foi implementado
  // que deve setar em estado global o tipo de filtro que está sendo feito

  // pegar o pathName para saber qual pagina está sendo renderizada
  const pathName = window.location.pathname;

  const handleFilter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = event.currentTarget;
    const altIgm = button.children[0].getAttribute('alt');
    switch (altIgm) {
      case 'All Recipes Filter Icon':
        setFiltersRecipes([]);
        break;
      case 'Meals Filter Icon':
        if (pathName === '/favorite-recipes') {
          const filterMeals = favorites.filter((item) => item.type === 'meal');
          setFiltersRecipes(filterMeals);
        }
        // else if (pathName === '/done-recipes') {
        //   const filterMeals = doneRecipes.filter((item) => item.type === 'meal');
        //   setFiltersRecipes(filterMeals);
        // }
        break;
      case 'Drinks Filter Icon':
        if (pathName === '/favorite-recipes') {
          const filterDrinks = favorites.filter((item) => item.type === 'drink');
          setFiltersRecipes(filterDrinks);
        }
        // else if (pathName === '/done-recipes') {
        //   const filterDrinks = doneRecipes.filter((item) => item.type === 'drink');
        //   setFiltersRecipes(filterDrinks);
        // }
        break;
      default:
    }
  };
  return (
    <div className={ styles.filters_Recipes }>
      <button
        type="button"
        data-testid={ testIDAll }
        onClick={ (event) => handleFilter(event) }
      >
        <img src={ ALLRecipes } alt="All Recipes Filter Icon" />
      </button>
      <button
        type="button"
        data-testid={ testIDMeal }
        onClick={ (event) => handleFilter(event) }
      >
        <img src={ Foots } alt="Meals Filter Icon" />
      </button>
      <button
        type="button"
        data-testid={ testIDDrink }
        onClick={ (event) => handleFilter(event) }
      >
        <img src={ Drinks } alt="Drinks Filter Icon" />
      </button>
    </div>
  );
}
