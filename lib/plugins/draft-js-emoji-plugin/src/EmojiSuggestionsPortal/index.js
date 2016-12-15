'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmojiSuggestionsPortal = function (_Component) {
  _inherits(EmojiSuggestionsPortal, _Component);

  function EmojiSuggestionsPortal() {
    _classCallCheck(this, EmojiSuggestionsPortal);

    return _possibleConstructorReturn(this, (EmojiSuggestionsPortal.__proto__ || Object.getPrototypeOf(EmojiSuggestionsPortal)).apply(this, arguments));
  }

  _createClass(EmojiSuggestionsPortal, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.store.register(this.props.offsetKey);
      this.updatePortalClientRect(this.props);

      // trigger a re-render so the EmojiSuggestions becomes active
      this.props.setEditorState(this.props.getEditorState());
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.updatePortalClientRect(nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.store.unregister(this.props.offsetKey);
    }
  }, {
    key: 'updatePortalClientRect',
    value: function updatePortalClientRect(props) {
      var _this2 = this;

      this.props.store.updatePortalClientRect(props.offsetKey, function () {
        return _this2.searchPortal.getBoundingClientRect();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'span',
        {
          className: this.key,
          ref: function ref(element) {
            _this3.searchPortal = element;
          }
        },
        this.props.children
      );
    }
  }]);

  return EmojiSuggestionsPortal;
}(_react.Component);

exports.default = EmojiSuggestionsPortal;