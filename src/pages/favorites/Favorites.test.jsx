import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { useAuth } from '../../providers/Auth';
import * as useYoutubeHook from '../../utils/hooks/useYoutube';
import FavoritesPage from './Favorites.page';

jest.mock('../../providers/Auth', () => ({
  useAuth: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Favorites page Test', () => {
  it('Favorites not logged in', () => {
    useAuth.mockReturnValue({
      authenticated: false,
      loggedUser: { username: '', favorites: [] },
    });
    jest.spyOn(useYoutubeHook, 'useYoutube').mockImplementation(() => ({
      response: [],
      getVideosById: jest.fn(),
    }));
    render(
      <MemoryRouter initialEntries={['/favs']}>
        <FavoritesPage />
      </MemoryRouter>
    );
    expect(screen.getAllByText('No logged in user.')).toBeDefined();
  });
  it('Favorites logged in', () => {
    useAuth.mockReturnValue({
      authenticated: true,
      loggedUser: { username: 'Jorge', favorites: ['0L7kadUIUPc', 'RqzGzwTY-6w'] },
    });
    jest.spyOn(useYoutubeHook, 'useYoutube').mockImplementation(() => ({
      response: [
        {
          id: { videoId: 'SampleId' },
          snippet: {
            title: 'Sample Title',
            description: 'descriptive',
            thumbnails: { default: { url: 'https://picsum.photos/200/300' } },
          },
        },
      ],
      getVideosById: jest.fn(),
    }));
    render(
      <MemoryRouter initialEntries={['/favs']}>
        <FavoritesPage />
      </MemoryRouter>
    );
    expect(screen.getAllByTestId('cardContent').length).toBe(1);
  });
});
