import qs from 'qs';

var stringifyObject = function stringifyObject(object) {
  if (!object || !Object.keys(object)) {
    return '';
  }

  return qs.stringify(object);
};

var stringifyQueryParameters = function stringifyQueryParameters(queryParameters) {
  var stringified = stringifyObject(queryParameters);

  return stringified ? '?' + stringified : '';
};

export default stringifyQueryParameters;