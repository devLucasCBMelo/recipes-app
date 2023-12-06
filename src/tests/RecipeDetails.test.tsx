import { screen, waitFor, fireEvent, cleanup, act } from '@testing-library/react';
import { vi } from 'vitest';
// import RecipeDetails from '../components/RecipeDetails/RecipeDetails';
import { useNavigate } from 'react-router-dom';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';
import mealsMock from '../mocks/mealsMock';
import drinks from '../mocks/drinksMock';

describe('Testes RecipeDetails', () => {
  it('Renderiza meal 52977', async () => {
    const mockk = () => { global.fetch = vi.fn(() => Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(mealsMock) }) as any); };
    beforeEach(mockk);
    afterEach(cleanup);

    renderWithRouter(<App />, { route: '/meals/52977/' });
    await waitFor(() => { expect(screen.getByRole('heading', { name: /corba/i })).toBeInTheDocument(); }, { timeout: 5000 });

    expect(screen.getByRole('heading', { name: /ingredientes:/i })).toBeInTheDocument();
    const heartFav = screen.getByRole('img', { name: /favorite recipe/i });
    expect(heartFav).toBeInTheDocument();
    expect(heartFav).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
    const shareClick = screen.getByRole('button', { name: /share/i });
    expect(shareClick).toBeInTheDocument();

    act(() => {
      fireEvent.click(heartFav);
    });

    await waitFor(() => { expect(heartFav).toHaveAttribute('src', '/src/images/blackHeartIcon.svg'); }, { timeout: 5000 });
    expect(localStorage.getItem('favoriteRecipes')).toBeDefined();
    expect(screen.getByRole('button', {
      name: /start recipe/i,
    })).toBeInTheDocument();

    expect(localStorage.getItem('inProgressRecipe')).toBeDefined();
    act(() => {
      fireEvent.click(heartFav);
    });
    expect(localStorage.getItem('favoriteRecipes')).toBeDefined();
    await waitFor(() => { expect(screen.getByTitle(/recipe video/i)).toBeInTheDocument(); }, { timeout: 5000 });
  });

  it('Renderiza drink 15997', async () => {
    const mockk2 = () => { global.fetch = vi.fn(() => Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(drinks) }) as any); };
    beforeEach(mockk2);
    afterEach(cleanup);
    renderWithRouter(<App />, { route: '/drinks/15997/' });
    await waitFor(() => { expect(screen.getByRole('button', { name: /start recipe/i })).toBeInTheDocument(); }, { timeout: 5000 });

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ingredientes:/i })).toBeInTheDocument();
    const heartFav = screen.getByRole('img', { name: /favorite recipe/i });
    expect(heartFav).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
    expect(heartFav).toBeInTheDocument();
    // expect(screen.getByRole('heading', { name: /não contém álcool/i })).toBeInTheDocument();
    act(() => {
      fireEvent.click(heartFav);
    });
    await waitFor(() => { expect(heartFav).toHaveAttribute('src', '/src/images/blackHeartIcon.svg'); }, { timeout: 5000 });
    // expect(localStorage.getItem('favoriteRecipes')).toBeDefined();

    const shareClick = screen.getByRole('button', { name: /share/i });
    expect(shareClick).toBeInTheDocument();
    const startButton = screen.getByRole('button', { name: /start recipe/i });
  });
});
