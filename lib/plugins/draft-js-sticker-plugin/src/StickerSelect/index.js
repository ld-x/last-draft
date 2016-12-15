'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StickerOption = require('./StickerOption');

var _StickerOption2 = _interopRequireDefault(_StickerOption);

var _addSticker = require('../modifiers/addSticker');

var _addSticker2 = _interopRequireDefault(_addSticker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sets the CSS overflow value to newValue
 * Use like this: setOverflow('auto', document.body);
 */
function setOverflow(newValue, element) {
  element.style.overflow = newValue; // eslint-disable-line no-param-reassign
}

/**
 * Sticker Selector Component
 */

var StickerSelect = function (_Component) {
  _inherits(StickerSelect, _Component);

  function StickerSelect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, StickerSelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = StickerSelect.__proto__ || Object.getPrototypeOf(StickerSelect)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false
    }, _this.onMouseEnter = function () {
      setOverflow('hidden', document.body);
    }, _this.onMouseLeave = function () {
      setOverflow('auto', document.body);
    }, _this.openPopover = function () {
      if (!_this.state.open) {
        _this.preventNextClose = true;
        _this.setState({
          open: true
        });
      }
    }, _this.closePopover = function () {
      if (!_this.preventNextClose && _this.state.open) {
        _this.setState({
          open: false
        });
      }

      _this.preventNextClose = false;
    }, _this.add = function (id) {
      var editor = _this.props.editor;

      editor.onChange((0, _addSticker2.default)(editor.state.editorState, id));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // Start the selector closed


  _createClass(StickerSelect, [{
    key: 'componentDidMount',


    // When the selector is open and users click anywhere on the page,
    // the selector should close
    value: function componentDidMount() {
      document.addEventListener('click', this.closePopover);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.closePopover);
    }

    // When users are scrolling the popover, the page shouldn't scroll when
    // they reach the end of it


    // Open the popover


    // Close the popover


    // Add a sticker to the editor

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // Create the sticker selection elements
      var stickerElements = this.props.stickers.get('data').map(function (sticker) {
        var id = sticker.get('id');
        var url = sticker.get('url');
        return _react2.default.createElement(_StickerOption2.default, {
          theme: _this2.props.theme,
          key: id,
          onClick: _this2.add,
          id: id,
          url: url
        });
      });

      var _props$theme = this.props.theme,
          theme = _props$theme === undefined ? {} : _props$theme;

      var popoverClassName = this.state.open ? theme.selectPopover : theme.selectClosedPopover;
      var buttonClassName = this.state.open ? theme.selectPressedButton : theme.selectButton;

      return _react2.default.createElement(
        'div',
        { className: theme.select },
        _react2.default.createElement(
          'button',
          {
            className: buttonClassName,
            onMouseUp: this.openPopover,
            type: 'button'
          },
          this.props.selectButtonContent
        ),
        _react2.default.createElement(
          'div',
          {
            className: popoverClassName,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave
          },
          _react2.default.createElement(
            'div',
            { className: theme.selectStickerList },
            stickerElements.toList().toJS()
          ),
          _react2.default.createElement('div', { className: theme.selectBottomGradient })
        )
      );
    }
  }]);

  return StickerSelect;
}(_react.Component);

exports.default = StickerSelect;