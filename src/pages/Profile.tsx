import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import profileIcon from '../images/perfil.png';

function Profile() {
  return (
    <>
      <Header pageIcon={ profileIcon } namePage="Profile" />
      <Footer />
    </>
  );
}

export default Profile;
