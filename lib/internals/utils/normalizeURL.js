var normalizeURL = function normalizeURL(actionName, formattedURL) {
  return (actionName || '') + ':' + (formattedURL || '');
};

export default normalizeURL;