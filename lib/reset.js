import generateGlobalActions from './internals/actions/generateGlobalActions';

var reset = function reset() {
  var _generateGlobalAction = generateGlobalActions(),
      resetAll = _generateGlobalAction.resetAll;

  return resetAll();
};

export default reset;