"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _templateObject = _taggedTemplateLiteral(["\n  color: #999;\n  float: right;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n"], ["\n  color: #999;\n  float: right;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _BlockAction = require("./BlockAction");

var _BlockAction2 = _interopRequireDefault(_BlockAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styled = require('styled-components').default;

var _default = (_temp = _class = function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).apply(this, arguments));
  }

  _createClass(_default, [{
    key: "renderItem",
    value: function renderItem(item) {
      return _react2.default.createElement(_BlockAction2.default, { item: item, key: item.key });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        BlockActionGroup,
        null,
        this.props.items.map(this.renderItem)
      );
    }
  }]);

  return _default;
}(_react.Component), _class.propTypes = {
  items: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    key: _react.PropTypes.string.isRequired,
    icon: _react.PropTypes.func.isRequired,
    action: _react.PropTypes.func.isRequired
  }))
}, _temp);

exports.default = _default;


var BlockActionGroup = styled.ul(_templateObject);