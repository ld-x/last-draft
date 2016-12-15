'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _unionClassNames = require('union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _linkifyIt = require('linkify-it');

var _linkifyIt2 = _interopRequireDefault(_linkifyIt);

var _tlds = require('tlds');

var _tlds2 = _interopRequireDefault(_tlds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var linkify = (0, _linkifyIt2.default)();
linkify.tlds(_tlds2.default);

// The component we render when we encounter a hyperlink in the text

var Link = function (_Component) {
  _inherits(Link, _Component);

  function Link() {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).apply(this, arguments));
  }

  _createClass(Link, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$decoratedText = _props.decoratedText,
          decoratedText = _props$decoratedText === undefined ? '' : _props$decoratedText,
          _props$theme = _props.theme,
          theme = _props$theme === undefined ? {} : _props$theme,
          _props$target = _props.target,
          target = _props$target === undefined ? '_self' : _props$target,
          className = _props.className,
          component = _props.component,
          dir = _props.dir,
          entityKey = _props.entityKey,
          getEditorState = _props.getEditorState,
          offsetKey = _props.offsetKey,
          setEditorState = _props.setEditorState,
          otherProps = _objectWithoutProperties(_props, ['decoratedText', 'theme', 'target', 'className', 'component', 'dir', 'entityKey', 'getEditorState', 'offsetKey', 'setEditorState']);

      var combinedClassName = (0, _unionClassNames2.default)(theme.link, className);
      var links = linkify.match(decoratedText);
      var href = links && links[0] ? links[0].url : '';

      var props = _extends({}, otherProps, {
        href: href,
        target: target,
        className: combinedClassName
      });

      return component ? _react2.default.createElement(component, props) : _react2.default.createElement('a', props); // eslint-disable-line jsx-a11y/anchor-has-content
    }
  }]);

  return Link;
}(_react.Component);

exports.default = Link;