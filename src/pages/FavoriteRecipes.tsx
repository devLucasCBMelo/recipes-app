import { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { getLocalStorage, putLocalStorage } from '../utils/helpers';
import { favoriteRecipes } from '../mocks/mockLocalStorage';
import { RecipeType } from '../type';
import CardFavorites from '../components/CardFavorites';

function FavoriteRecipes() {
  const [favorite, setFavorite] = useState<RecipeType[]>([]);
  useEffect(() => {
    favoriteRecipes.forEach((recipe) => {
      // caso já tenha o item no localStorage, não adiciona novamente
      const favLocalStorage = getLocalStorage().favoriteRecipes;
      if (favLocalStorage) {
        const itemLocalStorage = favLocalStorage
          .find((item: RecipeType) => item.id === recipe.id);
        if (itemLocalStorage) return;
      }

      putLocalStorage('favoriteRecipes', recipe);
      setFavorite((prev) => [...prev, recipe]);
    });
  }, []);
  return (
    <>
      <Header namePage="Favorite Recipes" />
      <CardFavorites favorite={ favorite } />
      <Footer />
    </>
  );
}

export default FavoriteRecipes;
