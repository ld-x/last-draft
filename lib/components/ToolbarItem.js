"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n  display: inline-block;\n  margin: 0 !important;\n  &:hover {\n    color: #fff !important;\n  }\n"], ["\n  display: inline-block;\n  margin: 0 !important;\n  &:hover {\n    color: #fff !important;\n  }\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n  padding: 0;\n  color: inherit;\n  cursor: pointer;\n  border: 0;\n  height: 46px;\n  width: 40px;\n  line-height: 1;\n  background: transparent;\n"], ["\n  padding: 0;\n  color: inherit;\n  cursor: pointer;\n  border: 0;\n  height: 46px;\n  width: 40px;\n  line-height: 1;\n  background: transparent;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Separator = require("./Separator");

var _Separator2 = _interopRequireDefault(_Separator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styled = require('styled-components').default;

var _default = function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this, props));
  }

  _createClass(_default, [{
    key: "toggleAction",
    value: function toggleAction(action) {
      if (action.toggle) {
        action.toggle(!action.active);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var Icon = this.props.item.icon;
      var _props = this.props,
          item = _props.item,
          active = _props.active;


      if (item.type == "separator") {
        return _react2.default.createElement(_Separator2.default, null);
      }

      var toolbarItemStyle = {
        color: active ? '#3192e7' : '#ccc'
      };

      return _react2.default.createElement(
        ToolbarItem,
        { style: toolbarItemStyle },
        _react2.default.createElement(
          ToolbarButton,
          {
            onClick: function onClick() {
              return _this2.toggleAction(_this2.props);
            },
            type: "button" },
          _react2.default.createElement(Icon, null)
        )
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;


var ToolbarItem = styled.li(_templateObject);

var ToolbarButton = styled.button(_templateObject2);