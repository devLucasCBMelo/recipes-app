import { useContext } from 'react';
import searchBarContext from '../../contex/SearchBarContex';
import styles from './ShowShareAlert.module.css';

export default function ShowShareAlert() {
  const { showAlert } = useContext(searchBarContext);
  return (
    showAlert && (
      <span>
        <h3 className={ styles.link_copied }>
          Link copied!
        </h3>
      </span>
    )
  );
}
