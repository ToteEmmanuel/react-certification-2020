import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalStyle from '../GlobalStyle';
import HomePage from '../../pages/Home';
import NotFound from '../../pages/NotFound';
import Layout from '../Layout';
import VideoPage from '../../pages/Video';
import LoginPage from '../../pages/Login';
import FavoritesPage from '../../pages/favorites/Favorites.page';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/favs">
            <FavoritesPage />
          </Route>
          <Route path="/video/:videoId">
            <VideoPage />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
