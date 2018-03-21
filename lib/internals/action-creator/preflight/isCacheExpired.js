import hasCacheExpired from '../../utils/hasCacheExpired';

var isCacheExpired = function isCacheExpired(state, method, normalizedURL) {
  if (method !== 'GET' || !state || !normalizedURL || !state.requests || !state.requests[normalizedURL]) {
    return true;
  }

  var _state$requests$norma = state.requests[normalizedURL],
      hasSucceeded = _state$requests$norma.hasSucceeded,
      didInvalidate = _state$requests$norma.didInvalidate,
      expireAt = _state$requests$norma.expireAt;


  return !hasSucceeded || didInvalidate || hasCacheExpired(expireAt);
};

export default isCacheExpired;