// import { screen } from '@testing-library/react';
import { renderWithRouter } from '../utils/helpers';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testes DoneRecipes', () => {
  it('Renderiza page FavoriteRecipes', () => {
    renderWithRouter(<FavoriteRecipes />);
  });
});
