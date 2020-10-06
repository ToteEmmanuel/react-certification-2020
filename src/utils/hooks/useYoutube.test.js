import { renderHook, act } from '@testing-library/react-hooks';
import { useYoutube } from './useYoutube';

jest.mock('../../api/youtube.api', () => {
  return {
    __esModule: true,
    default: {
      callYoutube: jest.fn((params) => {
        let mockedResponseArray = [];
        if (params.q) {
          if (params.q === 'Random Search1') {
            if (params.pageToken) {
              mockedResponseArray = [
                { id: { videoId: 'firstVideo', kind: 'youtube#video' } },
                { id: { videoId: 'secondVideo', kind: 'youtube#video' } },
              ];
            } else {
              mockedResponseArray = [
                { id: { videoId: 'firstVideo', kind: 'youtube#video' } },
              ];
            }
          } else if (params.q === 'Random Search2') {
            if (params.pageToken) {
              mockedResponseArray = [
                { id: { videoId: 'thirdVideo', kind: 'youtube#video' } },
                { id: { videoId: 'fourthVideo', kind: 'youtube#video' } },
              ];
            } else {
              mockedResponseArray = [
                { id: { videoId: 'firstVideo', kind: 'youtube#video' } },
                { id: { videoId: 'secondVideo', kind: 'youtube#video' } },
              ];
            }
          } else if (params.q === 'Random Search2,1' && !params.pageToken) {
            mockedResponseArray = [
              { id: { videoId: 'firstVideo', kind: 'youtube#video' } },
              { id: { videoId: 'secondVideo', kind: 'youtube#channel' } },
            ];
          }
        } else if (params.relatedToVideoId && params.type === 'video') {
          mockedResponseArray = [
            { id: { videoId: 'relatedVideo1', kind: 'youtube#video' } },
            { id: { videoId: 'relatedVideo2', kind: 'youtube#video' } },
          ];
        } else if (params.id) {
          mockedResponseArray = params.id.split(',').map((v) => ({
            id: `${v}`,
            kind: 'youtube#video',
          }));
        }

        return Promise.resolve({
          json: () =>
            Promise.resolve({
              nextPageToken: 'RandomToken',
              items: mockedResponseArray,
            }),
        });
      }),
    },
  };
});
beforeEach(() => {
  jest.resetModules();
});
describe('Testing useYoutube getYoutubeSearch', () => {
  it('Empty response before action is taken', () => {
    const { result } = renderHook(() => useYoutube());
    expect(result.current.response).toBeInstanceOf(Array);
    expect(result.current.response.length).toBe(0);
  });
  it('Searching q response before action is taken', async () => {
    const q = 'Random Search1';
    const { result, waitForValueToChange } = renderHook(() => useYoutube());
    act(() => {
      result.current.getYoutubeSearch(q);
    });
    await waitForValueToChange(() => result.current.response.length > 0);
    expect(result.current.response).toBeInstanceOf(Array);
    expect(result.current.response.length).toBe(1);
  });
  it('Searching q response before action is taken (2)', async () => {
    const q = 'Random Search2';
    const { result, waitForValueToChange } = renderHook(() => useYoutube());
    act(() => {
      result.current.getYoutubeSearch(q);
    });
    await waitForValueToChange(() => result.current.response.length > 0);
    expect(result.current.response).toBeInstanceOf(Array);
    expect(result.current.response.length).toBe(2);
  });
  it('Searching q response before action is taken (2 vids,1 channel)', async () => {
    const q = 'Random Search2,1';
    const { result, waitForValueToChange } = renderHook(() => useYoutube());
    act(() => {
      result.current.getYoutubeSearch(q);
    });
    await waitForValueToChange(() => result.current.response.length > 0);
    expect(result.current.response).toBeInstanceOf(Array);
    expect(result.current.response.length).toBe(1);
  });
});

describe('Testing useYoutube getMoreVideos', () => {
  it('Search and getMoreVideos  - all new', async () => {
    const q = 'Random Search2';
    const { result, waitForValueToChange, waitForNextUpdate } = renderHook(() =>
      useYoutube()
    );
    act(() => {
      result.current.getYoutubeSearch(q);
    });
    await waitForValueToChange(() => result.current.response.length > 0);
    expect(result.current.response).toBeInstanceOf(Array);
    expect(result.current.response.length).toBe(2);
    act(() => {
      result.current.getMoreVideos('token');
    });
    await waitForNextUpdate();
    expect(result.current.response).toBeInstanceOf(Array);
    expect(result.current.response.length).toBe(4);
  });
  it('Search and getMoreVideos  - repeated', async () => {
    const q = 'Random Search1';
    const { result, waitForValueToChange, waitForNextUpdate } = renderHook(() =>
      useYoutube()
    );
    act(() => {
      result.current.getYoutubeSearch(q);
    });
    await waitForValueToChange(() => result.current.response.length > 0);
    expect(result.current.response).toBeInstanceOf(Array);
    expect(result.current.response.length).toBe(1);
    act(() => {
      result.current.getMoreVideos('token');
    });
    await waitForNextUpdate();
    expect(result.current.response).toBeInstanceOf(Array);
    expect(result.current.response.length).toBe(2);
  });
});

describe('Testing useYoutube getRelatedVideos', () => {
  it('getRelatedVideos  - repeated', async () => {
    const id = 'videoId';
    const { result, waitForValueToChange } = renderHook(() => useYoutube());
    act(() => {
      result.current.getRelatedVideos(id);
    });
    await waitForValueToChange(() => result.current.response.length > 0);
    expect(result.current.response).toBeInstanceOf(Array);
    expect(result.current.response.length).toBe(2);
  });
});

describe('Testing useYoutube getVideosById', () => {
  it('Search and getVideosById - 2', async () => {
    const { result, waitForValueToChange } = renderHook(() => useYoutube());
    act(() => {
      result.current.getVideosById('id1', 'id2');
    });
    await waitForValueToChange(() => result.current.response.length > 0);
    expect(result.current.response).toBeInstanceOf(Array);
    expect(result.current.response.length).toBe(2);
  });
  it('Search and getVideosById - 1', async () => {
    const { result, waitForValueToChange } = renderHook(() => useYoutube());
    act(() => {
      result.current.getVideosById('id1');
    });
    await waitForValueToChange(() => result.current.response.length > 0);
    expect(result.current.response).toBeInstanceOf(Array);
    expect(result.current.response.length).toBe(1);
  });
});
