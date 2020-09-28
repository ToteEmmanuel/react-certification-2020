import { useState, useEffect } from 'react';
import { DEFAULT_YOUTUBE_API } from '../constants';

async function callYoutube(params) {
  if (
    !('q' in params || !params.q) ||
    !('relatedToVideoId' in params || !params.relatedToVideoId) ||
    !('id' in params || !params.id)
  ) {
    console.log('Empty search');
    return {};
  }
  let url;
  if ('id' in params) {
    url = new URL(`${process.env.REACT_APP_YOUTUBE_URL}videos`);
  } else {
    url = new URL(`${process.env.REACT_APP_YOUTUBE_URL}search`);
  }
  console.log(`Looking for ${params.q}.`);
  url.search = new URLSearchParams(params).toString();
  const resp = await fetch(url);
  return resp.json();
  // console.log(params);
}

function useYoutube() {
  const [params, setParams] = useState({ ...DEFAULT_YOUTUBE_API });
  const [response, setResponse] = useState([]);
  const [nextPage, setNextPage] = useState('');

  const getYoutubeSearch = (searchValue) => {
    const newParams = { ...params, q: searchValue };
    delete newParams.pageToken;
    setParams(newParams);
  };

  const getMoreVideos = (nextPageId) => {
    const newParams = { ...params, pageToken: nextPageId };
    setParams(newParams);
  };

  const getRelatedVideos = (videoId) => {
    const newParams = { ...params, relatedToVideoId: videoId, type: 'video' };
    delete newParams.pageToken;
    delete newParams.q;
    setParams(newParams);
  };

  const getVideosById = (...args) => {
    const ids = args.join(',');
    if (ids) {
      const newParams = { ...params, id: ids };
      setParams(newParams);
    }
  };

  useEffect(() => {
    const updateResponse = async () => {
      let videos = {};
      try {
        if ('q' in params || 'relatedToVideoId' in params || 'id' in params) {
          videos = await callYoutube(params);
        }
      } catch (error) {
        console.log(`Issues Performing youtube request:  ${error}`);
      }
      if ('items' in videos && 'pageToken' in params) {
        setResponse([
          ...response,
          ...videos.items.filter(
            (v) => response.findIndex((r) => r.id.videoId === v.id.videoId) === -1
          ),
        ]);
      } else {
        setResponse(videos.items || []);
      }
      setNextPage(videos.nextPageToken || '');
    };
    updateResponse();
  }, [params.q, params.pageToken, params.relatedToVideoId, params.id]);

  return {
    response,
    nextPage,
    getYoutubeSearch,
    getMoreVideos,
    getRelatedVideos,
    getVideosById,
  };
}

export { useYoutube };
