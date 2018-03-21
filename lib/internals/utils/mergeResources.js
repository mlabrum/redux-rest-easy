var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import isObject from 'lodash.isplainobject';
import mergeWith from 'lodash.mergewith';

var mergeResources = function mergeResources(state, normalizedPayload) {
  return mergeWith(state.resources || {}, normalizedPayload, function (resources, newResources) {
    return isObject(resources) ? _extends({}, resources, newResources) : undefined;
  });
};

export default mergeResources;