import { screen, within } from '@testing-library/react';
import { renderWithRouter } from '../utils/renderWithRouter';
import Profile from '../pages/Profile';
import App from '../App';
import SearchBarProvider from '../contex/SearchBarProvider';

describe('Testes Profile', () => {
  // it('Verifica se Profile renderiza os itens certos', () => {
  //   renderWithRouter(<Profile />);
  //   // const banner = screen.getByRole('banner');
  //   // within(banner).getByRole('img', { name: /logo/i });
  //   expect(screen.getByRole('img', { name: /title/i })).toBeInTheDocument();
  //   const button = screen.getByRole('button', { name: /profile/i });
  //   within(button).getByRole('img', { name: /profile/i });
  //   expect(screen.getByRole('img', { name: /profile ico page/i })).toBeInTheDocument();
  //   expect(screen.getByRole('heading', { name: /profile/i })).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: /done recipes button icon done recipes/i })).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: /favorite recipes button icon favorite recipes/i })).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: /logout button icon logout/i })).toBeInTheDocument();
  // });
  it('Verifica se Profile renderiza o email do usuário', () => {
    renderWithRouter(<Profile />);
    const setEmailLocalStorage = 'email@test.com';
    localStorage.setItem('user', JSON.stringify({ email: setEmailLocalStorage }));
    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
  });
  it('Verifica se ao clicar no botão Done Recipes, a rota muda para /done-recipes', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });
    const button = screen.getByRole('button', { name: /done recipes button icon done recipes/i });
    expect(button).toBeInTheDocument();
    await user.click(button);

    expect(screen.getByRole('heading', {
      name: /done recipes/i,
    })).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão Favorite Recipes, a rota muda para /favorite-recipes', async () => {
    const { user } = renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
      { route: '/profile' },
    );
    const button = screen.getByRole('button', { name: /favorite recipes button icon favorite recipes/i });
    expect(button).toBeInTheDocument();
    await user.click(button);

    expect(screen.getByRole('heading', {
      name: /favorite recipes/i,
    })).toBeInTheDocument();
  });
  it('Verifica se ao clicar no botão Logout, a rota muda para /', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });
    const button = screen.getByRole('button', { name: /logout button icon logout/i });
    expect(button).toBeInTheDocument();
    await user.click(button);

    expect(screen.getByRole('heading', {
      name: /login/i,
    })).toBeInTheDocument();
  });
});
