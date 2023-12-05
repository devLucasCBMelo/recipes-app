import { screen, act, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithRouter } from '../utils/renderWithRouter';
import Header from '../components/Header/Header';
import SearchBarProvider from '../contex/SearchBarProvider';
import App from '../App';
import DefaultIcon from '../images/logo.png';

const search = 'search-input';
const nameRadioId = 'name-search-radio';
const ingredientRadioId = 'ingredient-search-radio';
const firstLetterRadioId = 'first-letter-search-radio';

describe('Testes Header', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Testa  Header na page "Meals', async () => {
    const { user } = renderWithRouter(<Header pageIcon={ DefaultIcon } namePage="Meals" />, { route: '/meals' });
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
    renderWithRouter(<Header pageIcon={ DefaultIcon } namePage="Profile" />, { route: '/profile' });
    const profile = screen.getByRole('heading', {
      name: /profile/i,
    });
    expect(profile).toBeInTheDocument();
  });

  it('Testa o Header na page "Drinks"', async () => {
    const { user } = renderWithRouter(<Header pageIcon={ DefaultIcon } namePage="Drinks" />, { route: '/drinks' });
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
    const { user } = renderWithRouter(<Header pageIcon={ DefaultIcon } namePage="Done Recipes" />, { route: '/done-recipes' });
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
    const { user } = renderWithRouter(<Header pageIcon={ DefaultIcon } namePage="Meals" />, { route: '/meals' });
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
    const ingredientRadio = screen.getByTestId(ingredientRadioId);
    await user.click(ingredientRadio);

    const searchButton = screen.getByRole('button', { name: /search/i });

    await user.click(searchButton);

    expect(await screen.findByText(/brown stew chicken/i)).toBeInTheDocument();

    await user.type(searchInput, inputType);

    const nameRadio = screen.getByTestId(nameRadioId);
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

  it('Caso apenas um nome comida seja encontrada na pesquisa do SearchBar do Meals, deve-se ir para sua rota de detalhes', async () => {
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

    const nameRadio = screen.getByTestId(nameRadioId);

    const searchButton = screen.getByRole('button', { name: /search/i });

    // verifica se a rota mudou para a rota de detalhes da comida

    await act(async () => {
      await user.type(searchInput, inputType);
      await user.click(nameRadio);
      await user.click(searchButton);
    });

    expect(await screen.findByRole('heading', { name: /spicy arrabiata penne/i })).toBeInTheDocument();
    const { pathname } = window.location;
    expect(pathname).toBe('/meals/52771');
  });

  it('Verifica se ao passar um ingrediente que não existe no SearchBar, é exibido um alerta, na pagina Meals', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const { user } = renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
      { route: '/meals' },
    );

    const searchBtn = screen.getByRole('img', { name: /pesquisar/i });

    await user.click(searchBtn);

    const searchInput = screen.getByTestId(search);

    const inputInvalid = 'invalid';

    const ingredientRadio = screen.getByTestId(ingredientRadioId);

    const searchButton = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      await user.type(searchInput, inputInvalid);
      await user.click(ingredientRadio);
      await user.click(searchButton);
    });

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith(
      "Sorry, we haven't found any recipes for these filters",
    )); // verifica se apareceu o alerta
  });

  it('Testa se o SearchBar na pagina "drinks" faz a pesquisa corretamente', async () => {
    const { user } = renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
      { route: '/drinks' },
    );
    const searchBtn = screen.getByRole('img', { name: /pesquisar/i });

    await user.click(searchBtn);

    const searchInput = screen.getByTestId(search);

    const inputType = 'Gin';

    await user.type(searchInput, inputType);

    // pega o radio button de ingrediente
    const ingredientRadio = screen.getByTestId(ingredientRadioId);
    await user.click(ingredientRadio);

    const searchButton = screen.getByRole('button', { name: /search/i });

    await user.click(searchButton);

    expect(await screen.findByText(/3-mile long island iced tea/i)).toBeInTheDocument();

    await user.type(searchInput, inputType);

    const nameRadio = screen.getByTestId(nameRadioId);
    await user.click(nameRadio);

    await user.click(searchButton);

    expect(await screen.findByText(/gin fizz/i)).toBeInTheDocument();

    const inputType2 = 'a';
    await user.type(searchInput, inputType2);

    const firstLetterRadio = screen.getByTestId(firstLetterRadioId);
    await user.click(firstLetterRadio);

    await user.click(searchButton);

    expect(await screen.findByText(/a1/i)).toBeInTheDocument();
  });

  it('Caso apenas um nome de bebida seja encontrada na pesquisa do SearchBar do Drinks, deve-se ir para sua rota de detalhes', async () => {
    const { user } = renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
      { route: '/drinks' },
    );
    const searchBtn = screen.getByRole('img', { name: /pesquisar/i });

    await user.click(searchBtn);

    const searchInput = screen.getByTestId(search);

    const inputType = 'water';

    const nameRadio = screen.getByTestId(nameRadioId);

    const searchButton = screen.getByRole('button', { name: /search/i });

    // verifica se a rota mudou para a rota de detalhes da comida

    await act(async () => {
      await user.type(searchInput, inputType);
      await user.click(nameRadio);
      await user.click(searchButton);
    });

    // espera mudar de rota.
    await waitFor(() => expect(window.location.pathname).toBe('/drinks/178332'));

    expect(await screen.findByRole('heading', { name: /smashed watermelon margarita/i })).toBeInTheDocument();
  });

  it('Verifica se ao passar um ingrediente que não existe no SearchBar, é exibido um alerta, na pagina Drinks', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const { user } = renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
      { route: '/drinks' },
    );

    const searchBtn = screen.getByRole('img', { name: /pesquisar/i });

    await user.click(searchBtn);

    const searchInput = screen.getByTestId(search);

    const inputInvalid = 'xablau';

    const nameRadio = screen.getByTestId(nameRadioId);

    const searchButton = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      await user.type(searchInput, inputInvalid);
      await user.click(nameRadio);
      await user.click(searchButton);
    });

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith(
      "Sorry, we haven't found any recipes for these filters",
    )); // verifica se apareceu o alerta
  });

  it('Testa se o SearchBar na pagina "drinks" quando passado mais de uma letra retorna um alert', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const { user } = renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
      { route: '/drinks' },
    );
    const searchBtn = screen.getByRole('img', { name: /pesquisar/i });

    await user.click(searchBtn);

    const searchInput = screen.getByTestId(search);

    const inputInvalid = 'xablau';

    const firstLetterRadio = screen.getByTestId(firstLetterRadioId);

    const searchButton = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      await user.type(searchInput, inputInvalid);
      await user.click(firstLetterRadio);
      await user.click(searchButton);
    });

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith(
      'Your search must have only 1 (one) character',
    )); // verifica se apareceu o alerta
  });

  it('Testa se o SearchBar na pagina "meals" quando passado mais de uma letra retorna um alert', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const { user } = renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
      { route: '/meals' },
    );
    const searchBtn = screen.getByRole('img', { name: /pesquisar/i });

    await user.click(searchBtn);

    const searchInput = screen.getByTestId(search);

    const inputInvalid = 'xablau';

    const firstLetterRadio = screen.getByTestId(firstLetterRadioId);

    const searchButton = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      await user.type(searchInput, inputInvalid);
      await user.click(firstLetterRadio);
      await user.click(searchButton);
    });

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith(
      'Your search must have only 1 (one) character',
    )); // verifica se apareceu o alerta
  });
});
