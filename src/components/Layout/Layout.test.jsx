import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import AuthProvider from '../../providers/Auth';
import Layout from './Layout.component';

describe('Layout test', () => {
  it('Check correct layout positioning', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Layout>
            <p>hola</p>
          </Layout>
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getByTestId('content')).toHaveTextContent('hola');
  });
});
