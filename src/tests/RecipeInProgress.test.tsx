import { screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import RecipeInProgress from '../pages/RecipeInProgress';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';
import mealsMock from '../mocks/mealsMock';

describe('Testes RecipeInProgress', () => {
  it('Renderiza loading', async () => {
    renderWithRouter(<RecipeInProgress />, { route: '/meals/53006/in-progress' });
    const loadingElement = screen.getByRole('heading', { name: /Loading.../i });
    expect(loadingElement).toBeInTheDocument();
  });

  // it('Renderiza meal 53006', async () => {
  //   renderWithRouter(<App />, { route: '/meals/53006/in-progress' });
  //   const loadingElement = screen.getByRole('heading', { name: /Loading.../i });
  //   expect(loadingElement).toBeInTheDocument();
  // });

  it('Renderiza e testa meal 53006', async () => {
    renderWithRouter(<App />, { route: '/drinks/11006/in-progress' });
    const loadingElement = screen.getByRole('heading', { name: /Loading.../i });
    expect(loadingElement).toBeInTheDocument();
    // await waitFor(() => {
    //   expect(loadingElement).not.toBeInTheDocument();
    // });
    // const heading = screen.getByRole('heading', { name: /daiquiri/i });
    // await waitFor(() => {
    //   expect(heading).toBeInTheDocument();
    // });
    // await waitFor(() => {
    //   expect(screen.getByText(/light rum 1 1\/2 oz/i)).toBeInTheDocument();
    // }, { timeout: 5000 });
  });
});

describe('Testando com o mock', () => {
  const mockk = () => { global.fetch = vi.fn(() => Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(mealsMock) }) as any); };

  beforeEach(mockk);
  it('testar mock com meal 52977', async () => {
    // vi.spyOn(global, 'fetch').mockResolvedValue({
    //   json: async () => mealsMock.meals,
    //   ok: true,
    // } as Response);
    renderWithRouter(<App />, { route: '/meals/52977/in-progress' });

    await waitFor(() => {
      const title = screen.getByRole('heading', { name: /corba/i });
      expect(title).toBeInTheDocument();
    }, { timeout: 5000 });
    expect(screen.getByText(/lentils 1 cup/i)).toBeInTheDocument();
    const favoriteimg = screen.getByRole('img', { name: /favorite recipe/i });
    expect(favoriteimg).toBeInTheDocument();
    expect(favoriteimg).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
    fireEvent.click(favoriteimg);
    expect(favoriteimg).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
    const compartilharButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(compartilharButton);
    await waitFor(() => { expect(screen.getByText(/link copied!/i)).toBeInTheDocument(); }, { timeout: 1000 });
  });
});
