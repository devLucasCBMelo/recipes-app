import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Recipes from '../components/Recipes/index';
import mealsIcon from '../images/mealIcon.png';
// import styles from './Meals/Meals.module.css';
// correcao
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
