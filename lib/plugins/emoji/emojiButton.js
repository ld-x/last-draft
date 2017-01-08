'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  background: none;\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  height: 24px;\n  font-size: 0;\n  padding: 0;\n  width: 24px;\n  transition: all 0.5s ease;\n  position: relative;\n  background: none;\n\n  &:before {\n    transition: all 0.1s ease-in-out;\n    background-color: #181818;\n    content: \'\';\n    width: 100%;\n    height: 100%;\n    border-radius: 100%;\n    display: inline-block;\n    background-color: #181818;\n  }\n  &:focus {\n    outline: none;\n  }\n'], ['\n  background: none;\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  height: 24px;\n  font-size: 0;\n  padding: 0;\n  width: 24px;\n  transition: all 0.5s ease;\n  position: relative;\n  background: none;\n\n  &:before {\n    transition: all 0.1s ease-in-out;\n    background-color: #181818;\n    content: \'\';\n    width: 100%;\n    height: 100%;\n    border-radius: 100%;\n    display: inline-block;\n    background-color: #181818;\n  }\n  &:focus {\n    outline: none;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  position: absolute;\n  left: 2.5rem;\n  margin-top: -2.4rem;\n  display: flex;\n  flex-wrap: wrap;\n  width: 330px;\n  border: 1px solid #F1F1F1;\n  padding: 15px;\n  border-radius: 2px;\n  z-index: 100;\n  background: white;\n  box-shadow: 3px 3px 5px #BFBDBD;\n'], ['\n  position: absolute;\n  left: 2.5rem;\n  margin-top: -2.4rem;\n  display: flex;\n  flex-wrap: wrap;\n  width: 330px;\n  border: 1px solid #F1F1F1;\n  padding: 15px;\n  border-radius: 2px;\n  z-index: 100;\n  background: white;\n  box-shadow: 3px 3px 5px #BFBDBD;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  margin: 2.5px;\n  height: 24px;\n  width: 24px;\n  cursor: pointer;\n  font-size: 22px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n'], ['\n  margin: 2.5px;\n  height: 24px;\n  width: 24px;\n  cursor: pointer;\n  font-size: 22px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  cursor: pointer;\n  position: absolute;\n  right: 0;\n  top: 0;\n  transform: scale(0.8);\n'], ['\n  cursor: pointer;\n  position: absolute;\n  right: 0;\n  top: 0;\n  transform: scale(0.8);\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  position: absolute;\n  transform: scale(0.7);\n  top: 0;\n  left: 0;\n'], ['\n  position: absolute;\n  transform: scale(0.7);\n  top: 0;\n  left: 0;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Buttons = require('../../components/Buttons/');

var _Buttons2 = _interopRequireDefault(_Buttons);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styled = require('styled-components').default;

var EMOJIS = ['😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓', '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈', '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃', '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕', '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥', '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸', '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈', '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅', '✅', '❎', '💯'];

var _default = function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this, props));

    _this.state = { showModal: false };
    return _this;
  }

  _createClass(_default, [{
    key: 'addEmoji',
    value: function addEmoji(e) {
      var _props = this.props,
          editorState = _props.editorState,
          onChange = _props.onChange,
          uploadImageCallBack = _props.uploadImageCallBack;


      var contentState = _draftJs.Modifier.insertText(editorState.getCurrentContent(), editorState.getSelection(), '' + e.target.innerHTML, editorState.getCurrentInlineStyle());
      onChange(_draftJs.EditorState.push(editorState, contentState, 'insert-characters'));
      this.setState({ showModal: false });
    }
  }, {
    key: 'renderEmojiModal',
    value: function renderEmojiModal() {
      var _this2 = this;

      return _react2.default.createElement(
        EmojiModal,
        { onClick: this.stopPropagation, className: 'ld-emoji-modal' },
        _react2.default.createElement(
          EmojiCloseIcon,
          { onClick: this.onCloseButtonClick.bind(this), className: 'ld-emoji-close-icon' },
          _react2.default.createElement(_Buttons2.default.CloseIcon, null)
        ),
        EMOJIS.map(function (emoji, index) {
          return _react2.default.createElement(
            Emoji,
            {
              className: 'ld-emoji',
              key: index,
              role: 'presentation',
              onClick: _this2.addEmoji.bind(_this2)
            },
            emoji
          );
        })
      );
    }
  }, {
    key: 'onEmojiButtonClick',
    value: function onEmojiButtonClick(e) {
      e.preventDefault();
      this.setState({ showModal: true });
    }
  }, {
    key: 'onCloseButtonClick',
    value: function onCloseButtonClick(e) {
      e.preventDefault();
      this.setState({ showModal: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var showModal = this.state.showModal;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          EmojiButton,
          { type: 'button', onClick: this.onEmojiButtonClick.bind(this), className: 'ld-emoji-block-button' },
          _react2.default.createElement(
            EmojiIcon,
            { height: '24', viewBox: '0 0 24 24', width: '24', className: 'ld-button-emoji' },
            _react2.default.createElement('path', { d: 'M0 0h24v24H0z' }),
            _react2.default.createElement('path', { d: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z', fill: 'currentColor' })
          )
        ),
        showModal ? this.renderEmojiModal() : undefined
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;


var EmojiButton = styled.button(_templateObject);

var EmojiModal = styled.div(_templateObject2);

var Emoji = styled.span(_templateObject3);

var EmojiCloseIcon = styled.span(_templateObject4);

var EmojiIcon = styled.svg(_templateObject5);