// import { screen } from '@testing-library/react';
import { renderWithRouter } from '../utils/helpers';
import DoneRecipe from '../pages/DoneRecipes';

describe('Testes DoneRecipe', () => {
  it('Renderiza page DoneRecipe', () => {
    renderWithRouter(<DoneRecipe />);
  });
});
