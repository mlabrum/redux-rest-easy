import { createSelectorCreator } from 'reselect';

var RERESELECTOPTIONS = {
  selectorCreator: createSelectorCreator(function (func) {
    var lastResult = null;

    return function () {
      if (!lastResult) {
        lastResult = func.apply(undefined, arguments);
      }

      return lastResult;
    };
  })
};

var getReReselectOptions = function getReReselectOptions() {
  return RERESELECTOPTIONS;
};

export default getReReselectOptions;