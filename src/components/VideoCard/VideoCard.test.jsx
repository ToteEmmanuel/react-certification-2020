import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import VideoCard from './VideoCard.component';
import { useAuth } from '../../providers/Auth';

jest.mock('../../providers/Auth', () => ({
  useAuth: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('VideoCard Test', () => {
  it('loggedUser VideoCard', () => {
    useAuth.mockReturnValue({
      authenticated: false,
      loggedUser: { username: '', favorites: [] },
      login: jest.fn(),
    });
    const videoIMG = 'https://picsum.photos/200/300';
    const videoTitle = 'Sample Title';
    const videoId = 'SampleId';

    render(
      <MemoryRouter>
        <VideoCard videoIMG={videoIMG} videoTitle={videoTitle} videoId={videoId} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('cardContent')).toHaveTextContent(videoTitle);
    expect(screen.getByTestId('cardContentImg')).toHaveAttribute('src', videoIMG);
    expect(screen.getByTestId('cardContentImg')).toHaveAttribute('alt', videoTitle);
    expect(screen.getByTestId('cardContentLnk')).toHaveAttribute(
      'href',
      `/video/${videoId}`
    );
  });
  it('Not loggedUser VideoCard', () => {
    useAuth.mockReturnValue({
      authenticated: false,
      loggedUser: { username: '', favorites: [] },
      login: jest.fn(),
    });
    const videoIMG = 'https://picsum.photos/200/300';
    const videoTitle = 'Sample Title';
    const videoId = 'SampleId';

    render(
      <MemoryRouter>
        <VideoCard videoIMG={videoIMG} videoTitle={videoTitle} videoId={videoId} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('cardContent')).toHaveTextContent(videoTitle);
    expect(screen.getByTestId('cardContentImg')).toHaveAttribute('src', videoIMG);
    expect(screen.getByTestId('cardContentImg')).toHaveAttribute('alt', videoTitle);
    expect(screen.getByTestId('cardContentLnk')).toHaveAttribute(
      'href',
      `/video/${videoId}`
    );
    expect(screen.getByTestId('cardContentFavBtn')).toHaveTextContent('Add 2 Favs');
  });
});
