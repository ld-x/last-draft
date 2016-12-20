"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _plugin = require("../../components/plugin");

var _icons = require("../../icons");

var _icons2 = _interopRequireDefault(_icons);

var _VideoBlockStyle = require("./VideoBlockStyle");

var _VideoBlockStyle2 = _interopRequireDefault(_VideoBlockStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoBlock = function (_Component) {
  _inherits(VideoBlock, _Component);

  function VideoBlock(props) {
    _classCallCheck(this, VideoBlock);

    var _this = _possibleConstructorReturn(this, (VideoBlock.__proto__ || Object.getPrototypeOf(VideoBlock)).call(this, props));

    _this.actions = [{ "key": "delete", "icon": _icons2.default.DeleteIcon, "action": _this.props.container.remove }];
    return _this;
  }

  _createClass(VideoBlock, [{
    key: "handleCaptionChange",
    value: function handleCaptionChange(event) {
      this.props.container.updateData({ caption: event.target.value });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _plugin.CommonBlock,
        _extends({}, this.props, { actions: this.actions }),
        _react2.default.createElement(
          _plugin.BlockContent,
          null,
          _react2.default.createElement("video", { controls: true, style: _VideoBlockStyle2.default.video, src: this.props.data.src, alt: "" })
        ),
        _react2.default.createElement(
          _plugin.BlockData,
          null,
          _react2.default.createElement(_plugin.BlockInput, {
            placeholder: "Caption",
            value: this.props.data.caption,
            onChange: this.handleCaptionChange.bind(this) })
        )
      );
    }
  }]);

  return VideoBlock;
}(_react.Component);

exports.default = VideoBlock;