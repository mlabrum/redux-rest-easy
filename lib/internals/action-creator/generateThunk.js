import generateActionCreatorActions from '../actions/generateActionCreatorActions';
import formatURL from '../utils/formatURL';
import getIdSplitIndexFromURL from '../utils/getIdSplitIndexFromURL';
import getResourceIdFromNormalizedURL from '../utils/getResourceIdFromNormalizedURL';
import getRestEasyState from '../utils/getState';
import normalizeURL from '../utils/normalizeURL';
import isCacheExpired from './preflight/isCacheExpired';
import isSmartCacheAvailable from './preflight/isSmartCacheAvailable';
import shouldPerform from './preflight/shouldPerform';
import generateActionCreator from './thunk/generateActionCreator';

/* eslint-disable no-underscore-dangle */

var generateThunk = function generateThunk(resourceName, cacheLifetime, actionsConfig, actionName) {
  var _actionsConfig$action = actionsConfig[actionName],
      method = _actionsConfig$action.method,
      url = _actionsConfig$action.url,
      beforeHook = _actionsConfig$action.beforeHook,
      normalizer = _actionsConfig$action.normalizer,
      afterHook = _actionsConfig$action.afterHook,
      networkHelpers = _actionsConfig$action.networkHelpers;

  var actionCreatorActions = generateActionCreatorActions(resourceName, actionName, cacheLifetime);
  var actionCreator = generateActionCreator(actionName, actionCreatorActions, method, beforeHook, normalizer, afterHook, networkHelpers);

  return function (args) {
    return function (dispatch, getState) {
      var state = getRestEasyState(getState());

      var _ref = args || {},
          urlParams = _ref.urlParams,
          query = _ref.query;

      var idSplitIndex = getIdSplitIndexFromURL(url);
      var formattedURL = formatURL(url, urlParams, query);
      var normalizedURL = normalizeURL(actionName, formattedURL);
      var resourceId = getResourceIdFromNormalizedURL(normalizedURL, idSplitIndex);

      var action = void 0;

      if (shouldPerform(state, normalizedURL)) {
        if (isCacheExpired(state, method, normalizedURL)) {
          if (isSmartCacheAvailable(state, method, resourceName, resourceId)) {
            action = function action() {
              var _resourceName, _actionCreatorActions;

              return dispatch(actionCreatorActions.RECEIVE_FROM_CACHE(normalizedURL, resourceId, (_actionCreatorActions = {}, _actionCreatorActions[resourceName] = (_resourceName = {}, _resourceName[resourceId] = null, _resourceName), _actionCreatorActions), [resourceId]));
            };
          } else {
            action = function action() {
              return dispatch(actionCreator(formattedURL, normalizedURL, resourceId)(args));
            };
          }
        }
      }

      var thunk = action ? action() : {};

      thunk.__actionName = actionName;
      thunk.__requestURL = normalizedURL;

      return thunk;
    };
  };
};

export default generateThunk;