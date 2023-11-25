import { screen } from '@testing-library/react';
import { renderWithRouter } from '../utils/helpers';
import Header from '../components/Header/Header';

describe('Testes Header', () => {
  it('Testa  Header na page "Meals', async () => {
    const { user } = renderWithRouter(<Header namePage="Meals" />, { route: '/meals' });
    const meals = screen.getByRole('heading', {
      name: /meals/i,
    });
    expect(meals).toBeInTheDocument();

    const searchButton = screen.getByRole('img', {
      name: /search/i,
    });
    expect(searchButton).toBeInTheDocument();
    await user.click(searchButton);

    const profileButton = screen.getByRole('img', {
      name: /profile/i,
    });
    expect(profileButton).toBeInTheDocument();
    await user.click(profileButton);
  });

  it('Testa o Header na page "Profile"', () => {
    renderWithRouter(<Header namePage="Profile" />, { route: '/profile' });
    const profile = screen.getByRole('heading', {
      name: /profile/i,
    });
    expect(profile).toBeInTheDocument();
  });

  it('Testa o Header na page "Drinks"', async () => {
    const { user } = renderWithRouter(<Header namePage="Drinks" />, { route: '/drinks' });
    const drinks = screen.getByRole('heading', {
      name: /drinks/i,
    });
    expect(drinks).toBeInTheDocument();
    const searchButton = screen.getByRole('img', {
      name: /search/i,
    });
    expect(searchButton).toBeInTheDocument();
    await user.click(searchButton);

    const profileButton = screen.getByRole('img', {
      name: /profile/i,
    });
    expect(profileButton).toBeInTheDocument();
    await user.click(profileButton);
  });

  it('Testa o Header na page "Done Recipes"', async () => {
    const { user } = renderWithRouter(<Header namePage="Done Recipes" />, { route: '/done-recipes' });
    const doneRec = screen.getByRole('heading', {
      name: /done recipes/i,
    });
    expect(doneRec).toBeInTheDocument();

    const profileButton = screen.getByRole('img', {
      name: /profile/i,
    });
    expect(profileButton).toBeInTheDocument();
    await user.click(profileButton);
  });
});
