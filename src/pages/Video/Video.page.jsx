import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useYoutube } from '../../utils/hooks/useYoutube';
import VideoCard from '../../components/VideoCard';

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
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-template-rows: repeat(fit-content, 200px);
`;
const VideoPage = () => {
  const { videoId } = useParams();
  const [tubeResult, setTubeResult] = useState('');
  const { response: videos, getRelatedVideos } = useYoutube();

  useEffect(() => {
    if (videos.length) {
      const videoCards = videos.map((v) => {
        console.log(v.id.videoId);
        return (
          <VideoCard
            key={v.id.videoId}
            videoId={v.id.videoId}
            videoTitle={v.snippet.title}
            videoIMG={v.snippet.thumbnails.default.url}
          />
        );
      });
      setTubeResult(videoCards);
    } else {
      getRelatedVideos(videoId);
    }
  }, [videos]);

  return (
    <>
      <VideoPageLayout>
        <iframe
          type="text/html"
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`}
          frameBorder="0"
          title="youtube video"
        />
      </VideoPageLayout>
      <RelatedVidsDiv>{tubeResult}</RelatedVidsDiv>
    </>
  );
};

export default VideoPage;
