import { useState, useEffect, useCallback } from 'react';
import callYoutube from '../../api/youtube.api';
import { DEFAULT_YOUTUBE_API, VIDEO_RESPONSE_TYPE_STR } from '../constants';

function useYoutube() {
  const [params, setParams] = useState({ ...DEFAULT_YOUTUBE_API });
  const [response, setResponse] = useState([]);
  const [nextPage, setNextPage] = useState('');
  /**
   * Updating the searchValue will generate a call to the useEffect element in this hook.
   * @param {searchValue} value to perform a new search against youtube.
   */
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
  /**
   * Updating the next page id will generate a call to the useEffect element in this hook.
   * there is a requirement for a search to have been made before for this value to have an
   * effect.
   * @param {nextPageId} next page id for the next search
   */
  const getMoreVideos = useCallback(
    (nextPageId) => {
      setParams((p) => ({ ...p, pageToken: nextPageId }));
    },
    [setParams]
  );
  /**
   * Updating the id will generate a call to the useEffect element in this hook.
   * @param {videoId} id of video for next search
   */
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
  /**
   * Updating the list of ids will generate a call to the useEffect element in this hook.
   * @param {...args} list of ids for next search
   */
  const getVideosById = useCallback(
    (...args) => {
      const ids = args.join(',');
      if (ids) {
        setParams((p) => ({ ...p, id: ids }));
      }
    },
    [setParams]
  );

  /**
   * Will filter a list of results from the youtube api to only include video responses
   * where video->id->kind or video->kind match the value of VIDEO_RESPONSE_TYPE_STR.
   * @param {videoList} List of videos to filter.
   */
  const filterOtherKind = (videoList) => {
    return videoList.filter(
      (v) => v.kind === VIDEO_RESPONSE_TYPE_STR || v.id.kind === VIDEO_RESPONSE_TYPE_STR
    );
  };

  /**
   * Use effect function that will trigger a query to the youtube api,
   * the dependencies are the different parameters that can be updated to
   * perform a new query.
   * The response of this element is set in the response state.
   */
  useEffect(() => {
    const updateResponse = async () => {
      try {
        if ('q' in params || 'relatedToVideoId' in params || 'id' in params) {
          const apiResponse = await callYoutube(params);
          apiResponse.json().then((youtubeResponse) => {
            setNextPage(youtubeResponse.nextPageToken || '');
            const videoItems = filterOtherKind(youtubeResponse.items || []);
            if ('pageToken' in params) {
              setResponse((resp) => [
                ...resp,
                ...videoItems.filter(
                  (v) => resp.findIndex((r) => r.id.videoId === v.id.videoId) === -1
                ),
              ]);
            } else {
              setResponse(videoItems);
            }
          });
        }
      } catch (error) {
        console.log(`Issues Performing youtube request:  ${error}`);
      }
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
