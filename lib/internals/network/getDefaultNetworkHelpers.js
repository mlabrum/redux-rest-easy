var _this6 = this;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var DEFAULT_NETWORK_HELPERS = {
  getToken: function getToken() {
    return 'token';
  },
  requestGET: function requestGET() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var token;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.resolve(_this.getToken && _this.getToken());

            case 2:
              token = _context.sent;
              return _context.abrupt('return', {
                method: 'GET',
                headers: _extends({
                  Accept: 'application/json'
                }, token ? { Authorization: 'Bearer ' + token } : {})
              });

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  requestPATCH: function requestPATCH(body) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var token;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Promise.resolve(_this2.getToken && _this2.getToken());

            case 2:
              token = _context2.sent;
              return _context2.abrupt('return', {
                method: 'PATCH',
                headers: _extends({
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                }, token ? { Authorization: 'Bearer ' + token } : {}),
                body: JSON.stringify(body)
              });

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  },
  requestPUT: function requestPUT(body) {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var token;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Promise.resolve(_this3.getToken && _this3.getToken());

            case 2:
              token = _context3.sent;
              return _context3.abrupt('return', {
                method: 'PUT',
                headers: _extends({
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                }, token ? { Authorization: 'Bearer ' + token } : {}),
                body: JSON.stringify(body)
              });

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3);
    }))();
  },
  requestPOST: function requestPOST(body) {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var token;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return Promise.resolve(_this4.getToken && _this4.getToken());

            case 2:
              token = _context4.sent;
              return _context4.abrupt('return', {
                method: 'POST',
                headers: _extends({
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                }, token ? { Authorization: 'Bearer ' + token } : {}),
                body: JSON.stringify(body)
              });

            case 4:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this4);
    }))();
  },
  requestDELETE: function requestDELETE() {
    var _this5 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var token;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return Promise.resolve(_this5.getToken && _this5.getToken());

            case 2:
              token = _context5.sent;
              return _context5.abrupt('return', {
                method: 'DELETE',
                headers: _extends({
                  Accept: 'application/json'
                }, _this5.getToken && _this5.getToken() ? { Authorization: 'Bearer ' + token } : {})
              });

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this5);
    }))();
  },

  handleStatusCode: function handleStatusCode(response) {
    if (response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }

      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }

    return null;
  },
  // eslint-disable-next-line no-unused-vars
  handleError: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(err, dispatch) {
      var error;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;

              if (!(err && err.response)) {
                _context6.next = 8;
                break;
              }

              _context6.next = 4;
              return err.response.json();

            case 4:
              error = _context6.sent;


              // dispatch some action to warn the user about the error

              // eslint-disable-next-line no-console
              console.error(error);
              _context6.next = 9;
              break;

            case 8:
              // eslint-disable-next-line no-console
              console.error(err);

            case 9:
              _context6.next = 14;
              break;

            case 11:
              _context6.prev = 11;
              _context6.t0 = _context6['catch'](0);

              // eslint-disable-next-line no-console
              console.error(_context6.t0);

            case 14:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this6, [[0, 11]]);
    }));

    return function handleError(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
};

var getDefaultNetworkHelpers = function getDefaultNetworkHelpers() {
  return DEFAULT_NETWORK_HELPERS;
};

export default getDefaultNetworkHelpers;