import generateActionType from '../../utils/generateActionType';

var generateGlobalActionTypes = function generateGlobalActionTypes() {
  return {
    RESET_ALL: generateActionType('@global', '@reset', 'RESET_ALL')
  };
};

export default generateGlobalActionTypes;