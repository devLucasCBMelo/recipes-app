import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithRouter } from '../utils/renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import SearchBarProvider from '../contex/SearchBarProvider';
import { favoriteRecipes } from '../mocks/mockLocalStorage';
import App from '../App';

const favoriteBtn = '0-horizontal-favorite-btn';

describe('Testes DoneRecipes', () => {
  // mock de favoriteRecipes no localStorage
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

  // limpa o mock do localStorage
  // limpa o mock do handleFilter
  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('Verifica se page FavoriteRecipes renderiza o Header', () => {
    renderWithRouter(
      <SearchBarProvider>
        <FavoriteRecipes />
      </SearchBarProvider>,
    );
    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /title/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /profile/i })).toBeInTheDocument();
  });

  it('Verifica se page FavoriteRecipes renderiza o Filtros', () => {
    renderWithRouter(
      <SearchBarProvider>
        <FavoriteRecipes />
      </SearchBarProvider>,
    );
    expect(screen.getByRole('img', { name: /all recipes filter icon/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /meals filter icon/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /drinks filter icon/i })).toBeInTheDocument();
  });

  it('Verifica se FavoriteRecipes assim que renderizado recupera as receitas favoritas do localStorage', () => {
    renderWithRouter(
      <SearchBarProvider>
        <FavoriteRecipes />
      </SearchBarProvider>,
    );
    const favoriteRecipesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    expect(favoriteRecipesLocalStorage).toEqual(favoriteRecipes);
  });

  it('Verifica se page FavoriteRecipes renderiza os cards de meal de receitas favoritas', () => {
    renderWithRouter(
      <SearchBarProvider>
        <FavoriteRecipes />
      </SearchBarProvider>,
    );
    const firstRecipesImg = screen.getByTestId('0-horizontal-image').getAttribute('src');
    expect(firstRecipesImg).toBe(favoriteRecipes[0].image);
    const firstRecipesName = screen.getByTestId('0-horizontal-name').textContent;
    expect(firstRecipesName).toBe(favoriteRecipes[0].name);
    const firstInfoRecipe = screen.getByText(/italian - vegetarian/i).textContent;
    const mockInfoRecipe = `${favoriteRecipes[0].nationality} - ${favoriteRecipes[0].category}`;
    expect(firstInfoRecipe).toBe(mockInfoRecipe);
    const firstShareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(firstShareBtn).toBeInTheDocument();
    const firstFavoriteBtn = screen.getByTestId(favoriteBtn);
    expect(firstFavoriteBtn).toBeInTheDocument();
  });

  it('Verifica se page FavoriteRecipes renderiza os cards de drink de receitas favoritas', () => {
    renderWithRouter(
      <SearchBarProvider>
        <FavoriteRecipes />
      </SearchBarProvider>,
    );
    const drinkRecipesImg = screen.getByTestId('1-horizontal-image').getAttribute('src');
    expect(drinkRecipesImg).toBe(favoriteRecipes[1].image);
    const drinkRecipesName = screen.getByTestId('1-horizontal-name').textContent;
    expect(drinkRecipesName).toBe(favoriteRecipes[1].name);
    const drinkInfoRecipe = screen.getByText(/Alcoholic/i).textContent;
    const mockInfoRecipe = favoriteRecipes[1].alcoholicOrNot;
    expect(drinkInfoRecipe).toBe(mockInfoRecipe);
    const drinkShareBtn = screen.getByTestId('1-horizontal-share-btn');
    expect(drinkShareBtn).toBeInTheDocument();
    const drinkFavoriteBtn = screen.getByTestId('1-horizontal-favorite-btn');
    expect(drinkFavoriteBtn).toBeInTheDocument();
  });

  it('Testa se ao clicar no botão de compartilhar, aparece a mensagem Link copied! na tela', async () => {
    const { user } = renderWithRouter(
      <SearchBarProvider>
        <FavoriteRecipes />
      </SearchBarProvider>,
    );
    const firstShareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(firstShareBtn).toBeInTheDocument();
    await user.click(firstShareBtn);
    // espera a mensagem aparecer na tela
    const message = await screen.findByText(/Link copied!/i);
    expect(message).toBeInTheDocument();
    // verifica se a mensagem some da tela
    setTimeout(() => {
      expect(message).not.toBeInTheDocument();
    }, 5000);

    const secondShareBtn = screen.getByTestId('1-horizontal-share-btn');
    expect(secondShareBtn).toBeInTheDocument();
    await user.click(secondShareBtn);
    // espera a mensagem aparecer na tela
    const message2 = await screen.findByText(/Link copied!/i);
    expect(message2).toBeInTheDocument();
    // verifica se a mensagem some da tela
    setTimeout(() => {
      expect(message2).not.toBeInTheDocument();
    }, 5000);
  });

  it('Testa se ao clicar no botão de favoritar do card meal, o card some da tela', async () => {
    const { user } = renderWithRouter(
      <SearchBarProvider>
        <FavoriteRecipes />
      </SearchBarProvider>,
    );
    const mealFavoriteBtn = screen.getByTestId(favoriteBtn);
    expect(mealFavoriteBtn).toBeInTheDocument();
    await user.click(mealFavoriteBtn);
    expect(mealFavoriteBtn).not.toBeInTheDocument();
  });

  it('Testa se ao clicar no botão de favoritar do card drink, o card some da tela', async () => {
    const { user } = renderWithRouter(
      <SearchBarProvider>
        <FavoriteRecipes />
      </SearchBarProvider>,
    );
    const drinkFavoriteBtn = screen.getByTestId('1-horizontal-favorite-btn');
    expect(drinkFavoriteBtn).toBeInTheDocument();
    await user.click(drinkFavoriteBtn);
    expect(drinkFavoriteBtn).not.toBeInTheDocument();
  });

  it('Verifica se ao clicar para remover cada card, a mensagem No favorite recipes have been added! aparece na tela', async () => {
    const { user } = renderWithRouter(
      <SearchBarProvider>
        <FavoriteRecipes />
      </SearchBarProvider>,
    );
    const mealFavoriteBtn = screen.getByTestId(favoriteBtn);
    expect(mealFavoriteBtn).toBeInTheDocument();
    await user.click(mealFavoriteBtn);
    expect(mealFavoriteBtn).not.toBeInTheDocument();
    const drinkFavoriteBtn = screen.getByTestId(favoriteBtn);
    expect(drinkFavoriteBtn).toBeInTheDocument();
    await user.click(drinkFavoriteBtn);
    expect(drinkFavoriteBtn).not.toBeInTheDocument();
    const message = await screen.findByText(/No favorite recipes have been added!/i);
    expect(message).toBeInTheDocument();
  });

  it('Verifica se os filtros funcionam corretamente', async () => {
    const { user } = renderWithRouter(
      <SearchBarProvider>
        <App />
      </SearchBarProvider>,
      { route: '/favorite-recipes' },
    );

    // verifica se renderiza apenas os cards de meal
    const mealFilterBtn = screen.getByTestId('filter-by-meal-btn');
    expect(mealFilterBtn).toBeInTheDocument();
    await user.click(mealFilterBtn);
    const drinkFilterBtn = screen.getByTestId('filter-by-drink-btn');
    expect(drinkFilterBtn).toBeInTheDocument();
    await user.click(drinkFilterBtn);
    // verifica se voltar a renderizar todos os cards
    const allFilterBtn = screen.getByTestId('filter-by-all-btn');
    expect(allFilterBtn).toBeInTheDocument();
    await user.click(allFilterBtn);
  });
});
