var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable import/no-unresolved, import/extensions */
import React from 'react';
import { connect } from 'react-redux';
/* eslint-enable import/no-unresolved, import/extensions */

/* eslint-disable no-underscore-dangle */

var getDisplayName = function getDisplayName(name) {
  return 'EasyConnect(' + name + ')';
};

var easyConnect = function easyConnect(injectProps) {
  return function (mapStateToProps, mapDispatchToProps) {
    for (var _len = arguments.length, otherArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      otherArgs[_key - 2] = arguments[_key];
    }

    var modifiedMapDispatchToProps = mapDispatchToProps && typeof mapDispatchToProps === 'function' ? function () {
      var dispatchedProps = mapDispatchToProps.apply(undefined, arguments);

      return Object.keys(dispatchedProps).reduce(function (prev, key) {
        var _extends2;

        return _extends({}, prev, (_extends2 = {}, _extends2[key] = function () {
          var promise = dispatchedProps[key].apply(dispatchedProps, arguments);

          if (promise && promise.__actionName && promise.__requestURL) {
            injectProps(promise.__actionName, promise.__requestURL);

            delete promise.__actionName;
            delete promise.__requestURL;
          }

          return promise;
        }, _extends2));
      }, {});
    } : mapDispatchToProps;

    return connect.apply(undefined, [mapStateToProps, modifiedMapDispatchToProps].concat(otherArgs));
  };
};

export default (function () {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return function (WrappedComponent) {
    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    var EasyConnect = function (_React$Component) {
      _inherits(EasyConnect, _React$Component);

      function EasyConnect(props) {
        _classCallCheck(this, EasyConnect);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.onInjectProps = function (actionName, requestURL) {
          _this.setState(function (prevState) {
            var _extends3;

            return prevState.__requestURLsByActionKey[actionName] !== requestURL ? {
              __requestURLsByActionKey: _extends({}, prevState.__requestURLsByActionKey, (_extends3 = {}, _extends3[actionName] = requestURL, _extends3))
            } : null;
          });
        };

        _this.getWrappedInstance = function () {
          return _this.innerRef && _this.innerRef.getWrappedInstance ? _this.innerRef.getWrappedInstance() : null;
        };

        _this.state = {
          __requestURLsByActionKey: {}
        };

        _this.ConnectedComponent = easyConnect(_this.onInjectProps).apply(undefined, args)(WrappedComponent);
        return _this;
      }

      EasyConnect.prototype.render = function render() {
        var _this2 = this;

        var ConnectedComponent = this.ConnectedComponent;

        var passedProps = _extends({}, this.props, this.state);

        return React.createElement(ConnectedComponent, _extends({
          ref: function ref(_ref) {
            _this2.innerRef = _ref;
          }
        }, passedProps));
      };

      return EasyConnect;
    }(React.Component);

    EasyConnect.displayName = getDisplayName(wrappedComponentName);

    return EasyConnect;
  };
});