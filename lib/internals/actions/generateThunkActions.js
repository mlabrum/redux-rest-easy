import generateThunk from '../action-creator/generateThunk';
import generateThunkAction from './generateThunkActions/generateThunkAction';
import generateThunkActionTypes from './generateThunkActions/generateThunkActionTypes';

var generateThunkActions = function generateThunkActions(resourceName, cacheLifetime, actionsConfig, actionName) {
  var _ref;

  var _generateThunkActionT = generateThunkActionTypes(resourceName),
      INVALIDATE_REQUEST = _generateThunkActionT.INVALIDATE_REQUEST;

  return _ref = {}, _ref[actionName] = {
    perform: generateThunk(resourceName, cacheLifetime, actionsConfig, actionName),
    invalidate: generateThunkAction(INVALIDATE_REQUEST, resourceName)
  }, _ref;
};

export default generateThunkActions;