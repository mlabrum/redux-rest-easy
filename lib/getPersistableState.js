import getPrunedForPersistenceState from './internals/persistence/getPrunedForPersistenceState';

var getPersistableState = function getPersistableState(state) {
  return getPrunedForPersistenceState(state);
};

export default getPersistableState;