// import { screen } from '@testing-library/react';
import { renderWithRouter } from '../utils/helpers';
import Meals from '../pages/Meals';

describe('Testes Meals', () => {
  it('Renderiza page Meals', () => {
    renderWithRouter(<Meals />);
  });
});
