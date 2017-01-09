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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

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
        { width: '24', height: '24', viewBox: '0 0 24 24', className: 'ld-button-unlink' },
        _react2.default.createElement(
          'g',
          { fill: 'currentColor', fillRule: 'evenodd' },
          _react2.default.createElement('path', { d: 'M15.027 11l.974.972V11z' }),
          _react2.default.createElement('path', { d: 'M22 12c0-2.754-2.24-5-5-5h-4v2h4c1.71-.095 3.1 1.3 3 3 .1 1.121-.484 2.087-1 3l1 1a5 5 0 0 0 2-4M7 7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2H7c-1.71.1-3.1-1.291-3-3-.1-1.71 1.29-3.1 3-3h3L8 7H7zM13 15.099v1.9h4c.37 0 .729-.046 1.076-.123l-1.777-1.777H13z' }),
          _react2.default.createElement('path', { d: 'M8 11v2h8v-2z' }),
          _react2.default.createElement('path', { d: 'M4.269 3l-1.27 1.27 12.658 12.657-.117-.107L19.73 21l1.269-1.27z' })
        )
      );
    }
  }]);

  return _default;
}(_react2.default.Component);

exports.default = _default;