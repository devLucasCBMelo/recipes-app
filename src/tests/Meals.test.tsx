import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithRouter } from '../utils/helpers';
import App from '../App';
import mockMealsData from '../helpers/mockMealsData';

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    json: () => mockMealsData,
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Testes Meals', () => {
  it('Renderiza page Meals', async () => {
    renderWithRouter(<App />, { route: '/meals' });

    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    const promises = mockMealsData.meals.map(async (meal, index) => {
      const element = await screen.findByTestId(`${index}-recipe-card`);
      expect(element).toBeInTheDocument();
    });

    await Promise.all(promises);

    const recipeCards = await screen.findAllByTestId(/recipe-card/i);
    expect(recipeCards.length).toBe(12);
  });
});
