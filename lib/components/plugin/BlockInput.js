"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n  position: relative;\n"], ["\n  position: relative;\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n  border: 0;\n  border-bottom: 1px dashed transparent;\n  color: #333;\n  display: block;\n  padding: 8px 0;\n  width: 100%;\n  font-size: 0.75rem;\n"], ["\n  border: 0;\n  border-bottom: 1px dashed transparent;\n  color: #333;\n  display: block;\n  padding: 8px 0;\n  width: 100%;\n  font-size: 0.75rem;\n"]),
    _templateObject3 = _taggedTemplateLiteral(["\n  color: #ff351e;\n  margin-top: 6px;\n  font-size: 0.75rem;\n"], ["\n  color: #ff351e;\n  margin-top: 6px;\n  font-size: 0.75rem;\n"]),
    _templateObject4 = _taggedTemplateLiteral(["\n  line-height: 1rem;\n"], ["\n  line-height: 1rem;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _icons = require("../../icons");

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
    key: "renderError",
    value: function renderError(error) {
      if (!error) {
        return;
      }
      return _react2.default.createElement(
        BlockInputErrorText,
        null,
        error
      );
    }
  }, {
    key: "handleDrop",
    value: function handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          value = _props.value,
          error = _props.error,
          props = _objectWithoutProperties(_props, ["value", "error"]);

      return _react2.default.createElement(
        BlockInputRow,
        null,
        _react2.default.createElement(
          BlockInputWrapper,
          null,
          _react2.default.createElement(BlockInput, _extends({}, props, {
            defaultValue: value,
            type: "text",
            onDrop: this.handleDrop })),
          _react2.default.createElement(_icons2.default.EditIcon, null)
        ),
        this.renderError(error)
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;


var BlockInputWrapper = styled.div(_templateObject);

var BlockInput = styled.input(_templateObject2);

var BlockInputErrorText = styled.div(_templateObject3);

var BlockInputRow = styled.div(_templateObject4);