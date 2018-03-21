var getActionNameFromNormalizedURL = function getActionNameFromNormalizedURL(normalizedURL) {
  return normalizedURL.split(':')[0];
};

export default getActionNameFromNormalizedURL;