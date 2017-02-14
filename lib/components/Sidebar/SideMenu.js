'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  padding: 0;\n  list-style: none;\n  margin: 0;\n'], ['\n  padding: 0;\n  list-style: none;\n  margin: 0;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  position: relative;\n  width: 36px;\n  text-align: center;\n'], ['\n  position: relative;\n  width: 36px;\n  text-align: center;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  transform: ', ';\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  height: 24px;\n  font-size: 0;\n  padding: 0;\n  width: 24px;\n  transition: all 0.3s ease;\n  position: relative;\n  background: none;\n\n  &:before {\n    content: \'\';\n    width: 100%;\n    height: 100%;\n    border-radius: 100%;\n    display: inline-block;\n    background-color: ', ';\n  }\n\n  &:focus {\n    outline: none;\n  }\n'], ['\n  transform: ', ';\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  height: 24px;\n  font-size: 0;\n  padding: 0;\n  width: 24px;\n  transition: all 0.3s ease;\n  position: relative;\n  background: none;\n\n  &:before {\n    content: \'\';\n    width: 100%;\n    height: 100%;\n    border-radius: 100%;\n    display: inline-block;\n    background-color: ', ';\n  }\n\n  &:focus {\n    outline: none;\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icons = require('../Icons/');

var _Icons2 = _interopRequireDefault(_Icons);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
  }

  _createClass(_default, [{
    key: 'render',
    value: function render() {
      var _context;

      return _react2.default.createElement(
        SideMenuWrapper,
        { className: 'ld-sidemenu-wrapper' },
        _react2.default.createElement(
          SideMenu,
          { className: 'ld-sidemenu' },
          _react2.default.createElement(
            SideMenuButton,
            {
              className: 'ld-sidemenu-button',
              onClick: (_context = this.props).openToolbar.bind(_context),
              type: 'button'
            },
            _react2.default.createElement(_Icons2.default.MenuIcon, null)
          )
        )
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;


var SideMenuWrapper = _styledComponents2.default.ul(_templateObject);

var SideMenu = _styledComponents2.default.li(_templateObject2);

var SideMenuButton = _styledComponents2.default.button(_templateObject3, function (props) {
  return props.open ? 'rotate(45deg)' : 'none';
}, function (props) {
  return props.open ? '#f00' : '#181818';
});