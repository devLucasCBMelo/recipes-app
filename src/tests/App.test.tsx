import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from '../utils/helpers';

it('Renderiza página inicial', () => {
  renderWithRouter(<App />);
  const linkElement = screen.getByText(/você está na tela de login/i);
  expect(linkElement).toBeInTheDocument();
});
