import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';
import mockMealsData from '../helpers/mockMealsData';
import mockMealsCategories from '../helpers/mockMealsCategories';
import SearchBarProvider from '../contex/SearchBarProvider';
import FilterBarProvider from '../contex/FilterBarProvider';
import fetchMock from '../helpers/fetchMocks';

const mealsDataAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
// teste

afterEach(() => {
  vi.clearAllMocks();
});

describe('Testes Meals', () => {
  it('Renderiza page Meals', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => mockMealsData,
    });

    renderWithRouter(<SearchBarProvider><App /></SearchBarProvider>, { route: '/meals' });

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
    renderWithRouter(
      <SearchBarProvider>
        <FilterBarProvider>
          <App />
        </FilterBarProvider>
      </SearchBarProvider>,
      { route: '/meals' },
    );

    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    waitFor(() => {
      const categoryButtons = screen.getAllByTestId(/-category-filter/i);
      expect(categoryButtons.length).toBe(5);
    }, { timeout: 3000 });

    const beefButton = await screen.findByTestId('Beef-category-filter');
    expect(beefButton).toBeInTheDocument();

    const breakFastButton = await screen.findByTestId(/breakfast-category-filter/i);
    expect(breakFastButton).toBeInTheDocument();

    const chickenButton = await screen.findByTestId(/chicken-category-filter/i);
    expect(chickenButton).toBeInTheDocument();

    const dessertButton = await screen.findByTestId(/dessert-category-filter/i);
    expect(dessertButton).toBeInTheDocument();

    const goatButton = await screen.findByTestId(/goat-category-filter/i);
    expect(goatButton).toBeInTheDocument();
  });

  it('Teste se ao clicar nos botões, ele filtra por categoria', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock as any);

    renderWithRouter(
      <SearchBarProvider>
        <FilterBarProvider>
          <App />
        </FilterBarProvider>
      </SearchBarProvider>,
      { route: '/meals' },
    );

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(mealsDataAPI);

    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    const corbaMeal = await screen.findByText(/corba/i);
    expect(corbaMeal).toBeInTheDocument();

    const beefButton = await screen.findByTestId(/beef-category-filter/i);
    expect(beefButton).toBeInTheDocument();

    await userEvent.click(beefButton);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');

    expect(corbaMeal).not.toBeInTheDocument();

    const allFilterButton = await screen.findByTestId('All-category-filter');
    expect(allFilterButton).toBeInTheDocument();

    await userEvent.click(allFilterButton);

    expect(global.fetch).toHaveBeenCalledWith(mealsDataAPI);

    const corbaMeal2 = await screen.findByText(/corba/i);
    expect(corbaMeal2).toBeInTheDocument();
  });

  it.only('Testa se ao clicar no mesmo filtro uma segunda vez, ele retorna a lista principal sem filtros', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock as any);

    renderWithRouter(
      <SearchBarProvider>
        <FilterBarProvider>
          <App />
        </FilterBarProvider>
      </SearchBarProvider>,
      { route: '/meals' },
    );

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(mealsDataAPI);

    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    const corbaMeal = await screen.findByText(/corba/i);
    expect(corbaMeal).toBeInTheDocument();

    const beefButton = await screen.findByTestId(/beef-category-filter/i);
    expect(beefButton).toBeInTheDocument();

    await userEvent.click(beefButton);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');

    expect(corbaMeal).not.toBeInTheDocument();

    await userEvent.click(beefButton);

    expect(global.fetch).toHaveBeenCalledWith(mealsDataAPI);

    const corbaMeal2 = await screen.findByText(/corba/i);
    expect(corbaMeal2).toBeInTheDocument();
  });
});
