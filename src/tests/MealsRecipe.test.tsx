// import { screen } from '@testing-library/react';
import { renderWithRouter } from '../utils/renderWithRouter';
import MealRecipe from '../pages/MealRecipe';

describe('Testes Meals', () => {
  it('Renderiza page MealRecipe', () => {
    renderWithRouter(<MealRecipe />);
  });
});
