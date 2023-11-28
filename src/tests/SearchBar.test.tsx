import { fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithRouter } from '../utils/renderWithRouter';
import SearchBar from '../components/SearchBar/SearchBar';
import SearchBarProvider from '../contex/SearchBarProvider';

describe('Testes SearchBar', () => {
  const testIdName = 'name-search-radio';
  const testIdSearch = 'exec-search-btn';

  it('Testa SearchBar page Meals', async () => {
    const { user } = renderWithRouter(<SearchBarProvider><SearchBar /></SearchBarProvider>, { route: 'meals' });

    // const pesquisar = screen.getByTestId('search-top-btn');
    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    await user.type(input, 'a');
    expect(input.value).toBe('a');

    const inputIngredient = screen.getByTestId('ingredient-search-radio');
    expect(inputIngredient).toBeInTheDocument();
    await user.click(inputIngredient);

    const inputNome = screen.getByTestId(testIdName);
    expect(inputNome).toBeInTheDocument();
    await user.click(inputNome);

    const inputFirstLetter = screen.getByTestId('first-letter-search-radio');
    expect(inputFirstLetter).toBeInTheDocument();
    await user.click(inputFirstLetter);

    const search = screen.getByTestId(testIdSearch);
    expect(search).toBeInTheDocument();
    await user.click(search);
    fireEvent.click(search);

    // await waitFor(
    //   () => user.click(search),
    //   { timeout: 3000 },
    // );
  });

  it('Testa SearchBar page drinks', async () => {
    const { user } = renderWithRouter(<SearchBarProvider><SearchBar /></SearchBarProvider>, { route: 'drinks' });
    const input: HTMLInputElement = screen.getByRole('textbox');
    await user.type(input, 'Aquamarine');
    expect(input.value).toBe('Aquamarine');

    const inputNome = screen.getByTestId(testIdName);
    expect(inputNome).toBeInTheDocument();
    await user.click(inputNome);

    const search = screen.getByTestId(testIdSearch);
    expect(search).toBeInTheDocument();
    user.click(search);

    const MOCK_RECIPE = {
      meals: [
        {
          idMeal: '52771',
          strMeal: 'Spicy Arrabiata Penne',
        },
      ],
    };

    const MOCK_RESPONSE = {
      json: async () => MOCK_RECIPE,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE);

    // await waitFor(
    //   () => expect(location.pathname('/drinks/178319')),
    //   { timeout: 3000 },
    // );
  });

  it('Testa SearchBar page drinks', async () => {
    const { user } = renderWithRouter(<SearchBarProvider><SearchBar /></SearchBarProvider>, { route: 'drinks' });
    // const pesquisar = screen.getByTestId('search-top-btn');

    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    await user.type(input, 'a');
    expect(input.value).toBe('a');

    const inputIngredient = screen.getByTestId('ingredient-search-radio');
    expect(inputIngredient).toBeInTheDocument();
    await user.click(inputIngredient);

    const inputNome = screen.getByTestId(testIdName);
    expect(inputNome).toBeInTheDocument();
    await user.click(inputNome);

    const inputFirstLetter = screen.getByTestId('first-letter-search-radio');
    expect(inputFirstLetter).toBeInTheDocument();
    await user.click(inputFirstLetter);

    const search = screen.getByTestId(testIdSearch);
    expect(search).toBeInTheDocument();
    user.click(search);

    const MOCK_RECIPE = {
      drinks: [
        {
          idDrink: '178319',
          strDrink: 'Aquamarine',
        },
      ],
    };

    const MOCK_RESPONSE = {
      json: async () => MOCK_RECIPE,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE);
    // await waitFor(
    //   () => user.click(search),
    //   { timeout: 3000 },
  });
});
