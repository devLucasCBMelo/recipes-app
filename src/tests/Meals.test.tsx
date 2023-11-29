import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';
import mockMealsData from '../helpers/mockMealsData';
import mockMealsCategories from '../helpers/mockMealsCategories';

// teste

afterEach(() => {
  vi.clearAllMocks();
});

describe('Testes Meals', () => {
  it('Renderiza page Meals', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => mockMealsData,
    });

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

  it('Testa se renderiza 5 botões com as 5 primeiras categorias', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => mockMealsCategories,
    });
    renderWithRouter(<App />, { route: '/meals' });

    const categoryButtons = await screen.findAllByTestId(/category-filter/i);
    expect(categoryButtons.length).toBe(5);
  });
});
