import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../utils/helpers';
import App from '../App';
import Footer from '../components/Footer/Footer';

describe('Testando o footer', () => {
  test('verificar se os botões de drinks e meals estão sendo renderizados', () => {
    renderWithRouter(<Footer />);

    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    const mealsButton = screen.getByTestId('meals-bottom-btn');

    expect(drinksButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
  });

  test('verificar se ao clicar no botão de drinks, a rota muda para a página de drinks', async () => {
    renderWithRouter(
      <App />,
      { route: '/meals' },
    );

    const drinksButton = screen.getByTestId('drinks-bottom-btn');

    expect(screen.getByText(/Meals/i)).toBeInTheDocument();

    await userEvent.click(drinksButton);

    expect(screen.getByText(/Drinks/i)).toBeInTheDocument();
  });

  test('verificar se ao clicar no botão de meals, a rota muda para a página de meals', async () => {
    renderWithRouter(
      <App />,
      { route: '/drinks' },
    );

    const mealsButton = await screen.findByTestId('meals-bottom-btn');

    expect(await screen.findByText(/Drinks/i)).toBeInTheDocument();

    await userEvent.click(mealsButton);

    expect(await screen.findByText(/Meals/i)).toBeInTheDocument();
  });
});
