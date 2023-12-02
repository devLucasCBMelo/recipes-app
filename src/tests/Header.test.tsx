import { screen, act } from '@testing-library/react';
import { renderWithRouter } from '../utils/renderWithRouter';
import Header from '../components/Header/Header';
import SearchBarProvider from '../contex/SearchBarProvider';
import App from '../App';

const search = 'search-input';

describe('Testes Header', () => {
  it('Testa  Header na page "Meals', async () => {
    const { user } = renderWithRouter(<Header namePage="Meals" />, { route: '/meals' });
    const meals = screen.getByRole('heading', {
      name: /meals/i,
    });
    expect(meals).toBeInTheDocument();

    const searchButton = screen.getByRole('img', {
      name: /pesquisar/i,
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
      name: /pesquisar/i,
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
  it('Testa o Header na page "Meals" se o SearchBar aparece', async () => {
    const { user } = renderWithRouter(<Header namePage="Meals" />, { route: '/meals' });
    const meals = screen.getByRole('heading', {
      name: /meals/i,
    });
    expect(meals).toBeInTheDocument();

    const searchButton = screen.getByRole('img', {
      name: /pesquisar/i,
    });
    expect(searchButton).toBeInTheDocument();
    await user.click(searchButton);

    expect(screen.getByTestId(search)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
  it('Testa se o SearchBar na pagina "meals" faz a pesquisa corretamente', async () => {
    const { user } = renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
      { route: '/meals' },
    );
    const searchBtn = screen.getByRole('img', { name: /pesquisar/i });

    await user.click(searchBtn);

    const searchInput = screen.getByTestId(search);

    const inputType = 'chicken';

    await user.type(searchInput, inputType);

    // pega o radio button de ingrediente
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    await user.click(ingredientRadio);

    const searchButton = screen.getByRole('button', { name: /search/i });

    await user.click(searchButton);

    expect(await screen.findByText(/brown stew chicken/i)).toBeInTheDocument();

    await user.type(searchInput, inputType);

    const nameRadio = screen.getByTestId('name-search-radio');
    await user.click(nameRadio);

    await user.click(searchButton);

    expect(await screen.findByText(/chicken handi/i)).toBeInTheDocument();

    const inputType2 = 'a';
    await user.type(searchInput, inputType2);

    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    await user.click(firstLetterRadio);

    await user.click(searchButton);

    expect(await screen.findByText(/apple frangipan tart/i)).toBeInTheDocument();
  });

  it('Caso apenas uma comida seja encontrada, deve-se ir para sua rota de detalhes', async () => {
    const { user } = renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
      { route: '/meals' },
    );
    const searchBtn = screen.getByRole('img', { name: /pesquisar/i });

    await user.click(searchBtn);

    const searchInput = screen.getByTestId(search);

    const inputType = 'Arrabiata';

    const nameRadio = screen.getByTestId('name-search-radio');

    const searchButton = screen.getByRole('button', { name: /search/i });

    // verifica se a rota mudou para a rota de detalhes da comida

    await act(async () => {
      await user.type(searchInput, inputType);
      await user.click(nameRadio);
      await user.click(searchButton);
    });
  });
});
