'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  padding: 2px;\n  margin: -2px;\n  position: relative;\n  &:hover {\n    background-color: #eee;\n    border-radius: 2px;\n  }\n'], ['\n  padding: 2px;\n  margin: -2px;\n  position: relative;\n  &:hover {\n    background-color: #eee;\n    border-radius: 2px;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: #fff;\n  border-radius: 3px;\n  border: solid 1px #ddd;\n  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);\n'], ['\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: #fff;\n  border-radius: 3px;\n  border: solid 1px #ddd;\n  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BlockActions = require('./BlockActions');

var _BlockActions2 = _interopRequireDefault(_BlockActions);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _default = function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
  }

  _createClass(_default, [{
    key: 'handleDisplayChange',
    value: function handleDisplayChange(newValue) {
      this.props.container.updateData({ display: newValue });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        BlockWrapper,
        { className: 'ld-block-wrapper' },
        _react2.default.createElement(
          Block,
          { className: 'ld-block' },
          this.props.actions && _react2.default.createElement(_BlockActions2.default, { items: this.props.actions }),
          this.props.children
        )
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;


var BlockWrapper = _styledComponents2.default.div(_templateObject);

var Block = _styledComponents2.default.div(_templateObject2);