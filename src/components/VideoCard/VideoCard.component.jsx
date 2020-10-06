import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../providers/Auth';

const Container = styled.div`
  display: grid;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  width: 120px;
  margin: 0.5em;
  text-align: center;
  background-color: #fdf6e3;
  grid-auto-rows: 1fr 2em;
  a {
    color: inherit;
    text-decoration: none;
  }
  &:hover {
    color: #cb4b16;
  }
  p {
    padding: 0em 0.3em;
    word-break: break-all;
  }
  button {
    background-color: white;
    color: black;
    font-weight: bolder;
  }
  button:hover {
    color: inherit;
  }
`;

const VideoCard = ({ videoIMG, videoId, videoTitle }) => {
  const { addFavorite, loggedUser } = useAuth();

  return (
    <Container key={videoId} data-testid="cardContent">
      <Link to={`/video/${videoId}`} data-testid="cardContentLnk">
        <img src={videoIMG} alt={videoTitle} data-testid="cardContentImg" />
        <p>{videoTitle}</p>
      </Link>
      {loggedUser && Object.keys(loggedUser).length > 0 ? (
        <button
          type="button"
          onClick={() => addFavorite(videoId, loggedUser)}
          data-testid="cardContentFavBtn"
        >
          Add 2 Favs
        </button>
      ) : (
        ''
      )}
    </Container>
  );
};

export default VideoCard;
