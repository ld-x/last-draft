'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _draftJs = require('draft-js');

var _unionClassNames = require('union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Image = function (_Component) {
  _inherits(Image, _Component);

  function Image() {
    _classCallCheck(this, Image);

    return _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
  }

  _createClass(Image, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          block = _props.block,
          className = _props.className,
          _props$theme = _props.theme,
          theme = _props$theme === undefined ? {} : _props$theme,
          otherProps = _objectWithoutProperties(_props, ['block', 'className', 'theme']);
      // leveraging destructuring to omit certain properties from props


      var blockProps = otherProps.blockProps,
          customStyleMap = otherProps.customStyleMap,
          customStyleFn = otherProps.customStyleFn,
          decorator = otherProps.decorator,
          forceSelection = otherProps.forceSelection,
          offsetKey = otherProps.offsetKey,
          selection = otherProps.selection,
          tree = otherProps.tree,
          elementProps = _objectWithoutProperties(otherProps, ['blockProps', 'customStyleMap', 'customStyleFn', 'decorator', 'forceSelection', 'offsetKey', 'selection', 'tree']);

      var combinedClassName = (0, _unionClassNames2.default)(theme.image, className);

      var _Entity$get$getData = _draftJs.Entity.get(block.getEntityAt(0)).getData(),
          src = _Entity$get$getData.src;

      return _react2.default.createElement('img', _extends({}, elementProps, {
        src: src,
        role: 'presentation',
        className: combinedClassName
      }));
    }
  }]);

  return Image;
}(_react.Component);

exports.default = Image;