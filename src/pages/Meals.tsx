import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <>
      <Header namePage="Meals" />
      <Recipes namePage="meals" />
      <Footer />
    </>
  );
}

export default Meals;
