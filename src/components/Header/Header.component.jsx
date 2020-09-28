import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../providers/Auth';

const Content = styled.nav`
  background-color: #fdf6e3;
  color: #839496;
  p {
    font-size: 2em;
    margin: 0px auto 0px 0.5em;
  }
`;

const NaviBar = styled.div`
  display: grid;
  grid-template-columns: 10em 1fr auto;
  background-color: inherit;
  align-content: center;
  margin: 0px 0px;
  padding: 0em 1em;
  a {
    text-decoration: none;
  }
`;

const Actions = styled.div`
  display: grid;
  justify-content: right;
  align-content: center;
  grid-gap: 1.5em;
  grid-auto-flow: column;
  a {
    text-transform: uppercase;
  }
`;

const Header = () => {
  const { authenticated, logout, loggedUser } = useAuth();
  const history = useHistory();
  const logoutAction = (event) => {
    event.preventDefault();
    logout();
    history.push('/');
  };

  return (
    <Content>
      <NaviBar>
        <Link to="/" className="title">
          Challenge
        </Link>
        <Actions>
          <Link to="/">Home</Link>
          {authenticated ? (
            <>
              <Link to="/favs">Favorites</Link>
              <Link onClick={logoutAction} to="/">
                ({loggedUser.username}) Logout
              </Link>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </Actions>
      </NaviBar>
    </Content>
  );
};

export default Header;
