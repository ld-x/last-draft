'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  display: inline-block;\n  maxWidth: 100%;\n  verticalAlign: middle;\n'], ['\n  display: inline-block;\n  maxWidth: 100%;\n  verticalAlign: middle;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: flex;\n'], ['\n  display: flex;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _BlockContent = require('../block/BlockContent');

var _BlockContent2 = _interopRequireDefault(_BlockContent);

var _BlockInput = require('../block/BlockInput');

var _BlockInput2 = _interopRequireDefault(_BlockInput);

var _Block = require('../block/Block');

var _Block2 = _interopRequireDefault(_Block);

var _Buttons = require('../../components/Buttons/');

var _Buttons2 = _interopRequireDefault(_Buttons);

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

var ImageBlock = function (_Component) {
  _inherits(ImageBlock, _Component);

  _createClass(ImageBlock, null, [{
    key: 'defaultProps',
    get: function get() {
      return {
        showImageAttributes: false
      };
    }
  }]);

  function ImageBlock(props) {
    _classCallCheck(this, ImageBlock);

    var _this = _possibleConstructorReturn(this, (ImageBlock.__proto__ || Object.getPrototypeOf(ImageBlock)).call(this, props));

    _this.actions = [{
      key: 'delete',
      icon: _Buttons2.default.CloseIcon,
      action: _this.props.container.remove
    }];
    return _this;
  }

  _createClass(ImageBlock, [{
    key: 'handleCaptionChange',
    value: function handleCaptionChange(event) {
      event.stopPropagation();
      this.props.container.updateData({ caption: event.target.value });
    }
  }, {
    key: 'handleAltChange',
    value: function handleAltChange(event) {
      event.stopPropagation();
      this.props.container.updateData({ alt: event.target.value });
    }
  }, {
    key: 'handleTitleChange',
    value: function handleTitleChange(event) {
      event.stopPropagation();
      this.props.container.updateData({ title: event.target.value });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _Block2.default,
        _extends({}, this.props, { actions: this.actions }),
        _react2.default.createElement(
          _BlockContent2.default,
          null,
          _react2.default.createElement(Image, {
            src: this.props.data.src,
            srcSet: this.props.data.srcSet,
            alt: this.props.data.alt,
            title: this.props.data.title,
            className: 'ld-image-block' })
        ),
        _react2.default.createElement(_BlockInput2.default, {
          placeholder: 'Caption',
          value: this.props.data.caption,
          onChange: this.handleCaptionChange.bind(this) }),
        this.props.showImageAttributes && _react2.default.createElement(
          InputWrap,
          null,
          _react2.default.createElement(_BlockInput2.default, {
            placeholder: 'Title',
            value: this.props.data.title,
            onChange: this.handleTitleChange.bind(this) }),
          _react2.default.createElement(_BlockInput2.default, {
            placeholder: 'Alt',
            value: this.props.data.alt,
            onChange: this.handleAltChange.bind(this) })
        )
      );
    }
  }]);

  return ImageBlock;
}(_react.Component);

exports.default = ImageBlock;


var Image = _styledComponents2.default.img(_templateObject);

var InputWrap = _styledComponents2.default.div(_templateObject2);