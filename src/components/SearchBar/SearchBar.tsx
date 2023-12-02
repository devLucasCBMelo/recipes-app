import { useContext, useState } from 'react';
import searchBarContext from '../../contex/SearchBarContex';
import styles from './SearchBar.module.css';

const INICIAL_VALUE = {
  infoInput: '',
  radio: 'ingredient',
};

function SearchBar() {
  const { filterApi } = useContext(searchBarContext);
  const [searchInput, setSearchInput] = useState(INICIAL_VALUE);

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setSearchInput({ ...searchInput, [name]: value });
  };

  const handleClick = () => {
    filterApi(searchInput);
    setSearchInput(INICIAL_VALUE);
  };
  // colocando valores iniciais para o radio
  // colocando na chave radio o valor 'ingredient';
  // assim quando o componente iniciar 'ingredient' vai estar selecionado.
  return (
    <div className={ styles.container }>

      <label>
        <input
          className={ styles.input_search }
          onChange={ handleChange }
          name="infoInput"
          value={ searchInput.infoInput }
          data-testid="search-input"
          type="text"
        />
      </label>

      <div className={ styles.container_radio }>
        <div>
          <input
            onChange={ handleChange }
            type="radio"
            name="radio"
            value="ingredient"
            checked={ searchInput.radio === 'ingredient' }
            data-testid="ingredient-search-radio"
          />
          Ingredient
          <input
            onChange={ handleChange }
            name="radio"
            value="name"
            type="radio"
            checked={ searchInput.radio === 'name' }
            data-testid="name-search-radio"
          />
          Name
          <input
            onChange={ handleChange }
            name="radio"
            value="first-letter"
            type="radio"
            checked={ searchInput.radio === 'first-letter' }
            data-testid="first-letter-search-radio"
          />
          First Letter
        </div>
        <button
          className={ styles.button_search }
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
