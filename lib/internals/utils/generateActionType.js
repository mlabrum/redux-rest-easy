var generateActionType = function generateActionType(resourceName, actionName, step) {
  return "@@rest-easy/" + resourceName + "/" + actionName + "/" + step.toUpperCase();
};

export default generateActionType;