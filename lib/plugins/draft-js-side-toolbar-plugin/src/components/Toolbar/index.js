'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DraftOffsetKey = require('draft-js/lib/DraftOffsetKey');

var _DraftOffsetKey2 = _interopRequireDefault(_DraftOffsetKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Toolbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      position: {
        transform: 'scale(0)'
      }
    }, _this.onEditorStateChange = function (editorState) {
      var selection = editorState.getSelection();
      var currentContent = editorState.getCurrentContent();
      var currentBlock = currentContent.getBlockForKey(selection.getStartKey());
      // TODO verify that always a key-0-0 exists
      var offsetKey = _DraftOffsetKey2.default.encode(currentBlock.getKey(), 0, 0);
      // Note: need to wait on tick to make sure the DOM node has been create by Draft.js
      setTimeout(function () {
        var node = document.querySelectorAll('[data-offset-key="' + offsetKey + '"]')[0];
        var top = node.getBoundingClientRect().top;
        var editor = _this.props.store.getItem('getEditorRef')().refs.editor;

        _this.setState({
          position: {
            top: top + window.scrollY,
            left: editor.getBoundingClientRect().left - 80,
            transform: 'scale(1)',
            transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)'
          }
        });
      }, 0);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Toolbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.store.subscribeToItem('editorState', this.onEditorStateChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.store.unsubscribeFromItem('editorState', this.onEditorStateChange);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          store = _props.store;

      return _react2.default.createElement(
        'div',
        {
          className: theme.toolbarStyles.wrapper,
          style: this.state.position
        },
        this.props.structure.map(function (Component, index) {
          return _react2.default.createElement(Component, {
            key: index,
            getEditorState: store.getItem('getEditorState'),
            setEditorState: store.getItem('setEditorState'),
            theme: theme,
            store: store
          });
        })
      );
    }
  }]);

  return Toolbar;
}(_react2.default.Component);

exports.default = Toolbar;