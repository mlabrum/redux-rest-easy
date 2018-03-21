import createCachedSelector from 're-reselect';

import getReReselectOptions from '../utils/getReReselectOptions';
import getState from '../utils/getState';
import { getEmptyResourceHash, getResourceHash, getResourcesHash } from '../utils/resolversHashes';

var EMPTY_RESOURCE = [];
var EMPTY_RESOURCE_ID = null;

var resourcesSelector = function resourcesSelector(state) {
  return state.resources;
};

var resourceSelector = function resourceSelector(state, resourceName) {
  return state.resources && state.resources[resourceName] ? state.resources[resourceName] : null;
};

var resolversHashesSelector = function resolversHashesSelector(state) {
  return state.resolversHashes;
};

var applyDenormalizerSelector = function applyDenormalizerSelector(state, resourceName, applyDenormalizer) {
  return applyDenormalizer;
};

var denormalizerSelector = function denormalizerSelector(state, resourceName, applyDenormalizer, denormalizer) {
  return denormalizer;
};

var getResourceSelector = function getResourceSelector(resources, resource, applyDenormalizer, denormalizer) {
  if (!resource) {
    return EMPTY_RESOURCE;
  }

  return !applyDenormalizer || !denormalizer ? Object.values(resource) : denormalizer(Object.keys(resource), resources);
};

var getResourceResolver = function getResourceResolver(state, resourceName, applyDenormalizer, denormalizer) {
  var resource = resourceSelector(state, resourceName);
  var resolversHashes = resolversHashesSelector(state);

  if (resource) {
    return !applyDenormalizer || !denormalizer ? applyDenormalizer + '-' + getResourceHash(resolversHashes, resourceName) : applyDenormalizer + '-' + getResourcesHash(resolversHashes);
  }

  return getEmptyResourceHash();
};

var _getResource = createCachedSelector(resourcesSelector, resourceSelector, applyDenormalizerSelector, denormalizerSelector, getResourceSelector)(getResourceResolver, getReReselectOptions());

var _getResourceById = function _getResourceById(state, resourceName, resourceId, applyDenormalizer, denormalizer) {
  if (!applyDenormalizer || !denormalizer) {
    return state.resources && state.resources[resourceName] && state.resources[resourceName][resourceId] ? state.resources[resourceName][resourceId] : EMPTY_RESOURCE_ID;
  }

  return denormalizer([resourceId], state.resources)[0] || EMPTY_RESOURCE_ID;
};

var generateResourceSelectors = function generateResourceSelectors(resourceName, denormalizer) {
  return {
    resource: {
      getResource: function getResource(state) {
        var applyDenormalizer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        return _getResource(getState(state), resourceName, applyDenormalizer, denormalizer);
      },
      getResourceById: function getResourceById(state, resourceId) {
        var applyDenormalizer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        return _getResourceById(getState(state), resourceName, resourceId, applyDenormalizer, denormalizer);
      }
    }
  };
};

export default generateResourceSelectors;