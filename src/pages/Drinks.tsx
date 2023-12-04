import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Recipes from '../components/Recipes';
import drinkIcon from '../images/drinkIcon.png';

function Drinks() {
  return (
    <>
      <Header pageIcon={ drinkIcon } namePage="Drinks" />
      <Recipes namePage="drinks" />
      <Footer />
    </>
  );
}

export default Drinks;
