'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n'], ['\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  animation: ', ' 0.8s linear infinite;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 999999999;\n  width: 36px;\n  height: 36px;\n'], ['\n  animation: ', ' 0.8s linear infinite;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 999999999;\n  width: 36px;\n  height: 36px;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  display: inline-block;\n  maxWidth: 100%;\n  verticalAlign: middle;\n  opacity: 0.25;\n'], ['\n  display: inline-block;\n  maxWidth: 100%;\n  verticalAlign: middle;\n  opacity: 0.25;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  line-height: 100px;\n  text-align: center;\n  position: relative;\n'], ['\n  line-height: 100px;\n  text-align: center;\n  position: relative;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Block = require('../block/Block');

var _Block2 = _interopRequireDefault(_Block);

var _Buttons = require('../../components/Buttons/');

var _Buttons2 = _interopRequireDefault(_Buttons);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

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

  function ImageBlock() {
    _classCallCheck(this, ImageBlock);

    return _possibleConstructorReturn(this, (ImageBlock.__proto__ || Object.getPrototypeOf(ImageBlock)).apply(this, arguments));
  }

  _createClass(ImageBlock, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _Block2.default,
        _extends({}, this.props, { actions: this.actions }),
        _react2.default.createElement(
          Spinner,
          { height: '36', viewBox: '0 0 36 36', width: '36', className: 'ld-spinner' },
          _react2.default.createElement('path', { d: 'M28.4,6.6C25.7,4.3,22.3,3,18.5,3C9.9,3,3,9.9,3,18.5S9.9,34,18.5,34c4.3,0,8.1-1.7,11-4.5l-1.8-1.8 c-2.3,2.3-5.6,3.8-9.1,3.8c-7.1,0-13-5.8-13-13s5.8-13,13-13c3.1,0,5.9,1.1,8.1,2.9l-4.5,4.5h8H33H33V2L28.4,6.6z', fill: 'currentColor' })
        ),
        _react2.default.createElement(
          PlaceholderImageWrapper,
          null,
          _react2.default.createElement(PlaceholderImage, { src: this.props.data.src, alt: '', className: 'ld-image-placeholder-block' })
        )
      );
    }
  }]);

  return ImageBlock;
}(_react.Component);

exports.default = ImageBlock;


var rotate360 = (0, _styledComponents.keyframes)(_templateObject);

var Spinner = _styledComponents2.default.svg(_templateObject2, rotate360);
var PlaceholderImage = _styledComponents2.default.img(_templateObject3);

var PlaceholderImageWrapper = _styledComponents2.default.div(_templateObject4);