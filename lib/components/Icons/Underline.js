'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
  }

  _createClass(_default, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'svg',
        { width: '24', height: '24', viewBox: '0 0 24 24', className: 'ld-button-underline' },
        _react2.default.createElement('path', { d: 'M18.2,4.9V14c0,1-0.2,2-0.7,2.7s-1.1,1.4-2,1.8c-0.9,0.4-1.9,0.6-3.1,0.6c-1.8,0-3.2-0.5-4.2-1.4c-1-0.9-1.5-2.2-1.5-3.8 V4.9h3v8.6c0,1.1,0.2,1.9,0.7,2.4s1.2,0.8,2.2,0.8c1,0,1.7-0.3,2.1-0.8c0.4-0.5,0.7-1.3,0.7-2.4V4.9H18.2z', fill: 'currentColor', fillRule: 'evenodd' }),
        _react2.default.createElement('path', { d: 'M4.9,21v-1h14.9v1H4.9z', fill: 'currentColor', fillRule: 'evenodd' })
      );
    }
  }]);

  return _default;
}(_react2.default.Component);

exports.default = _default;