import generateActionCreatorAction from './generateActionCreatorActions/generateActionCreatorAction';
import generateActionCreatorActionTypes from './generateActionCreatorActions/generateActionCreatorActionTypes';

var generateActionCreatorActions = function generateActionCreatorActions(resourceName, actionName, cacheLifetime) {
  var _generateActionCreato = generateActionCreatorActionTypes(resourceName, actionName),
      REQUEST = _generateActionCreato.REQUEST,
      RECEIVE = _generateActionCreato.RECEIVE,
      FAIL = _generateActionCreato.FAIL,
      RECEIVE_FROM_CACHE = _generateActionCreato.RECEIVE_FROM_CACHE;

  return {
    REQUEST: generateActionCreatorAction(cacheLifetime, REQUEST),
    RECEIVE: generateActionCreatorAction(cacheLifetime, RECEIVE),
    FAIL: generateActionCreatorAction(cacheLifetime, FAIL),
    RECEIVE_FROM_CACHE: generateActionCreatorAction(cacheLifetime, RECEIVE_FROM_CACHE)
  };
};

export default generateActionCreatorActions;