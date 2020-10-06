import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useYoutube } from '../../utils/hooks/useYoutube';
import VideoCardContainer from '../../components/VideoCardContainer/VideoCardContainer.component';

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
const HiP = styled.p`
  text-align: center;
`;
const ResultsDiv = styled.div`
  display: grid;
  margin: 1em;
  grid-row-gap: 0;
  grid-column-gap: 0.5em;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-template-rows: repeat(fit-content, 200px);
`;

function HomePage() {
  const { response: videos, nextPage, getYoutubeSearch, getMoreVideos } = useYoutube();
  const searchRef = useRef();
  useEffect(() => {
    document.title = 'Challenge - Home';
  }, []);

  const searchYoutube = (event) => {
    event.preventDefault();
    const inputValue = searchRef.current.value;
    getYoutubeSearch(inputValue);
  };

  const loadMoreVideos = (event) => {
    event.preventDefault();
    getMoreVideos(nextPage);
  };

  return (
    <>
      <HomeDiv>
        <form onSubmit={searchYoutube}>
          <input ref={searchRef} type="text" data-testid="inputButton" />
          <button type="submit"> Submit </button>
        </form>
      </HomeDiv>
      {videos.length ? (
        <ResultsDiv>
          <VideoCardContainer videos={videos} />
          <button key="moreButton" type="button" onClick={loadMoreVideos}>
            More Videos
          </button>
        </ResultsDiv>
      ) : (
        <HiP>
          Hi!
          <span
            role="img"
            aria-label="sheep"
            key="emptyResultset"
            data-testid="HiEmojiSpan"
          >
            👋
          </span>
        </HiP>
      )}
    </>
  );
}

export default HomePage;
