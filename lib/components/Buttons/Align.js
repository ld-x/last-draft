'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlignRight = exports.AlignCenter = exports.AlignLeft = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AlignLeft = exports.AlignLeft = function (_React$Component) {
  _inherits(AlignLeft, _React$Component);

  function AlignLeft() {
    _classCallCheck(this, AlignLeft);

    return _possibleConstructorReturn(this, (AlignLeft.__proto__ || Object.getPrototypeOf(AlignLeft)).apply(this, arguments));
  }

  _createClass(AlignLeft, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'svg',
        { height: '24', viewBox: '0 0 24 24', width: '24' },
        _react2.default.createElement('path', { d: 'M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z', fill: 'currentColor' })
      );
    }
  }]);

  return AlignLeft;
}(_react2.default.Component);

var AlignCenter = exports.AlignCenter = function (_React$Component2) {
  _inherits(AlignCenter, _React$Component2);

  function AlignCenter() {
    _classCallCheck(this, AlignCenter);

    return _possibleConstructorReturn(this, (AlignCenter.__proto__ || Object.getPrototypeOf(AlignCenter)).apply(this, arguments));
  }

  _createClass(AlignCenter, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'svg',
        { height: '24', viewBox: '0 0 24 24', width: '24' },
        _react2.default.createElement('path', { d: 'M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z', fill: 'currentColor' })
      );
    }
  }]);

  return AlignCenter;
}(_react2.default.Component);

var AlignRight = exports.AlignRight = function (_React$Component3) {
  _inherits(AlignRight, _React$Component3);

  function AlignRight() {
    _classCallCheck(this, AlignRight);

    return _possibleConstructorReturn(this, (AlignRight.__proto__ || Object.getPrototypeOf(AlignRight)).apply(this, arguments));
  }

  _createClass(AlignRight, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'svg',
        { height: '24', viewBox: '0 0 24 24', width: '24' },
        _react2.default.createElement('path', { d: 'M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z', fill: 'currentColor' })
      );
    }
  }]);

  return AlignRight;
}(_react2.default.Component);