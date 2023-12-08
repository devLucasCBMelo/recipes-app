import { screen, waitFor, fireEvent, cleanup, act, render } from '@testing-library/react';
import { vi } from 'vitest';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';

import RecipeDetails from '../components/RecipeDetails/RecipeDetails';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';
import drinksMock from '../mocks/drinksMock';
import drinkDetailsMock from '../mocks/drinkDetailsMock';
import mealDetailsMock from '../mocks/mealDetails.Mock';

const whiteHeart = '/src/images/whiteHeartIcon.svg';
const blackHeart = '/src/images/blackHeartIcon.svg';

describe('Testes RecipeDetails Drinks', () => {
  const mock2 = () => { global.fetch = vi.fn(() => Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(drinksMock) }) as any); };

  beforeEach(() => {
    mock2();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Renderiza drink 13501', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks/13501/' });
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /start recipe/i })).toBeInTheDocument();
    }, { timeout: 5000 });

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ingredientes:/i })).toBeInTheDocument();

    const buttonFav = screen.getByText(/favorite/i);
    expect(buttonFav).toBeInTheDocument();
    const heartFav = screen.getByRole('img', { name: /favorite recipe/i });
    expect(heartFav).toHaveAttribute('src', whiteHeart);
    expect(heartFav).toBeInTheDocument();
    act(() => {
      user.click(heartFav);
    });

    await waitFor(() => { expect(heartFav).toHaveAttribute('src', blackHeart); }, { timeout: 5000 });

    expect(localStorage.getItem('favoriteRecipes')).toBeDefined();

    const shareClick = screen.getByRole('button', { name: /share/i });
    expect(shareClick).toBeInTheDocument();

    act(() => {
      fireEvent.click(shareClick);
    });
    const url = 'http://localhost:3000/drinks/13501/';
    await waitFor(async () => {
      expect(await navigator.clipboard.readText()).toBe(url);
    }, { timeout: 1000 });
  });

  it('Renderiza drink 17203 direto no RecipeDetails', async () => {
    const id = '17203';

    renderWithRouter(<RecipeDetails recipe={ drinksMock.drinks[2] } recommendationType="Drink" />, { route: `/drinks/${id}/` });

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

    await waitFor(() => { expect(localStorage.getItem('favoriteRecipes')).toBeDefined(); }, { timeout: 300 });
    const textCopy = screen.getByText(/link copied!/i);
    expect(textCopy).toBeInTheDocument();

    act(() => {
      fireEvent.click(shareButton);
    });
    const url = 'http://localhost:3000/drinks/17203/';
    await waitFor(async () => {
      expect(await navigator.clipboard.readText()).toBe(url);
    }, { timeout: 1000 });
  });
});

describe('Testar somente a questao de favoritar', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('Favorita e Desfavorita', async () => {
    const mockMealFav = {
      idMeal: '52977',
      strMeal: 'Corba',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      strCategory: 'Side',
      strInstructions: 'Pick through your lentils for any foreign debris.',
      ingredients: ['Lentils', 'Onion', 'Carrots'],
      strArea: 'Turkish',
      strYoutube: 'https://www.youtube.com/watch?v=VVnZd8A84z4',
    };
    render(
      <BrowserRouter>

        <RecipeDetails recipe={ mockMealFav } recommendationType="Meal" />

      </BrowserRouter>,
    );
    const heartFav = screen.getByRole('img', { name: /favorite recipe/i });
    expect(heartFav).toHaveAttribute('src', whiteHeart);
    act(() => {
      fireEvent.click(heartFav);
    });

    expect(heartFav).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ingredientes:/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
    expect(localStorage.getItem('favoriteRecipes')).toBeDefined();
  });
});

describe('Testa se a pagina de detalhes de bebidas', () => {
  const drinkStorage = {
    id: '17222',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    name: 'A1',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    alcoholicOrNot: 'Alcoholic',
  };
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([drinkStorage]));
  });

  it('Verifica se quando a pagina é carregada, se a bebida já está favoritada', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => drinkDetailsMock,
    } as Response);

    renderWithRouter(<App />, { route: '/drinks/17222/' });

    const titleDrink = await waitFor(() => screen.getByTestId('recipe-title'));
    expect(titleDrink).toBeInTheDocument();

    expect(localStorage.getItem('favoriteRecipes')).toBeDefined();
    expect(localStorage.getItem('favoriteRecipes')).toContain('17222');

    const btnFav = screen.getByRole('img', {
      name: /favorite recipe/i,
    });
    expect(btnFav).toBeInTheDocument();
    expect(btnFav).toHaveAttribute('src', blackHeart);
  });
});

describe('Verifica botão de "Continuar Receita" em comida', () => {
  beforeEach(() => {
    const inProgressRecipes = {
      meals: {
        52771: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mealDetailsMock,
    } as Response);
  });
  it('Verifica se o botão de "Continuar Receita" aparece quando uma receita de comida já foi iniciada', async () => {
    renderWithRouter(<App />, { route: '/meals/52771/' });
    const btnContinue = await waitFor(() => screen.getByRole('button', { name: /continue recipe/i }));
    expect(btnContinue).toBeInTheDocument();
  });
});

describe('Verifica botão de "Continuar Receita" em bebidas', () => {
  beforeEach(() => {
    const inProgressRecipes = {
      drinks: {
        178319: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => drinkDetailsMock,
    } as Response);
  });
  it('Verifica se o botão de "Continuar Receita" aparece quando uma receita de comida já foi iniciada', async () => {
    renderWithRouter(<App />, { route: '/drinks/178319/' });
    const btnContinue = await waitFor(() => screen.getByRole('button', { name: /continue recipe/i }));
    expect(btnContinue).toBeInTheDocument();
  });
});
