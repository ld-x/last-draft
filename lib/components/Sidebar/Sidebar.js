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

require('setimmediate');

var _selection = require('../../utils/selection');

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

  function _default(props) {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this, props));

    _this.state = { top: 0 };
    return _this;
  }

  _createClass(_default, [{
    key: 'getValidSidebarPlugins',
    value: function getValidSidebarPlugins() {
      var plugins = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var plugin = _step.value;

          if (!plugin.button || typeof plugin.button !== 'function') {
            continue;
          }
          plugins.push(plugin);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return plugins;
    }
  }, {
    key: 'onChange',
    value: function onChange(editorState) {
      this.props.onChange(editorState);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this2 = this;

      if (this.updatingPosition) {
        clearImmediate(this.updatingPosition);
      }
      this.updatingPosition = null;
      this.updatingPosition = setImmediate(function () {
        return _this2.setBarPosition();
      });
    }
  }, {
    key: 'setBarPosition',
    value: function setBarPosition() {
      var container = _reactDom2.default.findDOMNode(this.refs.container);
      var element = (0, _selection.getSelectedBlockElement)();
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
            uploadImageCallBack: this.props.uploadImageCallBack,
            uploadFile: this.props.uploadFile,
            editorState: this.props.editorState,
            onChange: this.onChange.bind(this),
            plugins: this.getValidSidebarPlugins() })
        )
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;


var Sidebar = styled.div(_templateObject);

var SidebarMenuWrapper = styled.div(_templateObject2);