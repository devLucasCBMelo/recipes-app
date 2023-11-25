// import { screen } from '@testing-library/react';
import { renderWithRouter } from '../utils/helpers';
import MealRecipe from '../pages/MealRecipe';

describe('Testes Meals', () => {
  it('Renderiza page MealRecipe', () => {
    renderWithRouter(<MealRecipe />);
  });
});
