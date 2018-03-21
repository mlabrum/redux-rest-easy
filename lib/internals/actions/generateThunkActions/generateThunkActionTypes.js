import generateActionType from '../../utils/generateActionType';

var generateThunkActionTypes = function generateThunkActionTypes(resourceName) {
  return {
    INVALIDATE_REQUEST: generateActionType(resourceName, '@invalidate', 'INVALIDATE_REQUEST')
  };
};

export default generateThunkActionTypes;