import { screen, waitFor, fireEvent, cleanup, act } from '@testing-library/react';
import { vi } from 'vitest';

import { createMemoryHistory } from 'history';
import RecipeDetails from '../components/RecipeDetails/RecipeDetails';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';
import mealsMock from '../mocks/mealsMock';
import drinks from '../mocks/drinksMock';

const whiteHeart = '/src/images/whiteHeartIcon.svg';
const blackHeart = '/src/images/blackHeartIcon.svg';

test('Renderiza botões de compartilhamento e favoritos corretamente', () => {
  const recipe = {
    strMeal: 'Receita Testee',
    strDrink: 'Drink Testee',
  };

  renderWithRouter(<RecipeDetails recipe={ recipe } recommendationType="Meal" />);

  const shareButton = screen.getByTestId('share-btn');
  const favoriteButton = screen.getByTestId('favorite-btn');

  expect(shareButton).toBeInTheDocument();
  expect(favoriteButton).toBeInTheDocument();

  fireEvent.click(shareButton);

  fireEvent.click(favoriteButton);
});

test('Renderiza categoria, instruções e ingredientes corretamente', () => {
  const recipe = {
    strCategory: 'Categoria Teste',
    strAlcoholic: 'Álcool Teste',
    strInstructions: 'Instruções Teste',
    ingredients: ['Ingrediente 1', 'Ingrediente 2'],
  };

  renderWithRouter(<RecipeDetails recipe={ recipe } recommendationType="Drink" />);

  expect(screen.getByTestId('recipe-category')).toHaveTextContent('Categoria Teste - Álcool Teste');
  expect(screen.getByTestId('instructions')).toHaveTextContent('Instruções Teste');

  expect(screen.getByTestId('0-ingredient-name-and-measure')).toHaveTextContent('Ingrediente 1 -');
  expect(screen.getByTestId('1-ingredient-name-and-measure')).toHaveTextContent('Ingrediente 2 -');
});

test('Copia o URL corretamente', async () => {
  const recipe = {
    strMeal: 'Receita Teste',
    strDrink: 'Drink Teste',
  };

  renderWithRouter(<RecipeDetails recipe={ recipe } recommendationType="Meal" />);

  const shareButton = screen.getByTestId('share-btn');

  fireEvent.click(shareButton);

  await waitFor(() => {
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
});

test('Adiciona e remove receita dos favoritos corretamente', () => {
  const recipe = {
    strMeal: 'Receita Teste',
    strDrink: 'Drink Teste',
  };

  renderWithRouter(<RecipeDetails recipe={ recipe } recommendationType="Meal" />);

  const favoriteButton = screen.getByTestId('favorite-btn');

  fireEvent.click(favoriteButton);

  expect(localStorage.getItem('favoriteRecipes')).toBeDefined();

  fireEvent.click(favoriteButton);

  expect(localStorage.getItem('favoriteRecipes')).toBeNull();
});

describe('Testes RecipeDetails Meals', () => {
  const mockk = () => { global.fetch = vi.fn(() => Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(mealsMock) }) as any); };

  beforeEach(mockk);
  afterEach(cleanup);
  it('Renderiza meal 52977', async () => {
    renderWithRouter(<App />, { route: '/meals/52977/' });
    await waitFor(() => { expect(screen.getByRole('heading', { name: /corba/i })).toBeInTheDocument(); }, { timeout: 5000 });

    expect(screen.getByRole('heading', { name: /ingredientes:/i })).toBeInTheDocument();
    const heartFav = screen.getByRole('img', { name: /favorite recipe/i });
    expect(heartFav).toBeInTheDocument();
    expect(heartFav).toHaveAttribute('src', whiteHeart);
    const shareClick = screen.getByRole('button', { name: /share/i });
    expect(shareClick).toBeInTheDocument();

    act(() => {
      fireEvent.click(heartFav);
    });

    await waitFor(() => { expect(heartFav).toHaveAttribute('src', blackHeart); }, { timeout: 5000 });
    // expect(localStorage.getItem('favoriteRecipes')).toBeDefined();
    expect(screen.getByRole('button', {
      name: /start recipe/i,
    })).toBeInTheDocument();

    await waitFor(() => { expect(screen.getByTitle(/recipe video/i)).toBeInTheDocument(); }, { timeout: 5000 });
    expect(localStorage.getItem('favoriteRecipes')).toBeDefined();
    const obaaa = JSON.parse(localStorage.getItem('favoriteRecipes')!)[0];
    expect(obaaa.id).toBe('52977');

    const shareButton = screen.getByRole('button', { name: /share/i });
    expect(shareButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(shareButton);
    });
    // expect(textCopy).toBeInTheDocument();

    await waitFor(() => { expect(localStorage.getItem('favoriteRecipes')).toBeDefined(); }, { timeout: 300 });
    const textCopy = screen.getByText(/link copied!/i);
    expect(textCopy).toBeInTheDocument();
  });
});

describe('Testes RecipeDetails Drinks', () => {
  const mockk2 = () => { global.fetch = vi.fn(() => Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(drinks) }) as any); };

  beforeEach(mockk2);
  afterEach(cleanup);

  it('Renderiza drink 13501', async () => {
    renderWithRouter(<App />, { route: '/drinks/13501/' });
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /start recipe/i })).toBeInTheDocument();
    }, { timeout: 5000 });
    const id = '13501';
    const history = createMemoryHistory();
    // const { strCategory, strInstructions, ingredients, strAlcoholic, strDrinkThumb, idDrink } = drinks.drinks[3];

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ingredientes:/i })).toBeInTheDocument();
    const heartFav = screen.getByRole('img', { name: /favorite recipe/i });
    expect(heartFav).toHaveAttribute('src', whiteHeart);
    expect(heartFav).toBeInTheDocument();
    const buttonFav = screen.getByText(/favorite/i);
    expect(buttonFav).toBeInTheDocument();

    fireEvent.click(buttonFav);

    // await waitFor(() => { expect(heartFav).toHaveAttribute('src', blackHeart); }, { timeout: 5000 });
    expect(localStorage.getItem('favoriteRecipes')).toBeDefined();

    const shareClick = screen.getByRole('button', { name: /share/i });
    expect(shareClick).toBeInTheDocument();

    // const startBtn = screen.getByTestId('start-recipe-btn');
    // fireEvent.click(startBtn);

    // await waitFor(() => {
    //   expect(history.location.pathname).toBe(`/drinks/${id}/in-progress`);
    // }, { timeout: 5000 });

    // const startButton = screen.getByRole('button', { name: /start recipe/i });
    // renderWithRouter(<RecipeDetails recipe={ drinks.drinks[2] } recommendationType="Drink" />, { route: `/drinks/${id}/` });
    // fireEvent.click(buttonFav);
    // await waitFor(() => { expect(heartFav).toHaveAttribute('src', blackHeart); }, { timeout: 5000 });
  });

  it('Renderiza drink 13501 direto no RecipeDetails', async () => {
    // const whiteHeart = '/src/images/whiteHeartIcon.svg';
    // const blackHeart = '/src/images/blackHeartIcon.svg';

    beforeEach(mockk2);
    afterEach(cleanup);
    const id = '13501';

    renderWithRouter(<RecipeDetails recipe={ drinks.drinks[2] } recommendationType="Drink" />, { route: `/drinks/${id}/` });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /start recipe/i })).toBeInTheDocument();
    }, { timeout: 5000 });
    const heartFav = screen.getByRole('img', { name: /favorite recipe/i });
    expect(heartFav).toHaveAttribute('src', whiteHeart);
    expect(heartFav).toBeInTheDocument();
    expect(screen.getByText(/ingredientes:/i)).toBeInTheDocument();
    const buttonFav = screen.getByText(/favorite/i);
    expect(buttonFav).toBeInTheDocument();
    const shareButton = screen.getByRole('button', { name: /share/i });
    expect(shareButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(shareButton);
    });
    // expect(textCopy).toBeInTheDocument();

    await waitFor(() => { expect(localStorage.getItem('favoriteRecipes')).toBeDefined(); }, { timeout: 300 });
    const textCopy = screen.getByText(/link copied!/i);
    expect(textCopy).toBeInTheDocument();

    // const obaaa = JSON.parse(localStorage.getItem('favoriteRecipes')!)[0];
    // expect(obaaa.id).toBe('13501');
    // await waitFor(() => { expect(heartFav).toHaveAttribute('src', blackHeart); }, { timeout: 1000 });
  });
});
