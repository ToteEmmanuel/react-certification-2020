import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AuthProvider from '../../providers/Auth';
import * as useYoutubeHook from '../../utils/hooks/useYoutube';
import HomePage from './Home.page';

describe('Home page Test', () => {
  it('Home no search performed', () => {
    jest.spyOn(useYoutubeHook, 'useYoutube').mockImplementation(() => ({
      response: [],
    }));
    render(
      <AuthProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getAllByTestId('HiEmojiSpan').length).toBe(1);
  });
  it('Home 1 value is being shown', () => {
    jest.spyOn(useYoutubeHook, 'useYoutube').mockImplementation(() => ({
      response: [
        {
          id: { videoId: 'SampleId' },
          snippet: {
            title: 'Sample Title',
            thumbnails: { default: { url: 'https://picsum.photos/200/300' } },
          },
        },
      ],
    }));
    render(
      <AuthProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getAllByTestId('cardContent').length).toBe(1);
  });
});
