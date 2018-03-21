import isPlainObject from 'lodash.isplainobject';

var GLOBAL_PREFIX = 'redux-rest-easy:';

var getPrefixedThrowError = function getPrefixedThrowError(prefix) {
  return function (error) {
    throw new Error(GLOBAL_PREFIX + ' ' + prefix + ' ' + error);
  };
};

var isString = function isString(value) {
  return typeof value === 'string';
};
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
var isDefined = function isDefined(value) {
  return value !== undefined;
};

var MANDATORY_KEYS = ['method', 'url'];
var OPTIONAL_KEYS = ['beforeHook', 'normalizer', 'afterHook', 'networkHelpers'];
var VALID_KEYS = [].concat(MANDATORY_KEYS, OPTIONAL_KEYS);
var VALID_METHODS = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'];

var displayResourceName = function displayResourceName(resourceName) {
  return resourceName + ' >';
};
var displayActionName = function displayActionName(actionName) {
  return actionName + ' >';
};
var displayFunctionName = function displayFunctionName() {
  return 'createResource >';
};

var noConfigError = function noConfigError() {
  return 'You have to provide a valid actions configuration.\n\nFor more information, browse the related documentation: https://github.com/Brigad/redux-rest-easy/blob/master/docs/api/createResource.md#createresourceresourcename-optionsactions';
};

var missingMandatoryKeyError = function missingMandatoryKeyError(mandatoryKEY) {
  return 'Key "' + mandatoryKEY + '" is missing.\n\nFor more information, browse the related documentation: https://github.com/Brigad/redux-rest-easy/blob/master/docs/api/createResource/actionsConfig.md#actionsconfig';
};

var unknownKeyError = function unknownKeyError(actionKey) {
  return 'Unknown key "' + actionKey + '.\n\nFor more information, browse the related documentation: https://github.com/Brigad/redux-rest-easy/blob/master/docs/api/createResource/actionsConfig.md#actionsconfig';
};

var invalidMethodError = function invalidMethodError(method) {
  return 'Method "' + method + '" is invalid. Expected one of: ' + VALID_METHODS.join(', ') + '.\n\nFor more information, browse the related documentation: https://github.com/Brigad/redux-rest-easy/blob/master/docs/api/createResource/actionsConfig.md#actionsconfig';
};

var invalidURLError = function invalidURLError(url) {
  return 'URL "' + url + '" is invalid. Expected a string or a function returning a string.\n\nFor more information, browse the related documentation: https://github.com/Brigad/redux-rest-easy/blob/master/docs/api/createResource/actionsConfig.md#actionsconfig';
};

var invalidFunctionError = function invalidFunctionError(func, value) {
  return func + ' "' + value + '" is invalid. Expected a valid function.\n\nFor more information, browse the related documentation: https://github.com/Brigad/redux-rest-easy/blob/master/docs/api/createResource/actionsConfig.md#actionsconfig';
};

var invalidObjectError = function invalidObjectError(func, value) {
  return func + ' "' + value + '" is invalid. Expected a valid object.\n\nFor more information, browse the related documentation: https://github.com/Brigad/redux-rest-easy/blob/master/docs/api/createResource/actionsConfig.md#actionsconfig';
};

var invalidNetworkHelperError = function invalidNetworkHelperError(func, value) {
  return func + ' "networkHelpers.' + value + '" is invalid. Expected a valid function.\n\nFor more information, browse the related documentation: https://github.com/Brigad/redux-rest-easy/blob/master/docs/api/createResource/actionsConfig.md#actionsconfig';
};

var checkActionsConfig = function checkActionsConfig(resourceName, actionsConfig) {
  if (!actionsConfig) {
    return;
  }

  if (!isPlainObject(actionsConfig) || !Object.keys(actionsConfig).length) {
    var throwError = getPrefixedThrowError(displayResourceName(resourceName) + ' ' + displayFunctionName());

    throwError(noConfigError());
  }

  Object.keys(actionsConfig).forEach(function (actionName) {
    var throwError = getPrefixedThrowError(displayResourceName(resourceName) + ' ' + displayActionName(actionName) + ' ' + displayFunctionName());

    var action = actionsConfig[actionName];
    var actionKeys = Object.keys(action);

    MANDATORY_KEYS.forEach(function (mandatoryKey) {
      if (!actionKeys.includes(mandatoryKey)) {
        throwError(missingMandatoryKeyError(mandatoryKey));
      }
    });
    actionKeys.forEach(function (actionKey) {
      if (!VALID_KEYS.includes(actionKey)) {
        throwError(unknownKeyError(actionKey));
      }
    });

    var method = action.method,
        url = action.url,
        beforeHook = action.beforeHook,
        normalizer = action.normalizer,
        afterHook = action.afterHook,
        networkHelpers = action.networkHelpers;


    if (!isString(method) || !VALID_METHODS.includes(method)) {
      throwError(invalidMethodError(method));
    }
    if (!url || !isString(url) && !isFunction(url)) {
      throwError(invalidURLError(url));
    }
    if (isDefined(beforeHook) && !isFunction(beforeHook)) {
      throwError(invalidFunctionError('beforeHook', beforeHook));
    }
    if (isDefined(normalizer) && !isFunction(normalizer)) {
      throwError(invalidFunctionError('normalizer', normalizer));
    }
    if (isDefined(afterHook) && !isFunction(afterHook)) {
      throwError(invalidFunctionError('afterHook', afterHook));
    }
    if (isDefined(networkHelpers) && !isPlainObject(networkHelpers)) {
      throwError(invalidObjectError('networkHelpers', networkHelpers));
    }

    Object.keys(networkHelpers || {}).forEach(function (networkHelper) {
      if (isDefined(networkHelpers[networkHelper]) && !isFunction(networkHelpers[networkHelper])) {
        throwError(invalidNetworkHelperError(networkHelper, networkHelpers[networkHelper]));
      }
    });
  });
};

export default checkActionsConfig;