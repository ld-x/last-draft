'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  display: inline-block;\n  margin: 0 !important;\n  color: ', ';\n  &:hover {\n    color: #fff;\n  }\n  &:aci {\n    color: #fff;\n  }\n'], ['\n  display: inline-block;\n  margin: 0 !important;\n  color: ', ';\n  &:hover {\n    color: #fff;\n  }\n  &:aci {\n    color: #fff;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  padding: 0;\n  color: inherit;\n  cursor: pointer;\n  border: 0;\n  height: 40px;\n  width: 40px;\n  line-height: 1;\n  background: transparent;\n'], ['\n  padding: 0;\n  color: inherit;\n  cursor: pointer;\n  border: 0;\n  height: 40px;\n  width: 40px;\n  line-height: 1;\n  background: transparent;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Separator = require('./Separator');

var _Separator2 = _interopRequireDefault(_Separator);

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

var styled = require('styled-components').default;

var _default = function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
  }

  _createClass(_default, [{
    key: 'toggleAction',
    value: function toggleAction(action) {
      if (action.toggle) {
        action.toggle(!action.active);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var Icon = this.props.item.icon;
      var _props = this.props,
          item = _props.item,
          active = _props.active;


      if (item.type === 'separator') {
        return _react2.default.createElement(_Separator2.default, null);
      }

      return _react2.default.createElement(
        ToolbarButtonWrapper,
        { active: active, className: 'ld-toolbar-button-wrapper' },
        _react2.default.createElement(
          ToolbarButton,
          {
            className: 'ld-toolbar-button',
            onClick: function onClick() {
              return _this2.toggleAction(_this2.props);
            },
            type: 'button'
          },
          _react2.default.createElement(Icon, null)
        )
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;


var ToolbarButtonWrapper = styled.li(_templateObject, function (props) {
  return props.active ? '#9d1d20' : '#ccc';
});

var ToolbarButton = styled.button(_templateObject2);