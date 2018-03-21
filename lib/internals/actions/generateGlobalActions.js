import generateGlobalAction from './generateGlobalActions/generateGlobalAction';
import generateGlobalActionTypes from './generateGlobalActions/generateGlobalActionTypes';

var generateGlobalActions = function generateGlobalActions() {
  var _generateGlobalAction = generateGlobalActionTypes(),
      RESET_ALL = _generateGlobalAction.RESET_ALL;

  return {
    resetAll: generateGlobalAction(RESET_ALL)
  };
};

export default generateGlobalActions;