import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Recipes from '../components/Recipes';
import mealsIcon from '../images/mealIcon.png';
// import styles from './Meals/Meals.module.css';

function Meals() {
  return (
    <>
      <Header pageIcon={ mealsIcon } namePage="Meals" />
      <Recipes namePage="meals" />
      <Footer />
    </>
  );
}

export default Meals;
