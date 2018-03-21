var generateThunkAction = function generateThunkAction(actionType, resourceName) {
  return function (normalizedURL) {
    return {
      type: actionType,
      url: normalizedURL,
      resourceName: resourceName
    };
  };
};

export default generateThunkAction;