"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n  background: none;\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  height: 32px;\n  font-size: 0;\n  padding: 0;\n  width: 32px;\n  transition: all 0.5s ease;\n  position: relative;\n  background: none;\n  transform: scale(0.9);\n\n  &:hover {\n    transform: scale(1);\n  }\n  &:before {\n    transition: all 0.1s ease-in-out;\n    background-color: #181818;\n    transform: scale(1.125);\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    border-radius: 100%;\n    display: inline-block;\n    background-color: #181818;\n  }\n"], ["\n  background: none;\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  height: 32px;\n  font-size: 0;\n  padding: 0;\n  width: 32px;\n  transition: all 0.5s ease;\n  position: relative;\n  background: none;\n  transform: scale(0.9);\n\n  &:hover {\n    transform: scale(1);\n  }\n  &:before {\n    transition: all 0.1s ease-in-out;\n    background-color: #181818;\n    transform: scale(1.125);\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    border-radius: 100%;\n    display: inline-block;\n    background-color: #181818;\n  }\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _icons = require("../../icons");

var _icons2 = _interopRequireDefault(_icons);

var _insertDataBlock = require("../../insertDataBlock");

var _insertDataBlock2 = _interopRequireDefault(_insertDataBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styled = require('styled-components').default;

var BlockButton = function (_Component) {
  _inherits(BlockButton, _Component);

  function BlockButton(props) {
    _classCallCheck(this, BlockButton);

    return _possibleConstructorReturn(this, (BlockButton.__proto__ || Object.getPrototypeOf(BlockButton)).call(this, props));
  }

  _createClass(BlockButton, [{
    key: "onClick",
    value: function onClick(e) {
      e.preventDefault();
      var src = window.prompt("Enter a URL");
      if (!src) {
        return;
      }

      var data = { src: src, type: "video" };
      this.props.onChange((0, _insertDataBlock2.default)(this.props.editorState, data));
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        VideoButton,
        { type: "button", onClick: this.onClick.bind(this) },
        _react2.default.createElement(_icons2.default.VideoIcon, null)
      );
    }
  }]);

  return BlockButton;
}(_react.Component);

exports.default = BlockButton;


var VideoButton = styled.button(_templateObject);