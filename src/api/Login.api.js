const mockedUsers = [
  { name: 'Jorge', pass: 'wize' },
  { name: 'John', pass: 'line' },
];

export default async function loginApi(user, pass) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const [loggedUser] = mockedUsers.filter((u) => u.name === user && u.pass === pass);
      if (loggedUser) {
        return resolve(true);
      }
      return resolve(false);
    }, 500);
  });
}
