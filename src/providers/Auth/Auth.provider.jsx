import React, { useCallback, useEffect, useContext, useState } from 'react';
import favoritesApi from '../../api/favorites.api';
import loginApi from '../../api/Login.api';
import { AUTH_STORAGE_KEY, AUTH_LOGGED_IN_USER } from '../../utils/constants';
import { storage } from '../../utils/storage';

const AuthContext = React.createContext(null);

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`Can't use "useAuth" without an AuthProvider.`);
  }
  return context;
}

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  useEffect(() => {
    const lastAuthState = storage.get(AUTH_STORAGE_KEY);
    const lastloggedUser = storage.get(AUTH_LOGGED_IN_USER);
    const isAuthenticated = Boolean(lastAuthState);
    setLoggedUser(JSON.parse(lastloggedUser) || {});
    setAuthenticated(isAuthenticated);
  }, []);
  const login = useCallback((username, pass) => {
    const auth = loginApi(username, pass);
    auth.then((v) => {
      console.log(`Authentication ${v}`);
      let user = {};
      if (v) {
        user = { username };
        const favs = favoritesApi.getFavorites(username);
        favs.then((response) => {
          user.favorites = response.favorites;
          setLoggedUser(user);
          setAuthenticated(true);
          storage.set(AUTH_STORAGE_KEY, v);
          storage.set(AUTH_LOGGED_IN_USER, JSON.stringify(user));
        });
      } else {
        setAuthenticated(false);
      }
      storage.set(AUTH_STORAGE_KEY, v);
      storage.set(AUTH_LOGGED_IN_USER, JSON.stringify(user));
    });
  }, []);

  const logout = useCallback(() => {
    setAuthenticated(false);
    setLoggedUser({});
    storage.set(AUTH_STORAGE_KEY, false);
    storage.set(AUTH_LOGGED_IN_USER, '{}');
  }, []);

  const addFavorite = useCallback((videoId, user) => {
    if ('favorites' in user && user.favorites.indexOf(videoId) === -1) {
      user.favorites.push(videoId);
      setLoggedUser(user);
      storage.set(AUTH_LOGGED_IN_USER, JSON.stringify(user));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, addFavorite, authenticated, loggedUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export { useAuth };
export default AuthProvider;
