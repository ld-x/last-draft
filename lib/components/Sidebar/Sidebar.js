'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  position: relative;\n'], ['\n  position: relative;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  float: left;\n  left: -44px;\n  position: absolute;\n'], ['\n  float: left;\n  left: -44px;\n  position: absolute;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SideMenu = require('./SideMenu');

var _SideMenu2 = _interopRequireDefault(_SideMenu);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _selection = require('../../utils/selection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this, props));

    _this.state = { top: 0 };
    return _this;
  }

  _createClass(_default, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.setBarPosition();
    }
  }, {
    key: 'setBarPosition',
    value: function setBarPosition() {
      var container = _reactDom2.default.findDOMNode(this.refs.container);
      var element = (0, _selection.getSelectedBlockElement)(this.props.editorState);
      if (!element || !container) {
        return;
      }

      var containerTop = container.getBoundingClientRect().top - document.documentElement.clientTop;
      var top = element.getBoundingClientRect().top - 4 - containerTop;
      top = Math.max(0, Math.floor(top));

      if (this.state.top !== top) {
        this.setState({ top: top });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _context;

      if (this.props.readOnly) {
        return null;
      }
      return _react2.default.createElement(
        Sidebar,
        { ref: 'container', className: 'ld-sidebar' },
        _react2.default.createElement(
          SidebarMenuWrapper,
          { style: { top: this.state.top + 'px' }, className: 'ld-sidebar-menu-wrapper' },
          _react2.default.createElement(_SideMenu2.default, {
            openToolbar: (_context = this.props).openToolbar.bind(_context),
            editorState: this.props.editorState,
            onChange: (_context = this.props).onChange.bind(_context) })
        )
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;


var Sidebar = _styledComponents2.default.div(_templateObject);

var SidebarMenuWrapper = _styledComponents2.default.div(_templateObject2);