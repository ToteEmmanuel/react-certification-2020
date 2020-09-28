import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../providers/Auth';

const Container = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  width: 120px;
  margin: 0.5em;
  text-align: center;
  background-color: #fdf6e3;
  a {
    color: inherit;
    text-decoration: none;
  }
  &:hover {
    color: #cb4b16;
  }
  p {
    padding: 0em 0.3em;
  }
`;

const VideoCard = ({ videoIMG, videoId, videoTitle }) => {
  const { addFavorite, loggedUser } = useAuth();

  const goToVideo = () => {
    console.log(`I'm going to the video (${videoId})`);
  };

  return (
    <Container onClick={goToVideo} key={videoId}>
      <Link to={`/video/${videoId}`}>
        <img src={videoIMG} alt={videoTitle} />
        <p>{videoTitle}</p>
      </Link>
      <button type="button" onClick={() => addFavorite(videoId, loggedUser)}>
        Favorite
      </button>
    </Container>
  );
};

export default VideoCard;
