import { useState } from 'react';
import { Recipe } from '../../type';

interface FavoriteShareProps {
  recipe: Recipe;
  type: 'drink' | 'meal';
  dataTestIdShare: string;
  dataTestIdLike: string;
}

function FavoriteShare({ recipe, type,
  dataTestIdShare, dataTestIdLike }: FavoriteShareProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const keyType: 'Meal' | 'Drink' = (
    type.charAt(0).toUpperCase() + type.slice(1)) as 'Meal' | 'Drink';

  const handleLikeBtn = () => {
    const dataToSave = {
      id: recipe[`id${keyType}`],
      type,
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${keyType}`],
      image: recipe[`str${keyType}Thumb`],
    };

    const favoritedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...favoritedRecipes, dataToSave]),

    );
  };

  const handleCopyUrl = () => {
    const url = `http://localhost:3000/${type}s/${recipe[`id${keyType}`]}`;
    navigator.clipboard.writeText(url).then(
      () => {
        setCopiedLink(true);
        setTimeout(() => {
          setCopiedLink(false);
        }, 3000);
      },
    );
  };

  return (
    <div>
      {copiedLink && <p>Link copied!</p>}
      <button
        onClick={ handleLikeBtn }
        type="button"
        data-testid={ dataTestIdLike }
      >
        like
      </button>
      <button
        onClick={ handleCopyUrl }
        type="button"
        data-testid={ dataTestIdShare }
      >
        share
      </button>
    </div>
  );
}

export default FavoriteShare;
