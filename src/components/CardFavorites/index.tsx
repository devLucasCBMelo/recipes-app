import { Link } from 'react-router-dom';
import InteractiveBtn from '../ InteractiveBtn';
import { RecipeType } from '../../type';
import share from '../../images/shareIcon.svg';
import heartBlack from '../../images/blackHeartIcon.svg';
import styles from './CardFavorites.module.css';

type CardFavoritesProps = {
  favorite: RecipeType[];
};

export default function CardFavorites({ favorite }: CardFavoritesProps) {
  return (
    favorite.length > 0 && favorite.map((recipe, index) => (
      <div className="card-recipe-favorite" key={ recipe.id }>
        <div className="img-recipe">
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              className={ styles.image_favorite }
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
        </div>
        <div className="info-recipe">
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <div className={ styles.name_recipe }>
              <h3
                className={ styles.title_recipe }
                data-testid={ `${index}-horizontal-name` }
              >
                { recipe.name }

              </h3>
            </div>
          </Link>
          <div
            data-testid={ `${index}-horizontal-top-text` }
          >
            {recipe.type === 'meal' ? (
              <span>
                {`${recipe.nationality} - ${recipe.category}`}
              </span>
            ) : (
              <span>
                {recipe.alcoholicOrNot}
              </span>
            )}
          </div>
          <InteractiveBtn
            srcShare={ share }
            srcFavorite={ heartBlack }
            dataShare={ `${index}-horizontal-share-btn` }
            dataFavorite={ `${index}-horizontal-favorite-btn` }
            id={ recipe.id }
            type={ recipe.type }
          />
        </div>
      </div>
    ))
  );
}
