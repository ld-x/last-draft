'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarButton = exports.PluginButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  display: inline-block;\n  margin: 0 !important;\n  color: ', ';\n  &:hover {\n    color: ', ';\n  }\n  &:active {\n    color: ', ';\n  }\n'], ['\n  display: inline-block;\n  margin: 0 !important;\n  color: ', ';\n  &:hover {\n    color: ', ';\n  }\n  &:active {\n    color: ', ';\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  padding: 0;\n  color: inherit;\n  cursor: pointer;\n  border: 0;\n  height: 40px;\n  width: 40px;\n  line-height: 1;\n  background: transparent;\n'], ['\n  padding: 0;\n  color: inherit;\n  cursor: pointer;\n  border: 0;\n  height: 40px;\n  width: 40px;\n  line-height: 1;\n  background: transparent;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Separator = require('./Separator');

var _Separator2 = _interopRequireDefault(_Separator);

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

var PluginButton = exports.PluginButton = function (_Component) {
  _inherits(PluginButton, _Component);

  function PluginButton() {
    _classCallCheck(this, PluginButton);

    return _possibleConstructorReturn(this, (PluginButton.__proto__ || Object.getPrototypeOf(PluginButton)).apply(this, arguments));
  }

  _createClass(PluginButton, [{
    key: 'render',
    value: function render() {
      var _context;

      var Button = this.props.item.icon;
      var theme = this.props.theme;


      return _react2.default.createElement(
        ToolbarButtonWrapper,
        { theme: theme, active: false, className: 'ld-toolbar-button-wrapper' },
        _react2.default.createElement(
          LdToolbarButton,
          { className: 'ld-toolbar-button', type: 'button' },
          _react2.default.createElement(Button, {
            onChange: (_context = this.props).onChange.bind(_context),
            uploadImageCallBack: this.props.uploadImageCallBack,
            uploadFile: this.props.uploadFile,
            editorState: this.props.editorState
          })
        )
      );
    }
  }]);

  return PluginButton;
}(_react.Component);

var ToolbarButton = exports.ToolbarButton = function (_Component2) {
  _inherits(ToolbarButton, _Component2);

  function ToolbarButton() {
    _classCallCheck(this, ToolbarButton);

    return _possibleConstructorReturn(this, (ToolbarButton.__proto__ || Object.getPrototypeOf(ToolbarButton)).apply(this, arguments));
  }

  _createClass(ToolbarButton, [{
    key: 'toggleAction',
    value: function toggleAction(action) {
      if (action.toggle) {
        action.toggle(!action.active);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var Icon = this.props.item.icon;
      var _props = this.props,
          item = _props.item,
          active = _props.active,
          theme = _props.theme,
          separators = _props.separators;


      if (item.type === 'separator') {
        if (!separators) {
          return null;
        }
        return _react2.default.createElement(_Separator2.default, null);
      }

      return _react2.default.createElement(
        ToolbarButtonWrapper,
        { theme: theme, active: active, className: 'ld-toolbar-button-wrapper' },
        _react2.default.createElement(
          LdToolbarButton,
          {
            className: 'ld-toolbar-button',
            onClick: function onClick() {
              return _this3.toggleAction(_this3.props);
            },
            type: 'button'
          },
          _react2.default.createElement(Icon, null)
        )
      );
    }
  }]);

  return ToolbarButton;
}(_react.Component);

var ToolbarButtonWrapper = _styledComponents2.default.li(_templateObject, function (props) {
  return props.active ? props.theme.highlight : props.theme.color;
}, function (props) {
  return props.theme.color;
}, function (props) {
  return props.theme.color;
});

var LdToolbarButton = _styledComponents2.default.button(_templateObject2);