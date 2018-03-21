import hasCacheExpired from '../../utils/hasCacheExpired';

var isSmartCacheAvailable = function isSmartCacheAvailable(state, method, resourceName, resourceId) {
  if (method !== 'GET' || !state || !state.requests || !resourceName || resourceId === null) {
    return false;
  }

  return Object.values(state.requests).some(function (_ref) {
    var hasSucceeded = _ref.hasSucceeded,
        didInvalidate = _ref.didInvalidate,
        expireAt = _ref.expireAt,
        name = _ref.resourceName,
        id = _ref.resourceId,
        payloadIds = _ref.payloadIds;
    return hasSucceeded && !didInvalidate && (resourceName === name && resourceId === id || payloadIds && payloadIds[resourceName] && payloadIds[resourceName].includes(resourceId)) && !hasCacheExpired(expireAt);
  });
};

export default isSmartCacheAvailable;