import { useContext, useState } from 'react';
import searchBarContext from '../../contex/SearchBarContex';

const INICIAL_VALUE = {
  infoInput: '',
  radio: 'ingredient',

};

function SearchBar() {
  const { setBusca, filter } = useContext(searchBarContext);

  const [searchInput, setSearchInput] = useState(INICIAL_VALUE);

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setSearchInput({ ...searchInput, [name]: value });
  };

  const inputSearch = { ...searchInput };
  const handleClick = () => {
    console.log('cliquei');
    setBusca(inputSearch);
    filter();
  };

  return (

    <div>
      <div>
        <label>
          <input
            onChange={ handleChange }
            name="infoInput"
            value={ searchInput.infoInput }
            data-testid="search-input"
            type="text"
          />
        </label>
      </div>
      <div>
        <div>
          <input
            onChange={ handleChange }
            type="radio"
            name="radio"
            value="ingredient"
            data-testid="ingredient-search-radio"
          />
          Ingredient
          <input
            onChange={ handleChange }
            name="radio"
            value="name"
            type="radio"
            data-testid="name-search-radio"
          />
          Name
          <input
            onChange={ handleChange }
            name="radio"
            value="first-letter"
            type="radio"
            data-testid="first-letter-search-radio"
          />
          First Letter
        </div>
        <button
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search

        </button>
      </div>
    </div>

  );
}

export default SearchBar;
