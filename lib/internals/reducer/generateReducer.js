import getInfosFromActionType from '../utils/getInfosFromActionType';
import getReducerCases from './generateReducer/getReducerCases';

var DEFAULT_INITIAL_STATE = {};
var REDUCER_CASES = getReducerCases();

var generateReducer = function generateReducer() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_INITIAL_STATE;
  return function (state) {
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (state === undefined) {
      return initialState;
    }

    if (!action.type || !action.type.startsWith('@@rest-easy')) {
      return state;
    }

    var currentCase = REDUCER_CASES[getInfosFromActionType(action.type).caseName];

    if (!currentCase) {
      return state;
    }

    return currentCase(state, action);
  };
};

export default generateReducer;