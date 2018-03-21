var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import hasCacheExpired from '../utils/hasCacheExpired';

var getPrunedForPersistenceState = function getPrunedForPersistenceState(state) {
  if (!state || !Object.keys(state).length) {
    return {};
  }

  var newRequests = Object.entries(state.requests || {}).reduce(function (allRequests, _ref) {
    var _ref2;

    var key = _ref[0],
        request = _ref[1];
    return _extends({}, allRequests, request.endedAt && !request.didInvalidate && !hasCacheExpired(request.expireAt) ? (_ref2 = {}, _ref2[key] = request.expireAt === 'never' ? _extends({}, request, { didInvalidate: true }) : request, _ref2) : {});
  }, {});

  var referencedResources = Object.values(newRequests || {}).reduce(function (allResources, request) {
    return _extends({}, allResources, Object.entries(request.payloadIds || {}).reduce(function (requestResources, _ref3) {
      var _extends2;

      var resourceName = _ref3[0],
          resourceIds = _ref3[1];
      return _extends({}, requestResources, (_extends2 = {}, _extends2[resourceName] = [].concat(requestResources[resourceName] || [], resourceIds.map(function (id) {
        return id.toString();
      })), _extends2));
    }, {}));
  }, {});

  var newResources = Object.entries(state.resources || {}).reduce(function (allResources, _ref4) {
    var _extends3;

    var resourceName = _ref4[0],
        resourceMap = _ref4[1];
    return _extends({}, allResources, (_extends3 = {}, _extends3[resourceName] = Object.entries(resourceMap || {}).reduce(function (allResource, _ref5) {
      var _ref6;

      var resourceId = _ref5[0],
          resourceItem = _ref5[1];
      return _extends({}, allResource, referencedResources[resourceName] && referencedResources[resourceName].includes(resourceId) ? (_ref6 = {}, _ref6[resourceId] = resourceItem, _ref6) : {});
    }, {}), _extends3));
  }, {});

  var newResourcesCleaned = Object.entries(newResources || {}).reduce(function (allResources, _ref7) {
    var _ref8;

    var resourceName = _ref7[0],
        resourceMap = _ref7[1];
    return _extends({}, allResources, Object.keys(resourceMap).length ? (_ref8 = {}, _ref8[resourceName] = resourceMap, _ref8) : {});
  }, {});

  var newResolversHashes = _extends({}, state.resolversHashes || {}, {
    requests: Object.entries(state.resolversHashes && state.resolversHashes.requests ? state.resolversHashes.requests : {}).reduce(function (requestsHashes, _ref9) {
      var _ref10;

      var key = _ref9[0],
          hashesByResourceName = _ref9[1];
      return _extends({}, requestsHashes, newRequests[key] ? (_ref10 = {}, _ref10[key] = hashesByResourceName, _ref10) : {});
    }, {}),
    resources: Object.entries(state.resolversHashes && state.resolversHashes.resources ? state.resolversHashes.resources : {}).reduce(function (resourcesHashes, _ref11) {
      var _ref12;

      var key = _ref11[0],
          hash = _ref11[1];
      return _extends({}, resourcesHashes, newResourcesCleaned[key] && Object.keys(state.resources && state.resources[key] ? state.resources[key] : {}).length === Object.keys(newResourcesCleaned[key] || {}).length ? (_ref12 = {}, _ref12[key] = hash, _ref12) : {});
    }, {})
  });

  var newState = _extends({}, state, {
    requests: newRequests,
    resources: newResourcesCleaned,
    resolversHashes: newResolversHashes
  });

  return newState;
};

export default getPrunedForPersistenceState;