import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Recipe } from '../../type';

interface FavoriteShareProps {
  recipe: Recipe;
}

function FavoriteShare({ recipe }: FavoriteShareProps) {
  const location = useLocation();
  const handleLikeBtn = () => {
    const recipeType = location.pathname.includes('drinks') ? 'drink' : 'meal';

    const keyType: 'Meal' | 'Drink' = (
      recipeType.charAt(0).toUpperCase() + recipeType.slice(1)) as 'Meal' | 'Drink';

    const dataToSave = {
      id: recipe[`id${keyType}`],
      type: recipeType,
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

  return (
    <div>
      <button
        onClick={ handleLikeBtn }
        type="button"
        data-testid="favorite-btn"
      >
        like
      </button>
      <button type="button" data-testid="share-btn">
        share
      </button>
    </div>
  );
}

export default FavoriteShare;
