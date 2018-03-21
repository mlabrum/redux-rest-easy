import generateActionType from '../../utils/generateActionType';

var generateResourceActionTypes = function generateResourceActionTypes(resourceName) {
  return {
    INVALIDATE_RESOURCE: generateActionType(resourceName, '@invalidate', 'INVALIDATE_RESOURCE'),
    INVALIDATE_ID: generateActionType(resourceName, '@invalidate', 'INVALIDATE_ID'),
    RESET_RESOURCE: generateActionType(resourceName, '@reset', 'RESET_RESOURCE')
  };
};

export default generateResourceActionTypes;