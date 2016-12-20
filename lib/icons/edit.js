"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 50%;\n  margin-top: -8px;\n  right: 0;\n  width: 16px;\n  height: 16px;\n  display: none;\n  pointer-events: none;\n"], ["\n  position: absolute;\n  top: 50%;\n  margin-top: -8px;\n  right: 0;\n  width: 16px;\n  height: 16px;\n  display: none;\n  pointer-events: none;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styled = require('styled-components').default;

var _default = function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
  }

  _createClass(_default, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        EditIcon,
        { width: "24", height: "24", viewBox: "0 0 24 24" },
        _react2.default.createElement("path", { fill: "none", d: "M-1-1h26v26H-1z" }),
        _react2.default.createElement(
          "g",
          { fillRule: "evenodd", fill: "none" },
          _react2.default.createElement("path", { fill: "currentColor", d: "M3.125 17.375v3.75h3.75l11.06-11.06-3.75-3.75-11.06 11.06zm17.71-10.21a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" }),
          _react2.default.createElement("path", { d: "M.125.125h24v24h-24v-24z" })
        )
      );
    }
  }]);

  return _default;
}(_react2.default.Component);

exports.default = _default;


var EditIcon = styled.svg(_templateObject);