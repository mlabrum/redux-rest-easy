var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import isPlainObject from 'lodash.isplainobject';
import mergeWith from 'lodash.mergewith';

var shallowMergeResources = function shallowMergeResources(state, normalizedPayload) {
  return mergeWith(state.resources, normalizedPayload, function (resources, newResources) {
    return isPlainObject(resources) ? _extends({}, resources, newResources) : undefined;
  });
};

export default shallowMergeResources;