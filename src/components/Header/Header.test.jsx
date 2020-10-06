import React from 'react';
import { fireEvent, act, render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Header from '.';
import { useAuth } from '../../providers/Auth';

jest.mock('../../providers/Auth', () => ({
  useAuth: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Test Header', () => {
  it('Test Header title link', async () => {
    useAuth.mockReturnValue({
      authenticated: false,
    });
    let hist;
    let loc;
    render(
      <MemoryRouter initialEntries={['/random']}>
        <Header />
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
    act(() => {
      fireEvent.click(screen.getByText('Challenge'));
    });
    expect(loc.pathname).toBe('/');
    expect(hist.length).toBe(2);
  });
  it('Test Header Home link', async () => {
    useAuth.mockReturnValue({
      authenticated: false,
    });
    let hist;
    let loc;
    render(
      <MemoryRouter initialEntries={['/random']}>
        <Header />
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
    act(() => {
      fireEvent.click(screen.getByText('Home'));
    });
    expect(loc.pathname).toBe('/');
    expect(hist.length).toBe(2);
  });
  it('Test Header login link', async () => {
    useAuth.mockReturnValue({
      authenticated: false,
    });
    let hist;
    let loc;
    render(
      <MemoryRouter initialEntries={['/random']}>
        <Header />
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
    act(() => {
      fireEvent.click(screen.getByText('Login'));
    });
    expect(loc.pathname).toBe('/login');
    expect(hist.length).toBe(2);
  });
  it('Test Header logout link', async () => {
    const logoutFn = jest.fn();
    useAuth.mockReturnValue({
      authenticated: true,
      loggedUser: { username: 'Clinton', favorites: [] },
      logout: logoutFn,
    });
    let hist;
    let loc;
    render(
      <MemoryRouter initialEntries={['/random']}>
        <Header />
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
    act(() => {
      fireEvent.click(screen.getByText('(Clinton) Logout'));
    });
    expect(loc.pathname).toBe('/');
    expect(hist.length).toBe(2);
    expect(logoutFn).toHaveBeenCalled();
  });
});
