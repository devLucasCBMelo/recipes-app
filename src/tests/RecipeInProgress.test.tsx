import { screen, waitFor, render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import RecipeInProgress from '../pages/RecipeInProgress';
import { renderWithRouter } from '../utils/helpers';
import App from '../App';

describe('Testes RecipeInProgress', () => {
  it('Renderiza loading', async () => {
    renderWithRouter(<RecipeInProgress />, { route: '/meals/53006/in-progress' });
    const loadingElement = screen.getByRole('heading', { name: /Loading.../i });
    expect(loadingElement).toBeInTheDocument();
  });
  it('Renderiza meal 53006', async () => {
    renderWithRouter(<App />, { route: '/meals/53006/in-progress' });
    const loadingElement = screen.getByRole('heading', { name: /Loading.../i });
    expect(loadingElement).toBeInTheDocument();
  });
  it('Renderiza meal 53006', async () => {
    renderWithRouter(<App />, { route: '/drinks/11006/in-progress' });
    const loadingElement = screen.getByRole('heading', { name: /Loading.../i });
    expect(loadingElement).toBeInTheDocument();
  });
});
