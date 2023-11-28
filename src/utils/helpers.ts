import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

export const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, '', route);
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

// a função putLocalStorage é responsável por adicionar um item ao localStorage
// ela deverá receber chave e valor como parâmetros
// a chave pode ser favoriteRecipes ou doneRecipes
// o valor deve ser um objeto contendo as informações da receita

// cada objeto deverá conter, caso favoriteRecipes:
// id: id da receita
// type: comida ou bebida
// nationality: se for comida, a nacionalidade, se for bebida, vazio
// category: categoria da receita
// alcoholicOrNot: se for comida, vazio, se for bebida, alcoholic ou non-alcoholic
// name: nome da receita
// image: imagem da receita

// caso doneRecipes:
// id: id da receita
// type: comida ou bebida
// nationality: se for comida, a nacionalidade, se for bebida, vazio
// category: categoria da receita
// alcoholicOrNot: se for comida, vazio, se for bebida, alcoholic ou non-alcoholic
// name: nome da receita
// image: imagem da receita
// doneDate: data de conclusão
// tags: array tags da receita, caso não tenha, array vazio

export type RecipeType = {
  id: string;
  type: string;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  doneDate?: string;
  tags?: string[];
};
type KeyLocalStorageType = 'favoriteRecipes' | 'doneRecipes';

// OBS: deve-se transformar o objeto no tipo RecipeType antes de chamar a função putLocalStorage.

export const putLocalStorage = (key: KeyLocalStorageType, value: RecipeType) => {
  if (key === 'favoriteRecipes') {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, value]));
  } else {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, value]));
  }
};

// a função getLocalStorage é responsável por buscar todos os itens salvos no localStorage;
// ela deverá retornar um objeto com as seguintes chaves:
// favoriteRecipes: array de objetos com as receitas favoritas
// doneRecipes: array de objetos com as receitas feitas

export const getLocalStorage = () => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
  return { favoriteRecipes, doneRecipes };
};

// a função deleteLocalStorage é responsável por deletar um item do localStorage;
// ela deverá receber chave e id como parâmetros
// a chave pode ser favoriteRecipes ou doneRecipes
// o id é o id da receita

export const deleteLocalStorage = (key: KeyLocalStorageType, id: string) => {
  if (key === 'favoriteRecipes') {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const newFavoriteRecipes = favoriteRecipes
      .filter((recipe: RecipeType) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  } else {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const newDoneRecipes = doneRecipes.filter((recipe: RecipeType) => recipe.id !== id);
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
  }
};
