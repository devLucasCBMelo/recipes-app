import { useEffect, useState } from 'react';

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

  return (
    <div>
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
      >
        Enter

      </button>
    </div>
  );
}

export default Login;
