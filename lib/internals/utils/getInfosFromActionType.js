var getInfosFromActionType = function getInfosFromActionType(actionType) {
  var actionTypeSplit = actionType.split('/');

  return {
    resourceName: actionTypeSplit[1],
    actionName: actionTypeSplit[2],
    caseName: actionTypeSplit[3]
  };
};

export default getInfosFromActionType;