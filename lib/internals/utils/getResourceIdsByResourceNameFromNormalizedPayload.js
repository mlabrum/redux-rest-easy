var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getResourceIdsByResourceNameFromNormalizedPayload = function getResourceIdsByResourceNameFromNormalizedPayload(principalResourceName, normalizedPayload, principalResourceIds) {
  return normalizedPayload ? Object.keys(normalizedPayload).reduce(function (resourceIdsByResourceName, resourceName) {
    var _extends2;

    return _extends({}, resourceIdsByResourceName, (_extends2 = {}, _extends2[resourceName] = resourceName === principalResourceName ? principalResourceIds : Object.keys(normalizedPayload[resourceName] || {}), _extends2));
  }, {}) : {};
};

export default getResourceIdsByResourceNameFromNormalizedPayload;