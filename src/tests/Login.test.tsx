import { screen } from '@testing-library/react';
import { renderWithRouter } from '../utils/renderWithRouter';
import Login from '../pages/Login';

describe('Testes Login', () => {
  it('Renderiza page Login', async () => {
    const { user } = renderWithRouter(<Login />);

    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();

    const buttonEnter = screen.getByTestId('login-submit-btn') as HTMLButtonElement;
    expect(buttonEnter).toBeInTheDocument();

    expect(buttonEnter.disabled).toBe(true);

    await user.type(inputEmail, 'grupo6@trybe.com');
    await user.type(inputPassword, '1234567');
    expect(buttonEnter.disabled).toBe(false);

    await user.click(buttonEnter);

    const storedUserInfo = localStorage.getItem('user');
    const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
    expect(parsedUserInfo).toEqual({ email: 'grupo6@trybe.com' });
  });
});
