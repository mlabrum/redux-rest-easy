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
var isNumber = function isNumber(value) {
  return typeof value === 'number';
};
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
var isDefined = function isDefined(value) {
  return value !== undefined;
};

var OPTIONAL_KEYS = ['cacheLifetime', 'denormalizer'];
var VALID_KEYS = OPTIONAL_KEYS;

var displayResourceName = function displayResourceName(resourceName) {
  return resourceName + ' >';
};
var displayFunctionName = function displayFunctionName() {
  return 'createResource >';
};

var noResourceNameError = function noResourceNameError() {
  return 'You have to provide a valid resource name.';
};
var noConfigError = function noConfigError() {
  return 'You have to provide a valid resource configuration (or not at all).';
};
var unknownKeyError = function unknownKeyError(actionKey) {
  return 'Unknown key "' + actionKey + '" in resource config.';
};
var invalidCacheLifetimeError = function invalidCacheLifetimeError(value) {
  return 'cacheLifetime "' + value + '" in resource config is invalid. Expected a number between 0 and Infinity.';
};
var invalidFunctionError = function invalidFunctionError(func, value) {
  return func + ' "' + value + '" in resource config is invalid. Expected a valid function.';
};

var checkResourceConfig = function checkResourceConfig(resourceName, resourceConfig) {
  var throwError = getPrefixedThrowError(displayResourceName(resourceName || '[no resource name]') + ' ' + displayFunctionName());

  if (!resourceName || !isString(resourceName)) {
    throwError(noResourceNameError());
  }

  if (!resourceConfig) {
    return;
  }

  if (!isPlainObject(resourceConfig) || !Object.keys(resourceConfig).length) {
    throwError(noConfigError());
  }

  var resourceConfigKeys = Object.keys(resourceConfig);

  resourceConfigKeys.forEach(function (actionKey) {
    if (!VALID_KEYS.includes(actionKey)) {
      throwError(unknownKeyError(actionKey));
    }
  });

  var cacheLifetime = resourceConfig.cacheLifetime,
      denormalizer = resourceConfig.denormalizer;


  if (isDefined(cacheLifetime) && (!isNumber(cacheLifetime) || cacheLifetime < 0)) {
    throwError(invalidCacheLifetimeError(cacheLifetime));
  }
  if (isDefined(denormalizer) && !isFunction(denormalizer)) {
    throwError(invalidFunctionError('denormalizer', denormalizer));
  }
};

export default checkResourceConfig;