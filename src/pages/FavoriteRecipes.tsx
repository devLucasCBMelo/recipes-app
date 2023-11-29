import { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
// import { favoriteRecipes } from '../mocks/mockLocalStorage';
import { RecipeType } from '../type';
import CardFavorites from '../components/CardFavorites';
import { getLocalStorage } from '../utils/localStorage';

function FavoriteRecipes() {
  const [favorite, setFavorite] = useState<RecipeType[]>([]);
  useEffect(() => {
    // favoriteRecipes.forEach((recipe) => {
    //   // caso já tenha o item no localStorage, não adiciona novamente
    //   const favLocalStorage = getLocalStorage().favoriteRecipes;
    //   if (favLocalStorage) {
    //     const itemLocalStorage = favLocalStorage
    //       .find((item: RecipeType) => item.id === recipe.id);
    //     if (itemLocalStorage) return;
    //   }

    //   putLocalStorage('favoriteRecipes', recipe);
    //   setFavorite((prev) => [...prev, recipe]);
    // });
    const favoriteRecipes = getLocalStorage('favoriteRecipes');
    if (favoriteRecipes) setFavorite(favoriteRecipes);
  }, []);
  return (
    <>
      <Header namePage="Favorite Recipes" />
      {
        // aqui deve ficar os botões de filtro
        <div className="filters-favorites">
          <button
            type="button"
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
          >
            Meals
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
        </div>
      }
      {/* <CardFavorites favorite={ favorite } /> */}
      <Footer />
    </>
  );
}

export default FavoriteRecipes;
