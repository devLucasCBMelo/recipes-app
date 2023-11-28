// import { screen } from '@testing-library/react';
import { renderWithRouter } from '../utils/renderWithRouter';
import Profile from '../pages/Profile';

describe('Testes Profilee', () => {
  it('Renderiza page Profile', () => {
    renderWithRouter(<Profile />);
  });
});
