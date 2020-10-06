const mockedFavorites = [
  { username: 'Jorge', favorites: ['0L7kadUIUPc', 'RqzGzwTY-6w'] },
  { username: 'John', favorites: ['p2m98-f-jTE', 'nMfPqeZjc2c'] },
];

const getFavorites = (username) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const [favs] = mockedFavorites.filter((f) => f.username === username);
      if (favs && 'favorites' in favs) {
        return resolve(favs);
      }
      return resolve({ username, favorites: [] });
    }, 500);
  });
};

export default { getFavorites };
