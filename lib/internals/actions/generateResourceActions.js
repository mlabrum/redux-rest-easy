import generateResourceAction from './generateResourceActions/generateResourceAction';
import generateResourceActionTypes from './generateResourceActions/generateResourceActionTypes';

var generateResourceActions = function generateResourceActions(resourceName) {
  var _generateResourceActi = generateResourceActionTypes(resourceName),
      INVALIDATE_RESOURCE = _generateResourceActi.INVALIDATE_RESOURCE,
      INVALIDATE_ID = _generateResourceActi.INVALIDATE_ID,
      RESET_RESOURCE = _generateResourceActi.RESET_RESOURCE;

  return {
    resource: {
      invalidate: generateResourceAction(INVALIDATE_RESOURCE, resourceName),
      invalidateId: generateResourceAction(INVALIDATE_ID, resourceName),
      reset: generateResourceAction(RESET_RESOURCE, resourceName)
    }
  };
};

export default generateResourceActions;