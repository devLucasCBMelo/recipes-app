// import { screen } from '@testing-library/react';
import { renderWithRouter } from '../utils/helpers';
import SearchBar from '../components/SearchBar/SearchBar';

describe('Testes Profilee', () => {
  it('Renderiza Footer', () => {
    renderWithRouter(<SearchBar />);
  });
});
