import { screen, waitFor, fireEvent, cleanup, act, render } from '@testing-library/react';
import { vi } from 'vitest';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';

import RecipeDetails from '../components/RecipeDetails/RecipeDetails';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';
import mealsMock from '../mocks/mealsMock';
import drinks from '../mocks/drinksMock';

const whiteHeart = '/src/images/whiteHeartIcon.svg';
const blackHeart = '/src/images/blackHeartIcon.svg';

describe('Testes RecipeDetails Meals', () => {
  const mockk = () => { global.fetch = vi.fn(() => Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(mealsMock) }) as any); };

  beforeEach(mockk);
  // afterEach(cleanup);
  // afterEach(() => {
  //   localStorage.clear();
  // });

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
    const url = 'http://localhost:3000/meals/52977/';
    await waitFor(async () => {
      expect(await navigator.clipboard.readText()).toBe(url);
    }, { timeout: 1000 });

    await waitFor(() => { expect(localStorage.getItem('favoriteRecipes')).toBeDefined(); }, { timeout: 300 });
    const textCopy = screen.getByText(/link copied!/i);
    expect(textCopy).toBeInTheDocument();
    await waitFor(() => { expect(textCopy).not.toBeInTheDocument(); }, { timeout: 4000 });
    act(() => {
      fireEvent.click(heartFav);
    });

    await waitFor(() => { expect(heartFav).toHaveAttribute('src', whiteHeart); }, { timeout: 3000 });

    expect(JSON.parse(localStorage.getItem('favoriteRecipes')!)[0]).toBe(undefined);

    fireEvent.click(screen.getByRole('button', {
      name: /start recipe/i,
    }));
    await waitFor(() => { expect(window.location.href).toBe('http://localhost:3000/meals/52977/in-progress'); }, { timeout: 500 });
  });
});
