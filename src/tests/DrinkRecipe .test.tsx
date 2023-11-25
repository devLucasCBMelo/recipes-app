// import { screen } from '@testing-library/react';
import { renderWithRouter } from '../utils/helpers';
import DrinkRecipe from '../pages/DrinkRecipe';

describe('Testes DrinkRecipe', () => {
  it('Renderiza page DoneRecipe', () => {
    renderWithRouter(<DrinkRecipe />);
  });
});
