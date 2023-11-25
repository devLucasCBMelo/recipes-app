// import { screen } from '@testing-library/react';
import { renderWithRouter } from '../utils/helpers';
import Drinks from '../pages/Drinks';

describe('Testes DoneRecipes', () => {
  it('Renderiza page Drinks', () => {
    renderWithRouter(<Drinks />);
  });
});
