var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import getResourceIdsByResourceNameFromNormalizedPayload from '../utils/getResourceIdsByResourceNameFromNormalizedPayload';
import hash from '../utils/hash';

var EMPTY_RESOURCE = [];
var EMPTY_HASH = hash(EMPTY_RESOURCE);

export var computeNewResolversHashes = function computeNewResolversHashes(_ref, resourceName, normalizedURL, normalizedPayload, principalResourceIds) {
  var _ref$requests = _ref.requests,
      requests = _ref$requests === undefined ? {} : _ref$requests,
      _ref$resources = _ref.resources,
      resources = _ref$resources === undefined ? {} : _ref$resources,
      _ref$resolversHashes = _ref.resolversHashes,
      resolversHashes = _ref$resolversHashes === undefined ? {} : _ref$resolversHashes;

  var _extends3, _extends4;

  var resourceIdsByResourceName = getResourceIdsByResourceNameFromNormalizedPayload(resourceName, normalizedPayload, principalResourceIds);

  return _extends({}, resolversHashes, {
    requests: _extends({}, resolversHashes.requests || {}, (_extends3 = {}, _extends3[normalizedURL] = Object.keys(resourceIdsByResourceName).reduce(function (prev, resourceKey) {
      var _extends2;

      return _extends({}, prev, (_extends2 = {}, _extends2[resourceKey] = requests[normalizedURL] && requests[normalizedURL].payloadIds && requests[normalizedURL].payloadIds[resourceKey] ? hash(requests[normalizedURL].payloadIds[resourceKey]) : EMPTY_HASH, _extends2));
    }, {}), _extends3)),
    resources: _extends({}, resolversHashes.resources || {}, (_extends4 = {
      // Computed on demand instead, because rarely used and expensive
      _getResourcesHash: function _getResourcesHash() {
        return hash(resources);
      }
    }, _extends4[resourceName] = resources[resourceName] ? hash(resources[resourceName]) : EMPTY_HASH, _extends4))
  });
};

export var resetResourceResolversHashes = function resetResourceResolversHashes(_ref2, resourceName) {
  var _extends5;

  var _ref2$requests = _ref2.requests,
      requests = _ref2$requests === undefined ? {} : _ref2$requests,
      _ref2$resolversHashes = _ref2.resolversHashes,
      resolversHashes = _ref2$resolversHashes === undefined ? {} : _ref2$resolversHashes;
  return _extends({}, resolversHashes, {
    requests: _extends({}, Object.entries(resolversHashes.requests || {}).reduce(function (prev, _ref3) {
      var _ref4;

      var normalizedURL = _ref3[0],
          value = _ref3[1];
      return _extends({}, prev, Object.keys(requests).includes(normalizedURL) ? (_ref4 = {}, _ref4[normalizedURL] = value, _ref4) : {});
    }, {})),
    resources: _extends({}, resolversHashes.resources || {}, (_extends5 = {}, _extends5[resourceName] = EMPTY_HASH, _extends5))
  });
};

export var getEmptyResourceHash = function getEmptyResourceHash() {
  return EMPTY_HASH;
};

export var getPayloadIdsHash = function getPayloadIdsHash(resolversHashes, normalizedURL, resourceName) {
  return resolversHashes && resolversHashes.requests && resolversHashes.requests[normalizedURL] && resolversHashes.requests[normalizedURL][resourceName] ? resolversHashes.requests[normalizedURL][resourceName] : EMPTY_HASH;
};

/* eslint-disable no-underscore-dangle */
export var getResourcesHash = function getResourcesHash(resolversHashes) {
  return resolversHashes && resolversHashes.resources && resolversHashes.resources._getResourcesHash ? resolversHashes.resources._getResourcesHash() : EMPTY_HASH;
};
/* eslint-enable no-underscore-dangle */

export var getResourceHash = function getResourceHash(resolversHashes, resourceName) {
  return resolversHashes && resolversHashes.resources && resolversHashes.resources[resourceName] ? resolversHashes.resources[resourceName] : EMPTY_HASH;
};