var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import getDefaultNetworkHelpers from './getDefaultNetworkHelpers';

var DEFAULT_NETWORK_HELPERS = getDefaultNetworkHelpers();

var networkHelpers = DEFAULT_NETWORK_HELPERS;

export var setNetworkHelpers = function setNetworkHelpers(helpers) {
  networkHelpers = helpers ? _extends({}, DEFAULT_NETWORK_HELPERS, helpers) : DEFAULT_NETWORK_HELPERS;
};

export var getNetworkHelpers = function getNetworkHelpers() {
  return networkHelpers;
};