import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useYoutube } from '../../utils/hooks/useYoutube';
import VideoCardContainer from '../../components/VideoCardContainer/VideoCardContainer.component';

const VideoPageLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 2em;
  iframe {
    align-self: center;
    justify-self: center;
  }
`;
const RelatedVidsDiv = styled.div`
  display: grid;
  margin: 1em;
  overflow: scroll;
  max-height: 500px;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
`;
const Title = styled.h2`
  color: #b8860b;
`;
const Description = styled.div`
  color: black;
  height: 6em;
  overflow: scroll;
`;
const VideoPage = () => {
  const { videoId } = useParams();
  const { response: videos, getRelatedVideos } = useYoutube();
  const { response: mainVideo, getVideosById } = useYoutube();
  const [currentVideo, setCurrentVideo] = useState('');

  useEffect(() => {
    setCurrentVideo((cv) => {
      if (videoId !== cv) {
        getRelatedVideos(videoId);
        return videoId;
      }
    });
  }, [videoId, setCurrentVideo, getRelatedVideos]);

  useEffect(() => {
    document.title = `Challenge - ${currentVideo}`;
    getVideosById(currentVideo);
  }, [currentVideo, getVideosById]);

  return (
    <>
      <Title data-testid="title">
        {mainVideo.length ? mainVideo[0].snippet.title.toString() : ''}
      </Title>
      <VideoPageLayout>
        <iframe
          type="text/html"
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`}
          frameBorder="0"
          title="youtube video"
          data-testid="embbededVideo"
        />
      </VideoPageLayout>
      <Description data-testid="description">
        <p> {mainVideo.length ? mainVideo[0].snippet.description.toString() : ''}</p>
      </Description>

      <RelatedVidsDiv>
        <VideoCardContainer videos={videos} />
      </RelatedVidsDiv>
    </>
  );
};

export default VideoPage;
