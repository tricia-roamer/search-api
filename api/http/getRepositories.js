const got = require('got');

// required variables
const { SEARCH_URI, TIMEOUT_MS } = process.env;

// convenience functions
const queryParams = (params) => Object.entries(params || {})
  .reduce((acc, [key, val]) => {
    if (!val) { return acc; }
    return [...acc, `${key}=${val}`];
  }, []).join('&');

const queryCount = (count) => {
  if (!count) { return undefined; }
  return { per_page: count };
};

exports.getRepositories = ({ startAt, count, language }) => {
  // STEP 1: define parameters to make request
  const params = {
    q: `created:>${startAt}+language:${language}`,
    sort: 'stars',
    order: 'desc',
    ...(queryCount(count)),
  };

  const uri = `${SEARCH_URI}?${queryParams(params)}`;

  const options = {
    responseType: 'json',
    timeout: { request: TIMEOUT_MS },
  };

  // STEP 2: make request and check for errors
  return got.get(uri, options)
    .then((res) => res.body)
    .catch((err) => err?.response?.body || err.message);
};
