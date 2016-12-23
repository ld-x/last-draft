'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  padding: 0;\n  list-style: none;\n  margin: 0;\n'], ['\n  padding: 0;\n  list-style: none;\n  margin: 0;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  position: relative;\n  width: 36px;\n  text-align: center;\n'], ['\n  position: relative;\n  width: 36px;\n  text-align: center;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  transition: max-height 0.5s ease;\n  overflow: hidden;\n  width: 36px;\n  text-align: center;\n'], ['\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  transition: max-height 0.5s ease;\n  overflow: hidden;\n  width: 36px;\n  text-align: center;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  height: 32px;\n  font-size: 0;\n  padding: 0;\n  width: 32px;\n  -webkit-transition: all 0.5s ease;\n  transition: all 0.5s ease;\n  position: relative;\n  background: none;\n\n  &:before {\n    content: \'\';\n    width: 100%;\n    height: 100%;\n    border-radius: 100%;\n    display: inline-block;\n    background-color: #181818;\n  }\n\n  &:focus {\n    outline: 0;\n  }\n'], ['\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  height: 32px;\n  font-size: 0;\n  padding: 0;\n  width: 32px;\n  -webkit-transition: all 0.5s ease;\n  transition: all 0.5s ease;\n  position: relative;\n  background: none;\n\n  &:before {\n    content: \'\';\n    width: 100%;\n    height: 100%;\n    border-radius: 100%;\n    display: inline-block;\n    background-color: #181818;\n  }\n\n  &:focus {\n    outline: 0;\n  }\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  height: 40px;\n  padding-top: 2px;\n  margin: 0;\n'], ['\n  height: 40px;\n  padding-top: 2px;\n  margin: 0;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('setimmediate');

var _icons = require('../icons');

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styled = require('styled-components').default;

var _default = function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this, props));

    _this.state = { open: false };
    return _this;
  }

  _createClass(_default, [{
    key: 'onChange',
    value: function onChange(editorState) {
      this.props.onChange(editorState);
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.setState({ open: !this.state.open });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var open = this.state.open;


      var menuButtonStyle = {
        transform: open ? 'rotate(45deg)' : 'none'
      };

      var menuItemsStyle = {
        maxHeight: open ? '116px' : 0
      };

      return _react2.default.createElement(
        SideMenuWrapper,
        null,
        _react2.default.createElement(
          SideMenu,
          null,
          _react2.default.createElement(
            SideMenuButton,
            {
              onClick: this.toggle.bind(this),
              style: menuButtonStyle,
              type: 'button' },
            _react2.default.createElement(_icons2.default.CrossIcon, null)
          ),
          _react2.default.createElement(
            SideMenuItems,
            { style: menuItemsStyle },
            this.props.plugins.map(function (item) {
              var Button = item.button;
              return _react2.default.createElement(
                SideMenuItem,
                { key: item.type },
                _react2.default.createElement(Button, {
                  uploadImageCallBack: _this2.props.uploadImageCallBack,
                  editorState: _this2.props.editorState,
                  onChange: _this2.onChange.bind(_this2) })
              );
            })
          )
        )
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;


var SideMenuWrapper = styled.ul(_templateObject);

var SideMenu = styled.li(_templateObject2);

var SideMenuItems = styled.ul(_templateObject3);

var SideMenuButton = styled.button(_templateObject4);

var SideMenuItem = styled.li(_templateObject5);