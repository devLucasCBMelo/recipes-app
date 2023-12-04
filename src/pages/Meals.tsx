import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <>
      <Header namePage="Meals" />
      <h1>Você está na tela de receitas de comidas</h1>
      <Recipes namePage="meals" />
      <Footer />
    </>
  );
}

export default Meals;
