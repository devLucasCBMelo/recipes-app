// import { screen } from '@testing-library/react';
import { renderWithRouter } from '../utils/renderWithRouter';
import DoneRecipe from '../pages/DoneRecipes';

describe('Testes DoneRecipe', () => {
  it('Renderiza page DoneRecipe', () => {
    renderWithRouter(<DoneRecipe />);
  });
});
