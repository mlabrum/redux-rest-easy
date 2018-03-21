import createCachedSelector from 're-reselect';

import getActionNameFromNormalizedURL from '../utils/getActionNameFromNormalizedURL';
import getNormalizedURLFromOwnProps from '../utils/getNormalizedURLFromOwnProps';
import getReReselectOptions from '../utils/getReReselectOptions';
import getState from '../utils/getState';
import { getEmptyResourceHash, getPayloadIdsHash, getResourceHash } from '../utils/resolversHashes';

/* eslint-disable no-underscore-dangle */

var EMPTY_RESOURCE = [];

var areIdsEqual = function areIdsEqual(id1, id2) {
  var safeId1 = typeof id1 === 'number' ? id1.toString() : id1;
  var safeId2 = typeof id2 === 'number' ? id2.toString() : id2;

  return safeId1 === safeId2;
};

var isPerformingOnResourceOrId = function isPerformingOnResourceOrId(state, resourceName, actionName) {
  var resourceId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;
  return !!state.requests && Object.entries(state.requests).some(function (_ref) {
    var normalizedURL = _ref[0],
        _ref$ = _ref[1],
        name = _ref$.resourceName,
        id = _ref$.resourceId,
        endedAt = _ref$.endedAt;
    return getActionNameFromNormalizedURL(normalizedURL) === actionName && name === resourceName && (resourceId === -1 || id !== null && areIdsEqual(id, resourceId)) && !endedAt;
  });
};

var checkKeyForResourceOrId = function checkKeyForResourceOrId(state, resourceName, actionName, keyToCheck) {
  var resourceId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;

  var resourceRelatedRequests = state.requests && Object.entries(state.requests).filter(function (_ref2) {
    var normalizedURL = _ref2[0],
        _ref2$ = _ref2[1],
        name = _ref2$.resourceName,
        id = _ref2$.resourceId,
        endedAt = _ref2$.endedAt,
        payloadIds = _ref2$.payloadIds;
    return getActionNameFromNormalizedURL(normalizedURL) === actionName && name === resourceName && (resourceId === -1 || id !== null && areIdsEqual(id, resourceId) || !!endedAt && payloadIds && payloadIds[resourceName] && payloadIds[resourceName].includes(resourceId));
  }).map(function (_ref3) {
    var request = _ref3[1];
    return request;
  });

  if (!resourceRelatedRequests || !resourceRelatedRequests.length) {
    return false;
  }

  var lastRequest = resourceRelatedRequests.reduce(function (latest, curr) {
    if (!curr.endedAt) {
      return latest;
    }

    return latest.endedAt && curr.endedAt > latest.endedAt ? curr : latest;
  }, resourceRelatedRequests[0]);

  return lastRequest[keyToCheck];
};

var resourcesSelector = function resourcesSelector(state) {
  return state.resources;
};

var resourceSelector = function resourceSelector(state, resourceName) {
  return state.resources && state.resources[resourceName] ? state.resources[resourceName] : null;
};

var payloadIdsSelector = function payloadIdsSelector(state, resourceName, normalizedURL) {
  return state.requests && state.requests[normalizedURL] && state.requests[normalizedURL].payloadIds && state.requests[normalizedURL].payloadIds[resourceName] ? state.requests[normalizedURL].payloadIds[resourceName] : null;
};

var resolversHashesSelector = function resolversHashesSelector(state) {
  return state.resolversHashes;
};

var applyDenormalizerSelector = function applyDenormalizerSelector(state, resourceName, normalizedURL, applyDenormalizer) {
  return applyDenormalizer;
};

var denormalizerSelector = function denormalizerSelector(state, resourceName, normalizedURL, applyDenormalizer, denormalizer) {
  return denormalizer;
};

var getRequestResourceSelector = function getRequestResourceSelector(resources, resource, payloadIds, applyDenormalizer, denormalizer) {
  if (!resource || !payloadIds) {
    return EMPTY_RESOURCE;
  }

  return !applyDenormalizer || !denormalizer ? payloadIds.reduce(function (prev, payloadId) {
    return [].concat(prev, [resource[payloadId]]);
  }, []) : denormalizer(payloadIds, resources);
};

var getRequestResourceResolver = function getRequestResourceResolver(state, resourceName, normalizedURL, applyDenormalizer, denormalizer) {
  var resource = resourceSelector(state, resourceName);
  var payloadIds = payloadIdsSelector(state, resourceName, normalizedURL);
  var resolversHashes = resolversHashesSelector(state);

  if (resource && payloadIds) {
    return !applyDenormalizer || !denormalizer ? applyDenormalizer + '-' + getPayloadIdsHash(resolversHashes, normalizedURL, resourceName) + '-' + getResourceHash(resolversHashes, resourceName) : applyDenormalizer + '-' + Object.keys(state.requests[normalizedURL].payloadIds).map(function (resourceKey) {
      return getPayloadIdsHash(resolversHashes, normalizedURL, resourceKey) + '-' + getResourceHash(resolversHashes, resourceKey);
    }).join('--');
  }

  return getEmptyResourceHash();
};

var getRequestResource = createCachedSelector(resourcesSelector, resourceSelector, payloadIdsSelector, applyDenormalizerSelector, denormalizerSelector, getRequestResourceSelector)(getRequestResourceResolver, getReReselectOptions());

var isPerformingRequest = function isPerformingRequest(state, normalizedURL) {
  return !!(state.requests && state.requests[normalizedURL] && !state.requests[normalizedURL].endedAt);
};

var checkKeyForRequest = function checkKeyForRequest(state, normalizedURL, keyToCheck) {
  return !!(state.requests && state.requests[normalizedURL] && state.requests[normalizedURL][keyToCheck]);
};

var generateActionSelectors = function generateActionSelectors(resourceName, actionName, denormalizer) {
  var _ref4;

  return _ref4 = {}, _ref4[actionName] = {
    resource: {
      couldPerform: function couldPerform(state) {
        return !isPerformingOnResourceOrId(getState(state), resourceName, actionName);
      },
      isPerforming: function isPerforming(state) {
        return isPerformingOnResourceOrId(getState(state), resourceName, actionName);
      },
      isValid: function isValid(state) {
        return !checkKeyForResourceOrId(getState(state), resourceName, actionName, 'didInvalidate');
      },
      hasSucceeded: function hasSucceeded(state) {
        return checkKeyForResourceOrId(getState(state), resourceName, actionName, 'hasSucceeded');
      },
      hasFailed: function hasFailed(state) {
        return checkKeyForResourceOrId(getState(state), resourceName, actionName, 'hasFailed');
      },
      couldPerformOnId: function couldPerformOnId(state, resourceId) {
        return !isPerformingOnResourceOrId(getState(state), resourceName, actionName, resourceId);
      },
      isPerformingOnId: function isPerformingOnId(state, resourceId) {
        return isPerformingOnResourceOrId(getState(state), resourceName, actionName, resourceId);
      },
      hasSucceededOnId: function hasSucceededOnId(state, resourceId) {
        return checkKeyForResourceOrId(getState(state), resourceName, actionName, 'hasSucceeded', resourceId);
      },
      hasFailedOnId: function hasFailedOnId(state, resourceId) {
        return checkKeyForResourceOrId(getState(state), resourceName, actionName, 'hasFailed', resourceId);
      },
      isValidId: function isValidId(state, resourceId) {
        return !checkKeyForResourceOrId(getState(state), resourceName, actionName, 'didInvalidate', resourceId);
      }
    },
    request: {
      getResource: function getResource(state, ownProps) {
        var applyDenormalizer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        return getRequestResource(getState(state), resourceName, getNormalizedURLFromOwnProps(resourceName, actionName, ownProps), applyDenormalizer, denormalizer);
      },
      couldPerform: function couldPerform(state, ownProps) {
        return !isPerformingRequest(getState(state), getNormalizedURLFromOwnProps(resourceName, actionName, ownProps));
      },
      isPerforming: function isPerforming(state, ownProps) {
        return isPerformingRequest(getState(state), getNormalizedURLFromOwnProps(resourceName, actionName, ownProps));
      },
      isValid: function isValid(state, ownProps) {
        return !checkKeyForRequest(getState(state), getNormalizedURLFromOwnProps(resourceName, actionName, ownProps), 'didInvalidate');
      },
      hasSucceeded: function hasSucceeded(state, ownProps) {
        return checkKeyForRequest(getState(state), getNormalizedURLFromOwnProps(resourceName, actionName, ownProps), 'hasSucceeded');
      },
      hasFailed: function hasFailed(state, ownProps) {
        return checkKeyForRequest(getState(state), getNormalizedURLFromOwnProps(resourceName, actionName, ownProps), 'hasFailed');
      }
    }
  }, _ref4;
};

export default generateActionSelectors;