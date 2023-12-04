import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import profileIcon from '../images/perfil.png';
import { getLocalStorage } from '../utils/localStorage';
import { UserLocalStorage } from '../type';
import done from '../images/doneProfile.svg';
import favorite from '../images/favoriteProfile.svg';
import logout from '../images/logout.svg';

function Profile() {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const userLocalStorage: UserLocalStorage = getLocalStorage('user');
    if (userLocalStorage) {
      setEmail(userLocalStorage.email);
    }
  }, []);
  return (
    <>
      <Header pageIcon={ profileIcon } namePage="Profile" />
      <div className="login-email">
        <h4
          data-testid="profile-email"
        >
          { email }

        </h4>
      </div>
      <div className="done-btn">
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => navigate('/done-recipes') }
        >
          <img src={ done } alt="Done Recipes button icon" />
          Done Recipes
        </button>
      </div>
      <div className="favorite-btn">
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => navigate('/favorite-recipes') }
        >
          <img src={ favorite } alt="Favorite Recipes button icon" />
          Favorite Recipes
        </button>
      </div>
      <div className="logout-btn">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            navigate('/');
          } }
        >
          <img src={ logout } alt="Logout button icon" />
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
