import { screen } from '@testing-library/react';
import { renderWithRouter } from '../utils/helpers';
import SearchBar from '../components/SearchBar/SearchBar';

describe('Testes SearchBar', () => {
  it('Testa SearchBar page Meals', async () => {
    const { user } = renderWithRouter(<SearchBar />, { route: 'meals' });
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    await user.type(input, 'a');
    const buttonSearch = screen.getByRole('button', {
      name: /search/i,
    });
    expect(buttonSearch).toBeInTheDocument();
    // const radio = screen.findByText(/ingredientnamefirst letter/i);
    // expect(radio).toBeInTheDocument();
  });

  it('Testa SearchBar page drinks', async () => {
    const { user } = renderWithRouter(<SearchBar />, { route: 'drinks' });
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    await user.type(input, 'a');
    const buttonSearch = screen.getByRole('button', {
      name: /search/i,
    });
    expect(buttonSearch).toBeInTheDocument();
    // await user.click(buttonSearch);
  });
});
