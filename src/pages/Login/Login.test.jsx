import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { useAuth } from '../../providers/Auth';
import LoginPage from './Login.page';

jest.mock('../../providers/Auth', () => ({
  useAuth: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Login page Test', () => {
  it('title is ok', () => {
    useAuth.mockReturnValue({
      authenticated: false,
      loggedUser: { username: '', favorites: [] },
      login: jest.fn(),
    });
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    expect(document.title).toBe('Challenge - Login');
  });
  it('User is logged in', () => {
    let hist;
    let loc;
    useAuth.mockReturnValue({
      authenticated: true,
      loggedUser: { username: '', favorites: [] },
      login: jest.fn(),
    });
    render(
      <MemoryRouter initialEntries={['/random']}>
        <LoginPage />
        <Route
          path="*"
          render={({ history, location }) => {
            hist = history;
            loc = location;
            return null;
          }}
        />
      </MemoryRouter>
    );

    expect(loc.pathname).toBe('/');
    expect(hist.length).toBe(2);
  });
  it('Firing Event', () => {
    const loginFn = jest.fn();
    useAuth.mockReturnValue({
      authenticated: false,
      loggedUser: { username: '', favorites: [] },
      login: loginFn,
    });
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    fireEvent.submit(screen.getByTestId('submitForm'), {
      target: { username: { value: 'user' }, password: { value: 'pass' } },
    });
    expect(document.title).toBe('Challenge - Login');
    expect(loginFn).toHaveBeenCalledWith('user', 'pass');
  });
});
