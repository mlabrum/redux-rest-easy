var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import getInfosFromActionType from '../../utils/getInfosFromActionType';
import getResourceIdsByResourceNameFromNormalizedPayload from '../../utils/getResourceIdsByResourceNameFromNormalizedPayload';
import { computeNewResolversHashes, resetResourceResolversHashes } from '../../utils/resolversHashes';
import shallowMergeResources from '../../utils/shallowMergeResources';

var REDUCER_CASES = {
  REQUEST: function REQUEST(state, _ref) {
    var _extends2;

    var type = _ref.type,
        normalizedURL = _ref.url,
        resourceId = _ref.resourceId;
    return _extends({}, state, {
      requests: _extends({}, state.requests || {}, (_extends2 = {}, _extends2[normalizedURL] = _extends({}, state.requests && state.requests[normalizedURL] ? state.requests[normalizedURL] : {}, {
        resourceName: getInfosFromActionType(type).resourceName,
        resourceId: resourceId,
        startedAt: new Date().toISOString(),
        endedAt: null,
        expireAt: null,
        hasSucceeded: state.requests && state.requests[normalizedURL] ? state.requests[normalizedURL].hasSucceeded : false,
        hasFailed: state.requests && state.requests[normalizedURL] ? state.requests[normalizedURL].hasFailed : false,
        didInvalidate: state.requests && state.requests[normalizedURL] ? state.requests[normalizedURL].didInvalidate : false,
        fromCache: state.requests && state.requests[normalizedURL] ? state.requests[normalizedURL].fromCache : false
      }), _extends2))
    });
  },
  RECEIVE: function RECEIVE(state, _ref2) {
    var _extends3;

    var type = _ref2.type,
        normalizedURL = _ref2.url,
        normalizedPayload = _ref2.payload,
        principalResourceIds = _ref2.principalResourceIds,
        _ref2$cacheLifetime = _ref2.cacheLifetime,
        cacheLifetime = _ref2$cacheLifetime === undefined ? 0 : _ref2$cacheLifetime;

    var _getInfosFromActionTy = getInfosFromActionType(type),
        resourceName = _getInfosFromActionTy.resourceName;

    var newStateOldHashes = _extends({}, state, {
      requests: _extends({}, state.requests || {}, (_extends3 = {}, _extends3[normalizedURL] = _extends({}, state.requests && state.requests[normalizedURL] ? state.requests[normalizedURL] : {}, {
        endedAt: new Date().toISOString(),
        expireAt: cacheLifetime !== Infinity ? new Date(new Date().getTime() + cacheLifetime * 1000).toISOString() : 'never',
        hasSucceeded: true,
        hasFailed: false,
        didInvalidate: false,
        fromCache: false,
        payloadIds: getResourceIdsByResourceNameFromNormalizedPayload(resourceName, normalizedPayload, principalResourceIds)
      }), _extends3)),
      resources: shallowMergeResources(state, normalizedPayload)
    });

    var newState = _extends({}, newStateOldHashes, {
      resolversHashes: computeNewResolversHashes(newStateOldHashes, resourceName, normalizedURL, normalizedPayload, principalResourceIds)
    });

    return newState;
  },
  FAIL: function FAIL(state, _ref3) {
    var _extends4;

    var normalizedURL = _ref3.url;
    return _extends({}, state, {
      requests: _extends({}, state.requests || {}, (_extends4 = {}, _extends4[normalizedURL] = _extends({}, state.requests && state.requests[normalizedURL] ? state.requests[normalizedURL] : {}, {
        endedAt: new Date().toISOString(),
        hasSucceeded: false,
        hasFailed: true
      }), _extends4))
    });
  },
  RECEIVE_FROM_CACHE: function RECEIVE_FROM_CACHE(state, _ref4) {
    var _extends5;

    var type = _ref4.type,
        normalizedURL = _ref4.url,
        resourceId = _ref4.resourceId,
        normalizedPayload = _ref4.payload,
        principalResourceIds = _ref4.principalResourceIds,
        _ref4$cacheLifetime = _ref4.cacheLifetime,
        cacheLifetime = _ref4$cacheLifetime === undefined ? 0 : _ref4$cacheLifetime;

    var _getInfosFromActionTy2 = getInfosFromActionType(type),
        resourceName = _getInfosFromActionTy2.resourceName;

    var newStateOldHashes = _extends({}, state, {
      requests: _extends({}, state.requests || {}, (_extends5 = {}, _extends5[normalizedURL] = _extends({}, state.requests && state.requests[normalizedURL] ? state.requests[normalizedURL] : {}, {
        resourceName: getInfosFromActionType(type).resourceName,
        resourceId: resourceId,
        startedAt: new Date().toISOString(),
        endedAt: new Date().toISOString(),
        expireAt: cacheLifetime !== Infinity ? new Date(new Date().getTime() + cacheLifetime * 1000).toISOString() : 'never',
        hasSucceeded: true,
        hasFailed: false,
        didInvalidate: false,
        fromCache: true,
        payloadIds: getResourceIdsByResourceNameFromNormalizedPayload(resourceName, normalizedPayload, principalResourceIds)
      }), _extends5)),
      resources: shallowMergeResources(state, normalizedPayload)
    });

    var newState = _extends({}, newStateOldHashes, {
      resolversHashes: computeNewResolversHashes(newStateOldHashes, resourceName, normalizedURL, normalizedPayload, principalResourceIds)
    });

    return newState;
  },
  INVALIDATE_RESOURCE: function INVALIDATE_RESOURCE(state, _ref5) {
    var resourceName = _ref5.resourceName;
    return _extends({}, state, {
      requests: _extends({}, Object.entries(state.requests || {}).reduce(function (prev, _ref6) {
        var _extends6;

        var key = _ref6[0],
            request = _ref6[1];
        return _extends({}, prev, (_extends6 = {}, _extends6[key] = !request.didInvalidate && (request.resourceName === resourceName || request.payloadIds && request.payloadIds[resourceName]) ? _extends({}, request, {
          didInvalidate: true
        }) : request, _extends6));
      }, {}))
    });
  },
  INVALIDATE_ID: function INVALIDATE_ID(state, _ref7) {
    var resourceName = _ref7.resourceName,
        resourceId = _ref7.resourceId;
    return _extends({}, state, {
      requests: _extends({}, Object.entries(state.requests || {}).reduce(function (prev, _ref8) {
        var _extends7;

        var key = _ref8[0],
            request = _ref8[1];
        return _extends({}, prev, (_extends7 = {}, _extends7[key] = !request.didInvalidate && (request.resourceName === resourceName && request.resourceId === resourceId || request.payloadIds && request.payloadIds[resourceName] && request.payloadIds[resourceName].map(function (item) {
          return item.toString();
        }).includes(resourceId.toString())) ? _extends({}, request, {
          didInvalidate: true
        }) : request, _extends7));
      }, {}))
    });
  },
  INVALIDATE_REQUEST: function INVALIDATE_REQUEST(state, _ref9) {
    var _extends8;

    var normalizedURL = _ref9.url;
    return _extends({}, state, {
      requests: _extends({}, state.requests || {}, (_extends8 = {}, _extends8[normalizedURL] = _extends({}, state.requests && state.requests[normalizedURL] ? state.requests[normalizedURL] : {}, {
        didInvalidate: true
      }), _extends8))
    });
  },
  RESET_RESOURCE: function RESET_RESOURCE(state, _ref10) {
    var _extends10;

    var resourceName = _ref10.resourceName;

    var newStateOldHashes = _extends({}, state, {
      requests: _extends({}, Object.entries(state.requests || {}).filter(function (_ref11) {
        var _ref11$ = _ref11[1],
            name = _ref11$.resourceName,
            payloadIds = _ref11$.payloadIds;
        return resourceName !== name && (!payloadIds || !Object.keys(payloadIds).includes(resourceName));
      }).reduce(function (prev, _ref12) {
        var _extends9;

        var key = _ref12[0],
            request = _ref12[1];
        return _extends({}, prev, (_extends9 = {}, _extends9[key] = request, _extends9));
      }, {})),
      resources: _extends({}, state.resources || {}, (_extends10 = {}, _extends10[resourceName] = undefined, _extends10))
    });

    var newState = _extends({}, newStateOldHashes, {
      resolversHashes: resetResourceResolversHashes(newStateOldHashes, resourceName)
    });

    return newState;
  },
  RESET_ALL: function RESET_ALL() {
    var newState = {};

    return newState;
  }
};

var getReducerCases = function getReducerCases() {
  return REDUCER_CASES;
};

export default getReducerCases;