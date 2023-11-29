import { useContext, useEffect } from 'react';
import Header from '../components/Header/Header';
// import { favoriteRecipes } from '../mocks/mockLocalStorage';
import CardFavorites from '../components/CardFavorites';
import { getLocalStorage, putLocalStorage } from '../utils/localStorage';
import FilterRecipes from '../components/FilterRecipes';
import ShowShareAlert from '../components/ShowShareAlert';
import searchBarContext from '../contex/SearchBarContex';

function FavoriteRecipes() {
  // const [favorite, setFavorite] = useState<RecipeType[]>([]);
  const { favorites, setFavorites } = useContext(searchBarContext);
  // preciso fazer o useEffect escutar as mudanças no localStorage
  // para atualizar a página quando um item for deletado
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
    //   setFavorites((prev) => [...prev, recipe]);
    // });
    const { favoriteRecipes } = getLocalStorage();
    if (favoriteRecipes) setFavorites(favoriteRecipes);
  }, [setFavorites]);

  if (favorites.length === 0) {
    return (
      <>
        <Header namePage="Favorite Recipes" />
        <p>
          No favorite recipes have been added!
        </p>
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
      <ShowShareAlert />
      <CardFavorites favorite={ favorites } />
      {/* <Footer /> */}
    </>
  );
}

export default FavoriteRecipes;
