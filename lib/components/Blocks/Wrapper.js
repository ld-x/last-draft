'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyCustomBlock = function (_React$Component) {
  _inherits(MyCustomBlock, _React$Component);

  function MyCustomBlock() {
    _classCallCheck(this, MyCustomBlock);

    return _possibleConstructorReturn(this, (MyCustomBlock.__proto__ || Object.getPrototypeOf(MyCustomBlock)).apply(this, arguments));
  }

  _createClass(MyCustomBlock, [{
    key: 'render',
    value: function render() {
      var block = this.props.children[0].props.children;
      if (block !== undefined) {
        var plugin = block.props.blockProps.plugin;

        if (plugin.wrapper !== undefined) {
          var Wrapper = plugin.wrapper;
          return _react2.default.createElement(
            Wrapper,
            null,
            this.props.children
          );
        }
      }

      return _react2.default.createElement(
        'div',
        { className: 'ld-plugin-wrapper' },
        this.props.children
      );
    }
  }]);

  return MyCustomBlock;
}(_react2.default.Component);

exports.default = MyCustomBlock;