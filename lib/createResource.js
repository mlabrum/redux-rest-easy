var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import generateResourceActions from './internals/actions/generateResourceActions';
import generateThunkActions from './internals/actions/generateThunkActions';
import checkActionsConfig from './internals/config/checkActionsConfig';
import checkResourceConfig from './internals/config/checkResourceConfig';
import generateActionSelectors from './internals/selectors/generateActionSelectors';
import generateResourceSelectors from './internals/selectors/generateResourceSelectors';

var createResource = function createResource(resourceName, resourceConfig) {
  return function (actionsConfig) {
    checkResourceConfig(resourceName, resourceConfig);
    checkActionsConfig(resourceName, actionsConfig);

    var _ref = resourceConfig || {},
        _ref$cacheLifetime = _ref.cacheLifetime,
        cacheLifetime = _ref$cacheLifetime === undefined ? 0 : _ref$cacheLifetime,
        denormalizer = _ref.denormalizer;

    var actions = _extends({}, generateResourceActions(resourceName));
    var selectors = _extends({}, generateResourceSelectors(resourceName, denormalizer));

    Object.keys(actionsConfig || {}).forEach(function (actionName) {
      actions = _extends({}, actions, generateThunkActions(resourceName, cacheLifetime, actionsConfig || {}, actionName));
      selectors = _extends({}, selectors, generateActionSelectors(resourceName, actionName, denormalizer));
    });

    return {
      actions: actions,
      selectors: selectors
    };
  };
};

export default createResource;