'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _draftJs = require('draft-js');

var _immutable = require('immutable');

var _draftJsEmojiPlugin = require('draft-js-emoji-plugin');

var _draftJsEmojiPlugin2 = _interopRequireDefault(_draftJsEmojiPlugin);

require('draft-js-emoji-plugin/lib/plugin.css');

var _draftJsHashtagPlugin = require('draft-js-hashtag-plugin');

var _draftJsHashtagPlugin2 = _interopRequireDefault(_draftJsHashtagPlugin);

require('draft-js-hashtag-plugin/lib/plugin.css');

var _draftJsImagePlugin = require('draft-js-image-plugin');

var _draftJsImagePlugin2 = _interopRequireDefault(_draftJsImagePlugin);

var _draftJsAlignmentPlugin = require('draft-js-alignment-plugin');

var _draftJsAlignmentPlugin2 = _interopRequireDefault(_draftJsAlignmentPlugin);

var _draftJsFocusPlugin = require('draft-js-focus-plugin');

var _draftJsFocusPlugin2 = _interopRequireDefault(_draftJsFocusPlugin);

var _draftJsResizeablePlugin = require('draft-js-resizeable-plugin');

var _draftJsResizeablePlugin2 = _interopRequireDefault(_draftJsResizeablePlugin);

var _draftJsDragNDropPlugin = require('draft-js-drag-n-drop-plugin');

var _draftJsDragNDropPlugin2 = _interopRequireDefault(_draftJsDragNDropPlugin);

require('draft-js-alignment-plugin/lib/plugin.css');

require('draft-js-focus-plugin/lib/plugin.css');

var _draftJsLinkifyPlugin = require('draft-js-linkify-plugin');

var _draftJsLinkifyPlugin2 = _interopRequireDefault(_draftJsLinkifyPlugin);

require('draft-js-linkify-plugin/lib/plugin.css');

var _draftJsMentionPlugin = require('draft-js-mention-plugin');

var _draftJsMentionPlugin2 = _interopRequireDefault(_draftJsMentionPlugin);

require('draft-js-mention-plugin/lib/plugin.css');

var _lastDraftJsToolbarPlugin = require('last-draft-js-toolbar-plugin');

var _lastDraftJsToolbarPlugin2 = _interopRequireDefault(_lastDraftJsToolbarPlugin);

require('last-draft-js-toolbar-plugin/lib/plugin.css');

var _lastDraftJsSidebarPlugin = require('last-draft-js-sidebar-plugin');

var _lastDraftJsSidebarPlugin2 = _interopRequireDefault(_lastDraftJsSidebarPlugin);

require('last-draft-js-sidebar-plugin/lib/plugin.css');

var _draftJsEmbedPlugin = require('draft-js-embed-plugin');

var _draftJsEmbedPlugin2 = _interopRequireDefault(_draftJsEmbedPlugin);

require('draft-js-embed-plugin/lib/plugin.css');

var _draftJsLinkPlugin = require('draft-js-link-plugin');

var _draftJsLinkPlugin2 = _interopRequireDefault(_draftJsLinkPlugin);

require('draft-js-link-plugin/lib/plugin.css');

var _draftJsColorPickerPlugin = require('draft-js-color-picker-plugin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars


/* Emoji plugin */


var emojiPlugin = (0, _draftJsEmojiPlugin2.default)();
var EmojiSuggestions = emojiPlugin.EmojiSuggestions;

/* Hashtag plugin */

var hashtagPlugin = (0, _draftJsHashtagPlugin2.default)();

/* Image with Alignment, dnd, focus, resize plugin */


var focusPlugin = (0, _draftJsFocusPlugin2.default)();
var resizeablePlugin = (0, _draftJsResizeablePlugin2.default)();
var dndPlugin = (0, _draftJsDragNDropPlugin2.default)();
var alignmentPlugin = (0, _draftJsAlignmentPlugin2.default)();
var AlignmentTool = alignmentPlugin.AlignmentTool;


var decorator = (0, _draftJsPluginsEditor.composeDecorators)(resizeablePlugin.decorator, alignmentPlugin.decorator, focusPlugin.decorator, dndPlugin.decorator);
var imagePlugin = (0, _draftJsImagePlugin2.default)({ decorator: decorator });

/* Linkify */

var linkifyPlugin = (0, _draftJsLinkifyPlugin2.default)();

/* Mentions */

var mentionPlugin = (0, _draftJsMentionPlugin2.default)();
var MentionSuggestions = mentionPlugin.MentionSuggestions;

/* ld plugins */

/* Toolbar */

var toolbarPlugin = (0, _lastDraftJsToolbarPlugin2.default)();
var Toolbar = toolbarPlugin.Toolbar;

/* Side Toolbar */

var sidebarPlugin = (0, _lastDraftJsSidebarPlugin2.default)();
var Sidebar = sidebarPlugin.Sidebar;

/* Embed plugin */

var embedPlugin = (0, _draftJsEmbedPlugin2.default)();

/* Link plugin */

var linkPlugin = (0, _draftJsLinkPlugin2.default)();

/* Color */


/* init the plugins */
var plugins = [dndPlugin, focusPlugin, alignmentPlugin, resizeablePlugin, imagePlugin, emojiPlugin, hashtagPlugin, linkifyPlugin, mentionPlugin, toolbarPlugin, sidebarPlugin, embedPlugin, linkPlugin];

var _default = function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this, props));

    _this.onChange = function (editorState) {
      _this.props.onChange(editorState);
    };

    _this.focus = function () {
      _this.editor.focus();
    };

    _this.onSearchChange = function (_ref) {
      var value = _ref.value;

      if (_this.props.mentionSearchAsync !== undefined) {
        /* async */
        _this.props.mentionSearchAsync(value).then(function (data) {
          _this.setState({ suggestions: (0, _immutable.fromJS)(data.suggestions) });
        });
      } else {
        /* static list of users */
        _this.setState({
          suggestions: (0, _draftJsMentionPlugin.defaultSuggestionsFilter)(value, _this.props.mentions)
        });
      }
    };

    _this.state = { suggestions: props.mentions || (0, _immutable.fromJS)([]) };
    _this.keyBindings = _this.props.keyBindings || [];
    return _this;
  }

  _createClass(_default, [{
    key: 'handleKeyCommand',
    value: function handleKeyCommand(command) {
      if (this.keyBindings.length) {
        var kb = this.keyBindings.find(function (k) {
          return k.name === command;
        });
        if (kb) {
          kb.action();
          return true;
        }
      }
      var newState = _draftJs.RichUtils.handleKeyCommand(this.props.editorState, command);
      if (newState) {
        this.props.onChange(newState);
        return true;
      }
      return false;
    }
  }, {
    key: 'handleReturn',
    value: function handleReturn(event) {
      if (!event.shiftKey) {
        return false;
      }
      var newState = _draftJs.RichUtils.insertSoftNewline(this.props.editorState);
      this.props.onChange(newState);
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          editorState = _props.editorState,
          editorProps = _objectWithoutProperties(_props, ['editorState']);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'editor' },
          _react2.default.createElement(_draftJsPluginsEditor2.default, _extends({}, editorProps, {
            editorState: editorState,
            onChange: this.onChange,
            plugins: plugins,
            customStyleMap: _draftJsColorPickerPlugin.colorStyleMap,
            handleKeyCommand: this.handleKeyCommand.bind(this),
            handleReturn: this.handleReturn.bind(this),
            ref: function ref(element) {
              _this2.editor = element;
            }
          })),
          _react2.default.createElement(AlignmentTool, null),
          _react2.default.createElement(Toolbar, null),
          _react2.default.createElement(Sidebar, null),
          _react2.default.createElement(EmojiSuggestions, null),
          _react2.default.createElement(MentionSuggestions, {
            onSearchChange: this.onSearchChange,
            suggestions: this.state.suggestions,
            onClose: function onClose() {
              return _this2.setState({ suggestions: (0, _immutable.fromJS)([]) });
            }
          })
        )
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;