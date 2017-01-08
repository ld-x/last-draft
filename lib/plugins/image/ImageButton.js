'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  background: none;\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  height: 24px;\n  font-size: 0;\n  padding: 0;\n  width: 24px;\n  transition: all 0.5s ease;\n  position: relative;\n  background: none;\n  margin-top: 1px;\n\n  &:before {\n    transition: all 0.1s ease-in-out;\n    background-color: #181818;\n    content: \'\';\n    width: 100%;\n    height: 100%;\n    border-radius: 100%;\n    display: inline-block;\n    background-color: #181818;\n  }\n  &:focus {\n    outline: none;\n  }\n'], ['\n  background: none;\n  border: 0;\n  color: #fff;\n  cursor: pointer;\n  height: 24px;\n  font-size: 0;\n  padding: 0;\n  width: 24px;\n  transition: all 0.5s ease;\n  position: relative;\n  background: none;\n  margin-top: 1px;\n\n  &:before {\n    transition: all 0.1s ease-in-out;\n    background-color: #181818;\n    content: \'\';\n    width: 100%;\n    height: 100%;\n    border-radius: 100%;\n    display: inline-block;\n    background-color: #181818;\n  }\n  &:focus {\n    outline: none;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  position: absolute;\n  transform: scale(0.8);\n  top: 0;\n  left: 0;\n'], ['\n  position: absolute;\n  transform: scale(0.8);\n  top: 0;\n  left: 0;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _insertDataBlock = require('../../utils/insertDataBlock');

var _insertDataBlock2 = _interopRequireDefault(_insertDataBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styled = require('styled-components').default;

var _default = function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
  }

  _createClass(_default, [{
    key: 'onClick',
    value: function onClick(e) {
      e.preventDefault();
      _reactDom2.default.findDOMNode(this.refs.fileInput).click();
    }
  }, {
    key: 'inputChange',
    value: function inputChange(e) {
      var file = e.target.files[0];
      this.props.uploadFile(file);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          ImageButton,
          { type: 'button', onClick: this.onClick.bind(this), className: 'ld-image-block-button' },
          _react2.default.createElement(
            ImageIcon,
            { width: '24', height: '24', viewBox: '0 0 24 24', className: 'ld-button-image' },
            _react2.default.createElement('path', { d: 'M18.222 6H5.778C4.8 6 4 6.6 4 7.333v9.334C4 17.4 4.8 18 5.778 18h12.444C19.2 18 20 17.4 20 16.667V7.333C20 6.6 19.2 6 18.222 6zm-4.084 4l-3 4.51L9 11.503 6 16h12l-3.862-6z', fill: 'currentColor', fillRule: 'evenodd' })
          )
        ),
        _react2.default.createElement('input', {
          type: 'file',
          ref: 'fileInput',
          onChange: this.inputChange.bind(this),
          style: { display: 'none' } })
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;


var ImageButton = styled.button(_templateObject);

var ImageIcon = styled.svg(_templateObject2);