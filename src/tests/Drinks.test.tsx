import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';
import mockDrinksData from '../helpers/mockDrinksData';

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    json: () => mockDrinksData,
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Testes Meals', () => {
  it('Renderiza page Meals', async () => {
    renderWithRouter(<App />, { route: '/drinks' });

    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    const promises = mockDrinksData.drinks.map(async (meal, index) => {
      const element = await screen.findByTestId(`${index}-recipe-card`);
      expect(element).toBeInTheDocument();
    });

    await Promise.all(promises);

    const recipeCards = await screen.findAllByTestId(/recipe-card/i);
    expect(recipeCards.length).toBe(12);
  });
});
