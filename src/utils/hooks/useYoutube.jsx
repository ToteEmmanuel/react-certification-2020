import { useState, useEffect, useCallback } from 'react';
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

  const getYoutubeSearch = useCallback(
    (searchValue) => {
      setParams((p) => {
        const newParams = { ...p, q: searchValue };
        delete newParams.pageToken;
        return newParams;
      });
    },
    [setParams]
  );

  const getMoreVideos = useCallback(
    (nextPageId) => {
      setParams((p) => ({ ...p, pageToken: nextPageId }));
    },
    [setParams]
  );

  const getRelatedVideos = useCallback(
    (videoId) => {
      setParams((p) => {
        const newParams = { ...p, relatedToVideoId: videoId, type: 'video' };
        delete newParams.pageToken;
        delete newParams.q;
        return newParams;
      });
    },
    [setParams]
  );

  const getVideosById = useCallback(
    (...args) => {
      const ids = args.join(',');
      if (ids) {
        setParams((p) => ({ ...p, id: ids }));
      }
    },
    [setParams]
  );

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
        setResponse((resp) => [
          ...resp,
          ...videos.items.filter(
            (v) => resp.findIndex((r) => r.id.videoId === v.id.videoId) === -1
          ),
        ]);
      } else {
        setResponse(videos.items || []);
      }
      setNextPage(videos.nextPageToken || '');
    };
    updateResponse();
  }, [
    params,
    params.q,
    params.pageToken,
    params.relatedToVideoId,
    params.id,
    setResponse,
  ]);

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
