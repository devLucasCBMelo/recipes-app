import { useContext } from 'react';
import searchBarContext from '../../contex/SearchBarContex';

export default function ShowShareAlert() {
  const { showAlert } = useContext(searchBarContext);
  return (
    showAlert && (
      <span>
        <h3>
          Link copied!
        </h3>
      </span>
    )
  );
}
