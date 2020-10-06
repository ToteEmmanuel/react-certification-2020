import LoginApi from './Login.api';

describe('Login API Tests', () => {
  it('Returns true if the user/pass value are valid values', async () => {
    const mockedUser = 'Jorge';
    const mockedPass = 'wize';
    const result = await LoginApi(mockedUser, mockedPass);
    expect(result).toBe(true);
  });
  it('Returns false if the user/pass value are invalid values', async () => {
    const mockedUser = 'X Æ A-12';
    const mockedPass = 'tesla';
    const result = await LoginApi(mockedUser, mockedPass);
    expect(result).toBe(false);
  });
  it("Returns false if the user value is valid value, but pass isn't", async () => {
    const mockedUser = 'Jorge';
    const mockedPass = 'tesla';
    const result = await LoginApi(mockedUser, mockedPass);
    expect(result).toBe(false);
  });
});
