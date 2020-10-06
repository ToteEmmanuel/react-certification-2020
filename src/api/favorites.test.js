import favoritesApi from './favorites.api';

describe('Favorites API Tests', () => {
  it('Retrieves a list of favorites for an existing user', async () => {
    const mockedUser = 'Jorge';
    const result = await favoritesApi.getFavorites(mockedUser);
    expect(result).toBeInstanceOf(Object);
    expect(result.favorites).toBeInstanceOf(Array);
    expect(result.favorites.length).toBeGreaterThan(0);
  });
  it('Retrieves a list of favorites for a non existing user', async () => {
    const mockedUser = 'X Æ A-12';
    const result = await favoritesApi.getFavorites(mockedUser);
    expect(result).toBeInstanceOf(Object);
    expect(result.favorites).toBeInstanceOf(Array);
    expect(result.favorites.length).toBe(0);
  });
});
