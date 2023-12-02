import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Recipes from '../components/Recipes';
// import styles from './Meals/Meals.module.css';

function Meals() {
  return (
    <>
      <Header namePage="Meals" />
      <h1>Você está na tela de receitas de comidas</h1>
      <div>
        <Recipes namePage="meals" />
      </div>
      <Footer />
    </>
  );
}

export default Meals;
