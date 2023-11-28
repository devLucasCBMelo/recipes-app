import InteractiveBtn from '../ InteractiveBtn';
import { RecipeType } from '../../type';
import share from '../../images/shareIcon.svg';
import heartBlack from '../../images/blackHeartIcon.svg';

type CardFavoritesProps = {
  favorite: RecipeType[];
};

export default function CardFavorites({ favorite }: CardFavoritesProps) {
  return (
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
  );
}
