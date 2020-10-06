import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import AuthProvider from '../../providers/Auth';
import VideoCardContainer from './VideoCardContainer.component';

describe('VideoCard Test', () => {
  it('loggedUser VideoCard Search', () => {
    const videos = [
      {
        id: { videoId: 'SampleId' },
        snippet: {
          title: 'Sample Title',
          thumbnails: { default: { url: 'https://picsum.photos/200/300' } },
        },
      },
    ];

    render(
      <AuthProvider>
        <MemoryRouter>
          <VideoCardContainer videos={videos} />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getByTestId('cardContent')).toHaveTextContent(videos[0].snippet.title);
  });
  it('loggedUser VideoCard id - (multiple)', () => {
    const videos = [
      {
        id: 'SampleId',
        snippet: {
          title: 'Sample Title',
          thumbnails: { default: { url: 'https://picsum.photos/200/300' } },
        },
      },
      {
        id: 'SampleId2',
        snippet: {
          title: 'Sample Title2',
          thumbnails: { default: { url: 'https://picsum.photos/200/300' } },
        },
      },
    ];

    render(
      <AuthProvider>
        <MemoryRouter>
          <VideoCardContainer videos={videos} />
        </MemoryRouter>
      </AuthProvider>
    );
    expect(screen.getAllByTestId('cardContent').length).toBe(2);
  });
});
