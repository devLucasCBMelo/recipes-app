import { screen, waitFor, render } from '@testing-library/react';
// import { MemoryRouter, Route } from 'react-router-dom';
import RecipeInProgress from '../pages/RecipeInProgress';
import { renderWithRouter } from '../utils/renderWithRouter';
import App from '../App';

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
