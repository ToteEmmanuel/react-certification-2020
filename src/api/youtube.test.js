import youtubeAPI from './youtube.api';

const BASE_URL = 'http://baseurl.xyz/';

beforeAll(() => {
  process.env.REACT_APP_YOUTUBE_URL = BASE_URL;
  const mockedFetchResponse = Promise.resolve({
    pageToken: 'pToken',
    items: {},
  });
  jest.spyOn(global, 'fetch').mockImplementation(() => mockedFetchResponse);
});
beforeEach(() => {
  global.fetch.mockClear();
});
afterAll(() => {
  global.fetch.mockClear();
});

describe('Youtube API Tests', () => {
  it('Performs a search with the q parameter', async () => {
    const expectedURL = new URL(`${BASE_URL}search`);
    const mockedParams = { q: 'HELLO' };
    expectedURL.search = new URLSearchParams(mockedParams).toString();
    const result = await youtubeAPI.callYoutube(mockedParams);
    expect(result).toBeInstanceOf(Object);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(expectedURL);
  });
  it('Performs a search with the relateToVideoId parameter', async () => {
    const expectedURL = new URL(`${BASE_URL}search`);
    const mockedParams = { relatedToVideoId: 'randomId' };
    expectedURL.search = new URLSearchParams(mockedParams).toString();
    const result = await youtubeAPI.callYoutube(mockedParams);
    expect(result).toBeInstanceOf(Object);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(expectedURL);
  });
  it('Performs a search with the id parameter', async () => {
    const mockedFetchResponse = Promise.resolve({
      id: 'id',
      items: {},
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockedFetchResponse);
    const expectedURL = new URL(`${BASE_URL}videos`);
    const mockedParams = { id: 'randomId' };
    expectedURL.search = new URLSearchParams(mockedParams).toString();
    const result = await youtubeAPI.callYoutube(mockedParams);
    expect(result).toBeInstanceOf(Object);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(expectedURL);
  });
  it('Performs a search without a required parameter', async () => {
    const mockedParams = { randomParameter: 'randomText' };
    const result = await youtubeAPI.callYoutube(mockedParams);
    expect(result).toBeInstanceOf(Object);
    expect(result).toEqual({});
    expect(global.fetch).toHaveBeenCalledTimes(0);
  });
});
