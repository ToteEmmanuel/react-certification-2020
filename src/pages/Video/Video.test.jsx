import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AuthProvider from '../../providers/Auth';
import * as useYoutubeHook from '../../utils/hooks/useYoutube';
import VideoPage from './Video.page';

describe('Video page Test', () => {
  it('Video test', () => {
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
      getRelatedVideos: jest.fn(),
    }));
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/video/SampleId']}>
          <VideoPage />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getAllByTestId('cardContent').length).toBe(1);
    expect(screen.getByTestId('title')).toHaveTextContent('Sample Title');
    expect(screen.getByTestId('description')).toHaveTextContent('descriptive');
  });
});
