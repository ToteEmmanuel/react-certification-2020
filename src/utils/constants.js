const AUTH_STORAGE_KEY = 'wa_cert_authenticated';
const AUTH_LOGGED_IN_USER = 'logged_user';
const VIDEO_RESPONSE_TYPE_STR = 'youtube#video';
const SCREEN_SIZES = {
  mobile: '320px',
  desktop: '768px',
};

const DEFAULT_YOUTUBE_API = {
  key: process.env.REACT_APP_YOUTUBE_API_KEY,
  maxResults: 20,
  order: 'viewCount',
  part: 'snippet',
};

const SCREEN_MEDIA_QUERIES = {
  mobile: `(min-width: ${SCREEN_SIZES.mobile})`,
  desktop: `(min-width: ${SCREEN_SIZES.desktop})`,
};

export {
  AUTH_STORAGE_KEY,
  SCREEN_MEDIA_QUERIES,
  DEFAULT_YOUTUBE_API,
  AUTH_LOGGED_IN_USER,
  VIDEO_RESPONSE_TYPE_STR,
};
