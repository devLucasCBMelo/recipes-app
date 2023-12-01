import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouter } from '../utils/renderWithRouter';
import SearchBarProvider from '../contex/SearchBarProvider';
import App from '../App';

const DONE_RECIPES_MOCK = [
  {
    id: '1',
    type: 'meal',
    nationality: 'br',
    category: 'carne',
    alcoholicOrNot: '',
    name: 'filé',
    image: '',
    doneDate: '1',
    tags: ['a', 'b'],
  },
  {
    id: '2',
    type: 'drink',
    nationality: 'br',
    category: 'cachaça',
    alcoholicOrNot: 'alcoholic',
    name: 'caipirinha',
    image: '',
    doneDate: '2',
    tags: ['c', 'd'],
  },
];

const drinkBtnText = 'filter-by-drink-btn';
const mealBtnText = 'filter-by-meal-btn';

describe('Verificando o funcionamento da página', () => {
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(fetch as any);

    localStorage.setItem('doneRecipes', JSON.stringify(DONE_RECIPES_MOCK));

    renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
      { route: 'done-recipes' },
    );
  });

  afterEach(() => localStorage.clear());

  test('Testa se os elementos são renderizados corretamente', () => {
    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId(mealBtnText)).toBeInTheDocument();
    expect(screen.getByTestId(drinkBtnText)).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getAllByTestId('0-horizontal-top-text').length).toBe(2);
    expect(screen.getByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-a-horizontal-tag')).toBeInTheDocument();
  });

  test('Testa o funcionamento do botão meals', async () => {
    const mealBtn = screen.getByTestId(mealBtnText);

    const mealEl = screen.getByText('carne');
    const drinkEl = screen.getByText('cachaça');

    await userEvent.click(mealBtn);
    expect(drinkEl).not.toBeInTheDocument();
    expect(mealEl).toBeInTheDocument();
  });

  test('Testa o funcionamento do botão drinks', async () => {
    const drinkBtn = screen.getByTestId(drinkBtnText);

    await userEvent.click(drinkBtn);

    expect(screen.queryByText('carne')).not.toBeInTheDocument();
    expect(screen.queryByText('cachaça')).toBeInTheDocument();
  });

  test('Testa o funcionamento do botão All', async () => {
    const mealBtn = screen.getByTestId(mealBtnText);
    const allBtn = screen.getByTestId('filter-by-all-btn');

    await userEvent.click(mealBtn);
    expect(screen.queryByText('cachaça')).not.toBeInTheDocument();

    await userEvent.click(allBtn);
    expect(screen.queryByText('cachaça')).toBeInTheDocument();
  });

  test('testa o clipboard', async () => {
    const shareBtnEl = await screen.findByTestId('0-horizontal-share-btn');

    await userEvent.click(shareBtnEl);

    const pageLink = await navigator.clipboard.readText();

    expect(pageLink).toBe('http://localhost:3000/meals/1');
  });
});
