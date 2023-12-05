import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';
import mockDrinksData from '../helpers/mockDrinksData';
import mockDrinksCategories from '../helpers/mockDrinksCategories';
import SearchBarProvider from '../contex/SearchBarProvider';
import FilterBarProvider from '../contex/FilterBarProvider';
import fetchMock from '../helpers/fetchMocks';
import FilterBar from '../components/FilterBar/FilterBar';

const drinksDataAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

afterEach(() => {
  vi.clearAllMocks();
});

describe('Testes Meals', () => {
  it('Renderiza page Meals', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => mockDrinksData,
    });

    renderWithRouter(<SearchBarProvider><App /></SearchBarProvider>, { route: '/drinks' });

    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    const promises = mockDrinksData.drinks.map(async (meal, index) => {
      const element = await screen.findByTestId(`${index}-recipe-card`);
      expect(element).toBeInTheDocument();
    });

    await Promise.all(promises);

    const recipeCards = await screen.findAllByTestId(/recipe-card/i);
    expect(recipeCards.length).toBe(12);
  });

  it('Testa se renderiza 5 botões com as 5 primeiras categorias', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => mockDrinksCategories,
    });

    renderWithRouter(
      <SearchBarProvider>
        <FilterBarProvider>
          <App />
        </FilterBarProvider>
      </SearchBarProvider>,
      { route: '/drinks' },
    );

    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    waitFor(() => {
      const categoryButtons = screen.getAllByTestId(/-category-filter/i);
      expect(categoryButtons.length).toBe(5);
    }, { timeout: 3000 });

    const ordinaryButton = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(ordinaryButton).toBeInTheDocument();

    const cocktailButton = await screen.findByTestId('Cocktail-category-filter');
    expect(cocktailButton).toBeInTheDocument();

    const shakeButton = await screen.findByTestId('Shake-category-filter');
    expect(shakeButton).toBeInTheDocument();

    const otherUnkownButton = await screen.findByTestId('Other / Unknown-category-filter');
    expect(otherUnkownButton).toBeInTheDocument();

    const cocoaButton = await screen.findByTestId('Cocoa-category-filter');
    expect(cocoaButton).toBeInTheDocument();
  });

  it('Teste se ao clicar nos filtros de Drink, ele filtra por categoria', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock as any);

    renderWithRouter(
      <SearchBarProvider>
        <FilterBarProvider>
          <App />
        </FilterBarProvider>
      </SearchBarProvider>,
      { route: '/drinks' },
    );

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(drinksDataAPI);

    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    const ggDrink = await screen.findByText(/GG/i);
    expect(ggDrink).toBeInTheDocument();

    const cocktailButton = await screen.findByTestId(/Cocktail-category-filter/i);
    expect(cocktailButton).toBeInTheDocument();

    await userEvent.click(cocktailButton);

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');

    expect(ggDrink).not.toBeInTheDocument();

    const allFilterButton = await screen.findByTestId('All-category-filter');
    expect(allFilterButton).toBeInTheDocument();

    await userEvent.click(allFilterButton);

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

    const ggDrink2 = await screen.findByText(/GG/i);
    expect(ggDrink2).toBeInTheDocument();
  });

  it('Testa se ao clicar no mesmo filtro uma segunda vez, ele retorna a lista principal sem filtros', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchMock as any);

    renderWithRouter(
      <SearchBarProvider>
        <FilterBarProvider>
          <App />
        </FilterBarProvider>
      </SearchBarProvider>,
      { route: '/drinks' },
    );

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(drinksDataAPI);

    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    const ggDrink = await screen.findByText(/GG/i);
    expect(ggDrink).toBeInTheDocument();

    const cocktailButton = await screen.findByTestId(/Cocktail-category-filter/i);
    expect(cocktailButton).toBeInTheDocument();

    await userEvent.click(cocktailButton);

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');

    expect(ggDrink).not.toBeInTheDocument();

    await userEvent.click(cocktailButton);

    expect(global.fetch).toHaveBeenCalledWith(drinksDataAPI);

    const ggDrink2 = await screen.findByText(/GG/i);
    expect(ggDrink2).toBeInTheDocument();
  });

  it('Teste se a API retorna erro', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.reject());

    renderWithRouter(
      <SearchBarProvider>
        <FilterBarProvider>
          <App />
        </FilterBarProvider>
      </SearchBarProvider>,
      { route: '/drinks' },
    );

    const loading = screen.getByText(/Loading/i);
    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    const a1Card = await screen.queryByText(/A1/i);
    expect(a1Card).not.toBeInTheDocument();
  });

  it('Teste se a API filterBar', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.reject());

    renderWithRouter(
      <SearchBarProvider>
        <FilterBarProvider>
          <FilterBar namePage="drinks" />
        </FilterBarProvider>
      </SearchBarProvider>,
      { route: '/meals' },
    );

    const loading = screen.getByText(/Loading/i);
    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    const allButton = await screen.findByTestId(/All-category-filter/i);
    expect(allButton).toBeInTheDocument();

    const cocktailButton = screen.queryByTestId('Cocktail-category-filter');
    expect(cocktailButton).not.toBeInTheDocument();
  });
});
