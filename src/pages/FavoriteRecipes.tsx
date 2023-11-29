import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
// import { favoriteRecipes } from '../mocks/mockLocalStorage';
import { RecipeType } from '../type';
import CardFavorites from '../components/CardFavorites';
import { getLocalStorage } from '../utils/localStorage';
import FilterRecipes from '../components/FilterRecipes';

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
    const { favoriteRecipes } = getLocalStorage();
    if (favoriteRecipes) setFavorite(favoriteRecipes);
  }, []);

  if (favorite.length === 0) {
    return (
      <>
        <Header namePage="Favorite Recipes" />
        <p>Nenhuma receita foi favoritada!</p>
        {/* <Footer /> */}
      </>
    );
  }
  return (
    <>
      <Header namePage="Favorite Recipes" />
      <FilterRecipes
        testIDAll="filter-by-all-btn"
        testIDMeal="filter-by-meal-btn"
        testIDDrink="filter-by-drink-btn"
      />
      <CardFavorites favorite={ favorite } />
      {/* <Footer /> */}
    </>
  );
}

export default FavoriteRecipes;
