import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [checkValues, setCheckValues] = useState(true);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);
  const isPasswordValid = userPassword.length > 6;

  useEffect(() => {
    if (isEmailValid && isPasswordValid) {
      setCheckValues(false);
    } else {
      setCheckValues(true);
    }
  }, [isEmailValid, isPasswordValid]);

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/meals');

    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
  };

  return (
    <div>
      <form onSubmit={ (event) => handleSubmit(event) }>
        <h1>Você está na tela de Login</h1>
        <input
          type="email"
          data-testid="email-input"
          value={ userEmail }
          onChange={ (event) => setUserEmail(event.target.value) }
        />
        <input
          type="password"
          data-testid="password-input"
          value={ userPassword }
          onChange={ (event) => setUserPassword(event.target.value) }
        />
        <button
          data-testid="login-submit-btn"
          disabled={ checkValues }
          type="submit"
        >
          Enter

        </button>
      </form>
    </div>
  );
}

export default Login;
