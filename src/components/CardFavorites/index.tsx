import { Link } from 'react-router-dom';
import { useState } from 'react';
import InteractiveBtn from '../ InteractiveBtn';
import { RecipeType } from '../../type';
import share from '../../images/shareIcon.svg';
import heartBlack from '../../images/blackHeartIcon.svg';
import styles from './CardFavorites.module.css';
import ShowShareAlert from '../ShowShareAlert';
import RecipeTitle from '../RecipeTitle';

type CardFavoritesProps = {
  favorite: RecipeType[];
};

export default function CardFavorites({ favorite }: CardFavoritesProps) {
  const [idLinkAlert, setIdLinkAlert] = useState({
    id: '',
    type: '',
  });

  const handleIdLink = (idLink: string, typeLink: string) => {
    setIdLinkAlert({
      id: idLink,
      type: typeLink,
    });
  };
  return (
    favorite.length > 0 && favorite.map((recipe, index) => (
      <div key={ recipe.id }>
        {idLinkAlert.id === recipe.id && idLinkAlert.type === recipe.type
        && <ShowShareAlert />}
        <div className={ styles.card_recipe_favorite }>
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
          <div className={ styles.info_recipe }>

            <Link
              className={ styles.link }
              to={ `/${recipe.type}s/${recipe.id}` }
            >

              <RecipeTitle
                classNameTitle={ styles.title_recipe }
                classNameDiv={ styles.name_recipe }
                testId={ `${index}-horizontal-name` }
                name={ recipe.name }
              />
            </Link>
            <div
              className={ styles.subtitle }
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
              handleIdLink={ handleIdLink }
            />
          </div>
        </div>

      </div>

    ))
  );
}
