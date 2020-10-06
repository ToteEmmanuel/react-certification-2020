import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/Auth';
import { useYoutube } from '../../utils/hooks/useYoutube';
import VideoCardContainer from '../../components/VideoCardContainer/VideoCardContainer.component';

const FavVideos = styled.div`
  display: grid;
  margin: 1em;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(120px, max-content));
  justify-content: left;
`;

const FavoritesPage = () => {
  const { authenticated, loggedUser } = useAuth();
  const { response: videos, getVideosById } = useYoutube();
  useEffect(() => {
    document.title = 'Challenge - Favorites';
  }, []);

  useEffect(() => {
    if (!videos.length && 'favorites' in loggedUser) {
      getVideosById(...loggedUser.favorites);
    }
  }, [videos, loggedUser, loggedUser.favorites, getVideosById]);
  return (
    <>
      {authenticated ? (
        <FavVideos>
          <VideoCardContainer videos={videos} />
        </FavVideos>
      ) : (
        <Link to="/login">No logged in user.</Link>
      )}
    </>
  );
};

export default FavoritesPage;
