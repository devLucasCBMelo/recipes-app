// import { screen } from '@testing-library/react';
import { renderWithRouter } from '../utils/helpers';
import Footer from '../components/Footer/Footer';

describe('Testes Footer', () => {
  it('Renderiza Footer', () => {
    renderWithRouter(<Footer />);
  });
});
