import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useYoutube } from '../../utils/hooks/useYoutube';
import VideoCard from '../../components/VideoCard';

const HomeDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  form {
    margin-top: 2em;
    justify-self: center;
    align-self: center;
    text-align: center;
    min-width: 20em;
    width: 33%;
    input {
      width: 100%;
    }
    button {
      width: 20em;
    }
  }
`;
const ResultsDiv = styled.div`
  display: grid;
  margin: 1em;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-template-rows: repeat(fit-content, 200px);
`;

function HomePage() {
  const [tubeResult, setTubeResult] = useState('');
  const history = useHistory();
  const { response: videos, nextPage, getYoutubeSearch, getMoreVideos } = useYoutube();
  const searchRef = useRef();
  let results = <></>;
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
    }
  }, [videos]);

  const searchYoutube = (event) => {
    event.preventDefault();
    const inputValue = searchRef.current.value;
    results = <></>;
    getYoutubeSearch(inputValue);
    history.push('/');
  };

  const loadMoreVideos = (event) => {
    event.preventDefault();
    getMoreVideos(nextPage);
  };
  if (tubeResult.length) {
    results = tubeResult;
  } else {
    results = (
      <p>
        Hi!
        <span role="img" aria-label="sheep" key="emptyResultset">
          👋
        </span>
      </p>
    );
  }
  if (nextPage) {
    results = (
      <>
        {results}
        <button key="moreButton" type="button" onClick={loadMoreVideos}>
          More Videos
        </button>
      </>
    );
  }

  return (
    <>
      <HomeDiv>
        <form onSubmit={searchYoutube}>
          <input ref={searchRef} type="text" />
          <button type="submit"> Submit </button>
        </form>
      </HomeDiv>
      <ResultsDiv>{results}</ResultsDiv>
    </>
  );
}

export default HomePage;
