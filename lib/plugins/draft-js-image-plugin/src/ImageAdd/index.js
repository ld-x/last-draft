'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles.css');

var _styles2 = _interopRequireDefault(_styles);

var _addImage = require('../modifiers/addImage');

var _addImage2 = _interopRequireDefault(_addImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageAdd = function (_Component) {
  _inherits(ImageAdd, _Component);

  function ImageAdd() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ImageAdd);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ImageAdd.__proto__ || Object.getPrototypeOf(ImageAdd)).call.apply(_ref, [this].concat(args))), _this), _this.addImageFile = function (parseUrl) {
      _this.input.click();
      _this.parseUrl = parseUrl;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ImageAdd, [{
    key: 'onChange',
    value: function onChange(e) {
      var _props = this.props,
          editorState = _props.editorState,
          onChange = _props.onChange;

      var file = e.target.files[0];

      if (this.parseUrl !== undefined) {
        this.parseUrl(file, editorState, onChange);
      } else {
        var url = URL.createObjectURL(file);
        onChange((0, _addImage2.default)(editorState, url));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: _styles2.default.addImage },
        _react2.default.createElement('input', {
          type: 'file',
          ref: function ref(c) {
            _this2.input = c;
          },
          onChange: function onChange(e) {
            return _this2.onChange(e);
          },
          style: { display: 'none' }
        })
      );
    }
  }]);

  return ImageAdd;
}(_react.Component);

exports.default = ImageAdd;