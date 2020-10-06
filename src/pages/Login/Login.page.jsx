import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import { useAuth } from '../../providers/Auth';

function LoginPage() {
  const { login, authenticated } = useAuth();
  const history = useHistory();
  function authenticate(event) {
    event.preventDefault();
    login(event.target.username.value, event.target.password.value);
  }
  useEffect(() => {
    document.title = 'Challenge - Login';
  }, []);

  useEffect(() => {
    if (authenticated) {
      history.push('/');
    }
  });

  return (
    <section className="login">
      <h1>Welcome back!</h1>
      <form onSubmit={authenticate} className="login-form" data-testid="submitForm">
        <div className="form-group">
          <label htmlFor="username">
            <strong>username </strong>
            <input required type="text" id="username" />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <strong>password </strong>
            <input required type="password" id="password" />
          </label>
        </div>
        <button type="submit" data-testid="submitButton">
          login
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
