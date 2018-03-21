var generateGlobalAction = function generateGlobalAction(actionType) {
  return function () {
    return {
      type: actionType
    };
  };
};

export default generateGlobalAction;