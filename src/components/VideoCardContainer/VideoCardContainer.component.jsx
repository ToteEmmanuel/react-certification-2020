import React, { useEffect, useState } from 'react';
import VideoCard from '../VideoCard/VideoCard.component';

const VideoCardContainer = ({ videos }) => {
  const [tubeResult, setTubeResult] = useState('');
  useEffect(() => {
    if (videos.length) {
      const videoCards = videos.map((v) => {
        return (
          <VideoCard
            key={v.id.videoId || v.id}
            videoId={v.id.videoId || v.id}
            videoTitle={v.snippet.title}
            videoIMG={v.snippet.thumbnails.default.url}
          />
        );
      });
      setTubeResult(videoCards);
    }
  }, [videos, setTubeResult]);

  return <>{tubeResult}</>;
};

export default VideoCardContainer;
