import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import { DoneRecipesLocalStorage } from '../type';
import { getLocalStorage } from '../utils/localStorage';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [copiedLink, setCopiedLink] = useState(false);

  const localStorageDoneRecipes = getLocalStorage(
    'doneRecipes',
  ) as DoneRecipesLocalStorage[];

  const [recipesDone, setRecipesDone] = useState<DoneRecipesLocalStorage[]>(
    localStorageDoneRecipes || [],
  );

  const handleCopyUrl = (type: string, id: string) => {
    const url = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(url).then(
      () => {
        setCopiedLink(true);
        setTimeout(() => {
          setCopiedLink(false);
        }, 3000);
      },
    );
  };

  const handleFilterBtns = (type: 'meals' | 'drinks' | 'all') => {
    switch (type) {
      case 'meals':
        setRecipesDone(localStorageDoneRecipes
          .filter((recipe) => recipe.type === 'meal'));
        break;
      case 'drinks':
        setRecipesDone(localStorageDoneRecipes
          .filter((recipe) => recipe.type === 'drink'));
        break;
      default:
        setRecipesDone(localStorageDoneRecipes);
    }
  };

  return (
    <>
      <Header namePage="Done Recipes" />
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilterBtns('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => handleFilterBtns('meals') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilterBtns('drinks') }
        >
          Drinks
        </button>
      </div>
      {recipesDone.map((recipe, index) => {
        const { id, type } = recipe;
        return (
          <div key={ index }>
            <Link to={ `/${type}s/${id}` }>
              <img
                style={ { maxWidth: 90 } }
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt="Recipe"
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { recipe.category }
            </p>
            <Link to={ `/${type}s/${id}` }>
              <p data-testid={ `${index}-horizontal-name` }>
                { recipe.name }
              </p>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { recipe.doneDate }
            </p>
            {type === 'meal' && (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${recipe.nationality} - ${recipe.category}` }
              </p>
            )}
            {type === 'drink' && (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${recipe.alcoholicOrNot}` }
              </p>
            )}
            <button
              onClick={ () => handleCopyUrl(type, id) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Share Button"
              />
            </button>
            {copiedLink && <p>Link copied!</p>}

            {recipe.tags.map((tag, indexTag) => {
              return (
                <p
                  key={ indexTag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  { tag }
                </p>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default DoneRecipes;
