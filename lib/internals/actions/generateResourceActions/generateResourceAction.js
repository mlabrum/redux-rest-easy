var generateResourceAction = function generateResourceAction(actionType, resourceName) {
  return function (resourceId) {
    return {
      type: actionType,
      resourceName: resourceName,
      resourceId: resourceId
    };
  };
};

export default generateResourceAction;