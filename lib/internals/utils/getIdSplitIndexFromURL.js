var getIdSplitIndexFromURL = function getIdSplitIndexFromURL(url) {
  var URL = typeof url !== 'string' ? url() : url;

  var reversedSplitURL = URL.split('/').reverse();
  var reversedIndex = reversedSplitURL.findIndex(function (component) {
    return component.startsWith('::');
  });

  return reversedIndex !== -1 ? reversedSplitURL.length - 1 - reversedIndex : -1;
};

export default getIdSplitIndexFromURL;