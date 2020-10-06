import React from 'react';
import styled from 'styled-components';
import Header from '../Header';

const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2em 1fr;
  grid-template-areas:
    'header'
    'content';
`;

const HeaderArea = styled(Header)`
  grid-area: header;
  top: 0;
`;

const Content = styled.main`
  grid-area: content;
  overflow: scroll;
`;

function Layout({ children }) {
  return (
    <StyledDiv>
      <HeaderArea />
      <Content data-testid="content">{children}</Content>
    </StyledDiv>
  );
}

export default Layout;
