import { useNavigate } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import styles from './Footer.module.css';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      className={ styles.footer }
      data-testid="footer"
      style={ {
        position: 'fixed',
        bottom: 0,
      } }
    >
      <button onClick={ () => navigate('/drinks') }>
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink icon"
        />
      </button>
      <button onClick={ () => navigate('/meals') }>
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="meal icon"
        />
      </button>
    </footer>
  );
}

export default Footer;
