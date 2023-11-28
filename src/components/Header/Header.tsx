import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './header.module.css';
import profile from '../../images/profileIcon.svg';
import search from '../../images/searchIcon.svg';
import appName from '../../images/title.png';
import logo from '../../images/logo.png';
import SearchBar from '../SearchBar/SearchBar';
import { HeaderProps } from '../../type';

function Header({ namePage }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (

    <header className={ styles.header }>
      <div className={ styles.container_header }>
        <div>
          <img src={ logo } alt="logo" />
          <img src={ appName } alt="title" />
        </div>
        <div>
          {(namePage === 'Meals' || namePage === 'Drinks')
&& (
  <button
    onClick={ handleSearch }
  >
    <img src={ search } alt="search" data-testid="search-top-btn" />
  </button>
)}
          <button onClick={ () => navigate('/profile') }>
            <img src={ profile } alt="profile" data-testid="profile-top-btn" />
          </button>
        </div>
      </div>
      <div>
        <h1 data-testid="page-title">{namePage}</h1>
      </div>
      { showSearch
      && <SearchBar />}
    </header>
  );
}

export default Header;
