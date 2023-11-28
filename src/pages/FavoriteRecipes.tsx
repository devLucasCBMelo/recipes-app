import { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import share from '../images/shareIcon.svg';
import heartBlack from '../images/blackHeartIcon.svg';
import { getLocalStorage, putLocalStorage } from '../utils/helpers';
import { favoriteRecipes } from '../mocks/mockLocalStorage';
import InteractiveBtn from '../components/ InteractiveBtn';
import { RecipeType } from '../type';

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
      {/* aqui deverá ter as informações das receitas favoritadas */
        favorite.length > 0 && favorite.map((recipe, index) => (
          <div className="card-recipe-favorite" key={ recipe.id }>
            <div className="img-recipe">
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </div>
            <div className="info-recipe">
              <div className="name-recipe">
                <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
              </div>
              <div className="category-recipe">
                <p data-testid={ `${index}-horizontal-name` }>
                  {recipe.category}
                </p>

              </div>
              <InteractiveBtn
                srcShare={ share }
                srcFavorite={ heartBlack }
                dataShare={ `${index}-horizontal-share-btn` }
                dataFavorite={ `${index}-horizontal-favorite-btn` }
                favorite
              />
            </div>
          </div>
        ))
      }
      <Footer />
    </>
  );
}

export default FavoriteRecipes;
