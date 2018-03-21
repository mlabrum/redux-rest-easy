import jsonStableStringify from 'json-stable-stringify';

import stringifyQueryParameters from './stringifyQueryParameters';

var formatURL = function formatURL(url, urlParams, query) {
  var formattedURL = typeof url !== 'string' ? url() : url;

  if (urlParams) {
    Object.keys(urlParams).forEach(function (param) {
      formattedURL = formattedURL.replace('::' + param, urlParams[param]).replace(':' + param, urlParams[param]);
    });
  }

  var queryString = query ? stringifyQueryParameters(JSON.parse(jsonStableStringify(query))) : '';

  return '' + formattedURL + queryString;
};

export default formatURL;