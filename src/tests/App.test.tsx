import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from '../utils/helpers';
import Login from '../pages/Login';
import DoneRecipes from '../pages/DoneRecipes';
import Drinks from '../pages/Drinks';
import DrinkRecipe from '../pages/DrinkRecipe';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import MealRecipe from '../pages/MealRecipe';
import Meals from '../pages/Meals';
import Profile from '../pages/Profile';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import SearchBar from '../components/SearchBar/SearchBar';

it('Renderiza página inicial', () => {
  renderWithRouter(<App />);
  const linkElement = screen.getByText(/você está na tela de login/i);
  expect(linkElement).toBeInTheDocument();
});

it('Renderiza page Login', async () => {
  renderWithRouter(<Login />);

  const inputEmail = screen.getByTestId('email-input');
  expect(inputEmail).toBeInTheDocument();

  const inputPassword = screen.getByTestId('password-input');
  expect(inputPassword).toBeInTheDocument();

  const buttonEnter = screen.getByTestId('login-submit-btn') as HTMLButtonElement;
  expect(buttonEnter).toBeInTheDocument();

  expect(buttonEnter.disabled).toBe(true);

  await userEvent.type(inputEmail, 'grupo6@trybe.com');
  await userEvent.type(inputPassword, '1234567');
  expect(buttonEnter.disabled).toBe(false);
});

it('Renderiza page DoneRecipes', () => {
  renderWithRouter(<DoneRecipes />);
});

it('Renderiza page Drinks', () => {
  renderWithRouter(<Drinks />);
});

it('Renderiza page DrinkRecipe', () => {
  renderWithRouter(<DrinkRecipe />);
});

it('Renderiza page FavoriteRecipes', () => {
  renderWithRouter(<FavoriteRecipes />);
});

it('Renderiza page MealRecipe', () => {
  renderWithRouter(<MealRecipe />);
});

it('Renderiza page Meals', () => {
  renderWithRouter(<Meals />);
});

it('Renderiza page Profile', () => {
  renderWithRouter(<Profile />);
});

it('Renderiza  Header', () => {
  renderWithRouter(<Header />);
});

it('Renderiza Footer', () => {
  renderWithRouter(<Footer />);
});

it('Renderiza Footer', () => {
  renderWithRouter(<SearchBar />);
});
