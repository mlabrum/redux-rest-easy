var _this = this;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import getRestEasyState from '../../utils/getState';
import safeCall from '../../utils/safeCall';

import { getNetworkHelpers } from '../../network/networkHelpers';

var generateActionCreator = function generateActionCreator(actionName, actionCreatorActions, method, beforeHook, normalizer, afterHook, networkHelpers) {
  return function (formattedURL, normalizedURL, resourceId) {
    return function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _ref$query = _ref.query,
          query = _ref$query === undefined ? {} : _ref$query,
          _ref$body = _ref.body,
          body = _ref$body === undefined ? {} : _ref$body,
          _ref$urlParams = _ref.urlParams,
          urlParams = _ref$urlParams === undefined ? {} : _ref$urlParams,
          onSuccess = _ref.onSuccess,
          onError = _ref.onError,
          otherArgs = _objectWithoutProperties(_ref, ['query', 'body', 'urlParams', 'onSuccess', 'onError']);

      return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
          var combinedNetworkHelpers, beforeHookReturn, finalBody, res, data, _ref3, normalizedPayload, principalResourceIds, principalResourceIdsArray;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  combinedNetworkHelpers = _extends({}, getNetworkHelpers(), networkHelpers || {});


                  dispatch(actionCreatorActions.REQUEST(normalizedURL, resourceId));

                  _context.prev = 2;
                  _context.next = 5;
                  return safeCall(beforeHook, urlParams, query, body, otherArgs, dispatch);

                case 5:
                  beforeHookReturn = _context.sent;
                  finalBody = beforeHookReturn || body;
                  _context.t0 = fetch;
                  _context.t1 = formattedURL;
                  _context.next = 11;
                  return Promise.resolve(combinedNetworkHelpers['request' + method](finalBody));

                case 11:
                  _context.t2 = _context.sent;
                  _context.next = 14;
                  return (0, _context.t0)(_context.t1, _context.t2);

                case 14:
                  res = _context.sent;

                  combinedNetworkHelpers.handleStatusCode(res);

                  if (!(res.status !== 204)) {
                    _context.next = 22;
                    break;
                  }

                  _context.next = 19;
                  return res.json();

                case 19:
                  _context.t3 = _context.sent;
                  _context.next = 23;
                  break;

                case 22:
                  _context.t3 = {};

                case 23:
                  data = _context.t3;
                  _ref3 = normalizer ? normalizer(data, getRestEasyState(getState()).resources, urlParams, query, finalBody, otherArgs) : { entities: data }, normalizedPayload = _ref3.entities, principalResourceIds = _ref3.result;
                  principalResourceIdsArray = Array.isArray(principalResourceIds) ? principalResourceIds : [principalResourceIds];


                  dispatch(actionCreatorActions.RECEIVE(normalizedURL, resourceId, normalizedPayload, principalResourceIdsArray));

                  _context.next = 29;
                  return safeCall(afterHook, normalizedPayload || {}, urlParams, query, finalBody, otherArgs, dispatch);

                case 29:
                  safeCall(onSuccess, normalizedPayload || {}, otherArgs);
                  return _context.abrupt('return', { normalizedPayload: normalizedPayload || {}, otherArgs: otherArgs });

                case 33:
                  _context.prev = 33;
                  _context.t4 = _context['catch'](2);

                  dispatch(actionCreatorActions.FAIL(normalizedURL, resourceId));

                  combinedNetworkHelpers.handleError(_context.t4, dispatch);
                  safeCall(onError, _context.t4);
                  return _context.abrupt('return', { error: _context.t4 });

                case 39:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this, [[2, 33]]);
        }));

        return function (_x2, _x3) {
          return _ref2.apply(this, arguments);
        };
      }();
    };
  };
};

export default generateActionCreator;