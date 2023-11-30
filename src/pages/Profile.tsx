import { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { getLocalStorage } from '../utils/localStorage';
import { UserLocalStorage } from '../type';
import done from '../images/doneProfile.svg';
import favorite from '../images/favoriteProfile.svg';
import logout from '../images/logout.svg';

function Profile() {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const userLocalStorage: UserLocalStorage = getLocalStorage('user');
    if (userLocalStorage) {
      setEmail(userLocalStorage.email);
    }
  }, []);
  return (
    <>
      <Header namePage="Profile" />
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
        >
          <img src={ done } alt="Done Recipes button icon" />
          Done Recipes
        </button>
      </div>
      <div className="favorite-btn">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          <img src={ favorite } alt="Favorite Recipes button icon" />
          Favorite Recipes
        </button>
      </div>
      <div className="logout-btn">
        <button
          type="button"
          data-testid="profile-logout-btn"
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
