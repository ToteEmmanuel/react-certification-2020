import React from 'react';
import { fireEvent, act, render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import AuthProvider from '../../providers/Auth';
import NotFoundPage from './NotFound.page';

describe('Test 404 Page', () => {
  it('Test Home link', async () => {
    let hist;
    let loc;
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/random']}>
          <NotFoundPage />
          <Route
            path="*"
            render={({ history, location }) => {
              hist = history;
              loc = location;
              return null;
            }}
          />
        </MemoryRouter>
      </AuthProvider>
    );
    act(() => {
      fireEvent.click(screen.getByText('home'));
    });
    expect(loc.pathname).toBe('/');
    expect(hist.length).toBe(2);
  });
});
