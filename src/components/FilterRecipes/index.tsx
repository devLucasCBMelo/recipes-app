// esse componente renderizará os botões para filtrar as receitas;
import ALLRecipes from '../../images/filtros/AllRecipes.svg';
import Foots from '../../images/filtros/foods.svg';
import Drinks from '../../images/filtros/drinks.svg';

type FilterRecipesProps = {
  testIDAll: string;
  testIDMeal: string;
  testIDDrink: string;
};

export default function FilterRecipes({ testIDAll,
  testIDDrink, testIDMeal }: FilterRecipesProps) {
  return (
    <div className="filters-Recipes">
      <button
        type="button"
        data-testid={ testIDAll }
      >
        <img src={ ALLRecipes } alt="All Recipes Filter Icon" />
      </button>
      <button
        type="button"
        data-testid={ testIDMeal }
      >
        <img src={ Foots } alt="Meals Filter Icon" />
      </button>
      <button
        type="button"
        data-testid={ testIDDrink }
      >
        <img src={ Drinks } alt="Drinks Filter Icon" />
      </button>
    </div>
  );
}
