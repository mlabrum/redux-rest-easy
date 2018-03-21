/* eslint-disable no-underscore-dangle, no-console */

var getNormalizedURLFromOwnProps = function getNormalizedURLFromOwnProps(resourceName, actionName, ownProps) {
  if (!ownProps) {
    console.error('You may have forgotten to pass ownProps to a selector related to ' + resourceName + '.' + actionName + '\n\nFor more information, browse the related documentation: https://github.com/Brigad/redux-rest-easy/blob/master/docs/api/createResource/selectors.md#actionrequest');
    return '';
  }

  if (!ownProps.__requestURLsByActionKey) {
    console.error('You may have forgotten to use redux-rest-easy\'s connect on a Component which requested ' + resourceName + '.' + actionName + '\n\nFor more information, browse the related documentation: https://github.com/Brigad/redux-rest-easy/blob/master/docs/api/connect.md#connectconnectargs');
    return '';
  }

  return ownProps.__requestURLsByActionKey[actionName];
};

export default getNormalizedURLFromOwnProps;