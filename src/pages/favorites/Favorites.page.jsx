import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import VideoCard from '../../components/VideoCard';
import { useAuth } from '../../providers/Auth';
import { useYoutube } from '../../utils/hooks/useYoutube';

const FavVideos = styled.div`
  display: grid;
  margin: 1em;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-template-rows: repeat(fill-content, 200px);
`;

const FavoritesPage = () => {
  const { authenticated, loggedUser } = useAuth();
  const { response: videos, getVideosById } = useYoutube();
  const [tubeResult, setTubeResult] = useState('');

  useEffect(() => {
    if (videos.length) {
      const videoCards = videos.map((v) => {
        console.log(v.id.videoId);
        return (
          <VideoCard
            key={v.id}
            videoId={v.id}
            videoTitle={v.snippet.title}
            videoIMG={v.snippet.thumbnails.default.url}
          />
        );
      });
      setTubeResult(videoCards);
    } else if ('favorites' in loggedUser) {
      getVideosById(...loggedUser.favorites);
    }
  }, [videos, loggedUser, loggedUser.favorites, getVideosById]);
  return (
    <>
      {authenticated ? (
        <FavVideos>{tubeResult}</FavVideos>
      ) : (
        <Link to="/login">No logged in user.</Link>
      )}
    </>
  );
};

export default FavoritesPage;
