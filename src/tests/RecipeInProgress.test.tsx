import { screen, waitFor, fireEvent, cleanup } from '@testing-library/react';
import { vi } from 'vitest';
import RecipeInProgress from '../pages/RecipeInProgress';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';
import mealsMock from '../mocks/mealsMock';
import drinks from '../mocks/drinksMock';

describe('Testes RecipeInProgress', () => {
  it('Renderiza loading', async () => {
    renderWithRouter(<RecipeInProgress />, { route: '/meals/53006/in-progress' });
    const loadingElement = screen.getByRole('heading', { name: /Loading.../i });
    expect(loadingElement).toBeInTheDocument();
  });

  describe('Testando erros', () => {
    beforeEach(cleanup);
    it('testando erro drink 18839849', async () => {
      renderWithRouter(<App />, { route: '/drinks/18839849/in-progress' });
      await waitFor(() => { expect(screen.getByRole('heading', { name: /erro/i })).toBeInTheDocument(); }, { timeout: 5000 });
    });
  });

  it('Renderiza e testa meal 53006', async () => {
    renderWithRouter(<App />, { route: '/drinks/11006/in-progress' });
    const loadingElement = screen.getByRole('heading', { name: /Loading.../i });
    expect(loadingElement).toBeInTheDocument();
  });
});

describe('Testando com o mock meals', () => {
  const mockk = () => { global.fetch = vi.fn(() => Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(mealsMock) }) as any); };

  const whiteHeart = '/src/images/whiteHeartIcon.svg';
  const blackHeart = '/src/images/blackHeartIcon.svg';
  beforeEach(mockk);
  afterEach(cleanup);
  it('testar mock com meal 52977', async () => {
    renderWithRouter(<App />, { route: '/meals/52977/in-progress' });

    await waitFor(() => {
      const title = screen.getByRole('heading', { name: /corba/i });
      expect(title).toBeInTheDocument();
    }, { timeout: 5000 });
    expect(screen.getByText(/lentils 1 cup/i)).toBeInTheDocument();
    const favoriteimg = screen.getByRole('img', { name: /favorite recipe/i });
    expect(favoriteimg).toBeInTheDocument();
    expect(favoriteimg).toHaveAttribute('src', whiteHeart);
    fireEvent.click(favoriteimg);
    expect(favoriteimg).toHaveAttribute('src', blackHeart);
    const compartilharButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(compartilharButton);
    expect(localStorage.getItem('inProgressRecipe')).toBeDefined();
    const localStor = JSON.parse(localStorage.getItem('inProgressRecipe')!);
    expect(localStor.meals.id).toBe('52977');
    await waitFor(() => { expect(screen.getByText(/link copied!/i)).toBeInTheDocument(); }, { timeout: 1000 });
    // await waitFor(() => { expect(window.navigator.clipboard).toBe('http://localhost:3000/meals/52977'); }, { timeout: 5000 });
    expect(screen.getByRole('button', { name: /finish/i })).toBeDisabled();
    expect(localStorage.getItem('inProgressRecipe')).toBeDefined();
    fireEvent.click(screen.getByRole('checkbox', { name: /lentils 1 cup/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /onion 1 large/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /carrots 1 large/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /tomato puree 1 tbs/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /cumin 2 tsp/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /paprika 1 tsp/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /mint 1\/2 tsp/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /thyme 1\/2 tsp/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /black pepper 1\/4 tsp/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /red pepper flakes 1\/4 tsp/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /vegetable stock 4 cups/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /water 1 cup/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /sea salt pinch/i }));
    expect(screen.getByRole('button', { name: /finish/i })).not.toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /finish/i }));
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /done recipes/i })).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});

describe('Testando com o mock drinks', () => {
  const mockk2 = () => { global.fetch = vi.fn(() => Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(drinks) }) as any); };

  const whiteHeart = '/src/images/whiteHeartIcon.svg';
  const blackHeart = '/src/images/blackHeartIcon.svg';

  beforeEach(mockk2);
  afterEach(cleanup);
  it('testar mock com drink 15997', async () => {
    renderWithRouter(<App />, { route: '/drinks/15997/in-progress' });
    await waitFor(() => {
      const title = screen.getByRole('heading', { name: /gg/i });
      expect(title).toBeInTheDocument();
    }, { timeout: 5000 });
    expect(screen.getByText(/galliano 2 1\/2 shots/i)).toBeInTheDocument();
    const favoriteimg = screen.getByRole('img', { name: /favorite recipe/i });
    expect(favoriteimg).toBeInTheDocument();
    expect(favoriteimg).toHaveAttribute('src', whiteHeart);
    fireEvent.click(favoriteimg);
    expect(favoriteimg).toHaveAttribute('src', blackHeart);
    const localStor = JSON.parse(localStorage.getItem('inProgressRecipe')!);
    expect(localStor.drinks.id).toBe('15997');

    const compartilharButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(screen.getByText(/favorite/i));
    expect(favoriteimg).toHaveAttribute('src', whiteHeart);
    fireEvent.click(screen.getByText(/favorite/i));
    expect(favoriteimg).toHaveAttribute('src', blackHeart);
    fireEvent.click(compartilharButton);
    await waitFor(() => { expect(screen.getByText(/link copied!/i)).toBeInTheDocument(); }, { timeout: 1000 });
    // await waitFor(() => { expect(window.navigator.clipboard).toBe('http://localhost:3000/drinks/15997'); }, { timeout: 5000 });

    expect(screen.getByRole('button', { name: /finish/i })).toBeDisabled();
    fireEvent.click(screen.getByRole('checkbox', { name: /galliano 2 1\/2 shots/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /ginger ale null/i }));
    fireEvent.click(compartilharButton);
    fireEvent.click(screen.getByRole('checkbox', { name: /ice null/i }));
    expect(screen.getByRole('button', { name: /finish/i })).not.toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /finish/i }));
    expect(localStorage.getItem('inProgressRecipe')).toBeDefined();
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /done recipes/i })).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});
