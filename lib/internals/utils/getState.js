/* eslint-disable no-console */

var getState = function getState(state) {
  if (!state || !state.restEasy) {
    console.error("\n      There doesn't seem to be a \"restEasy\" key in your state.\n\n      For more information, browse the related documentation: https://github.com/Brigad/redux-rest-easy/blob/master/docs/api/reducer.md#reducer\n    ");
    return null;
  }

  return state.restEasy;
};

export default getState;