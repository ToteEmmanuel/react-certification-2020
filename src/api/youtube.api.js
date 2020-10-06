/**
 * Calls the youtube api service v3
 * @param {Object} params Containing the values that are going to be used as URL Search params for the youtube api request.
 */
const callYoutube = async (params) => {
  if (
    !('q' in params && params.q) &&
    !('relatedToVideoId' in params && params.relatedToVideoId) &&
    !('id' in params && params.id)
  ) {
    return {};
  }
  let url;
  if ('id' in params) {
    url = new URL(`${process.env.REACT_APP_YOUTUBE_URL}videos`);
  } else {
    url = new URL(`${process.env.REACT_APP_YOUTUBE_URL}search`);
  }
  url.search = new URLSearchParams(params).toString();
  return fetch(url);
};

export default { callYoutube };
