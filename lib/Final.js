'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _src = require('./plugins/draft-js-plugins-editor/src/');

var _src2 = _interopRequireDefault(_src);

var _draftJs = require('draft-js');

var _draftJsExportHtml = require('draft-js-export-html');

var _src3 = require('./plugins/draft-js-emoji-plugin/src/');

var _src4 = _interopRequireDefault(_src3);

var _EmojiStyles = require('./styles/EmojiStyles.css');

var _EmojiStyles2 = _interopRequireDefault(_EmojiStyles);

var _src5 = require('./plugins/draft-js-hashtag-plugin/src/');

var _src6 = _interopRequireDefault(_src5);

var _HashtagStyles = require('./styles/HashtagStyles.css');

var _HashtagStyles2 = _interopRequireDefault(_HashtagStyles);

var _src7 = require('./plugins/draft-js-image-plugin/src/');

var _src8 = _interopRequireDefault(_src7);

var _src9 = require('./plugins/draft-js-alignment-plugin/src/');

var _src10 = _interopRequireDefault(_src9);

var _src11 = require('./plugins/draft-js-focus-plugin/src/');

var _src12 = _interopRequireDefault(_src11);

var _src13 = require('./plugins/draft-js-resizeable-plugin/src/');

var _src14 = _interopRequireDefault(_src13);

var _FocusStyles = require('./styles/FocusStyles.css');

var _FocusStyles2 = _interopRequireDefault(_FocusStyles);

var _AlignmentStyles = require('./styles/AlignmentStyles.css');

var _AlignmentStyles2 = _interopRequireDefault(_AlignmentStyles);

var _src15 = require('./plugins/draft-js-inline-toolbar-plugin/src/');

var _src16 = _interopRequireDefault(_src15);

var _inlineToolbarStyles = require('./styles/inlineToolbarStyles.css');

var _inlineToolbarStyles2 = _interopRequireDefault(_inlineToolbarStyles);

var _InlineToolbarButtonStyles = require('./styles/InlineToolbarButtonStyles.css');

var _InlineToolbarButtonStyles2 = _interopRequireDefault(_InlineToolbarButtonStyles);

var _src17 = require('./plugins/draft-js-buttons/src/');

var _src18 = require('./plugins/draft-js-linkify-plugin/src/');

var _src19 = _interopRequireDefault(_src18);

var _Linkify = require('./styles/Linkify.css');

var _Linkify2 = _interopRequireDefault(_Linkify);

var _src20 = require('./plugins/draft-js-mention-plugin/src/');

var _src21 = _interopRequireDefault(_src20);

var _Mention = require('./styles/Mention.css');

var _Mention2 = _interopRequireDefault(_Mention);

var _mentions = require('./components/Mention/mentions');

var _mentions2 = _interopRequireDefault(_mentions);

var _src22 = require('./plugins/draft-js-side-toolbar-plugin/src/');

var _src23 = _interopRequireDefault(_src22);

var _ToolbarButtonStyles = require('./styles/ToolbarButtonStyles.css');

var _ToolbarButtonStyles2 = _interopRequireDefault(_ToolbarButtonStyles);

var _ToolbarStyles = require('./styles/ToolbarStyles.css');

var _ToolbarStyles2 = _interopRequireDefault(_ToolbarStyles);

var _ToolbarBlockTypeSelectStyles = require('./styles/ToolbarBlockTypeSelectStyles.css');

var _ToolbarBlockTypeSelectStyles2 = _interopRequireDefault(_ToolbarBlockTypeSelectStyles);

var _src24 = require('./plugins/draft-js-sticker-plugin/src/');

var _src25 = _interopRequireDefault(_src24);

var _stickers = require('./components/Sticker/stickers');

var _stickers2 = _interopRequireDefault(_stickers);

var _StickerStyles = require('./styles/StickerStyles.css');

var _StickerStyles2 = _interopRequireDefault(_StickerStyles);

var _text = require('./initialState/text');

var _raw = require('./initialState/raw');

var _html = require('./initialState/html');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* Emoji plugin */


var emojiPlugin = (0, _src4.default)({
  theme: _EmojiStyles2.default
});
var EmojiSuggestions = emojiPlugin.EmojiSuggestions;

/* Hashtag plugin */

var hashtagPlugin = (0, _src6.default)({
  theme: _HashtagStyles2.default
});

/* Image with Alignment, dnd, focus, resize plugin */

var focusPlugin = (0, _src12.default)({ theme: _FocusStyles2.default });
var resizeablePlugin = (0, _src14.default)();

var alignmentPlugin = (0, _src10.default)({ theme: _AlignmentStyles2.default });
var AlignmentTool = alignmentPlugin.AlignmentTool;

/* alignmentPlugin.decorator, TODO: Needs theming */

var decorator = (0, _src.composeDecorators)(resizeablePlugin.decorator, focusPlugin.decorator);
var imagePlugin = (0, _src8.default)({ decorator: decorator });
var ImageAdd = imagePlugin.ImageAdd;

var imageAddElement = null;
var addImageFile = function addImageFile() {
  imageAddElement.addImageFile();
};

/* inline toolbar */

var addLink = function addLink() {
  linkAddElement.openPopover();
};
var linkAddElement = null;
var inlineToolbarElement = null;
var inlineToolbarPlugin = (0, _src16.default)({
  structure: [_src17.ItalicButton, _src17.BoldButton, _src17.UnderlineButton, _src17.CodeButton, _src17.HeadlineOneButton, _src17.HeadlineTwoButton, _src17.HeadlineThreeButton, _src17.UnorderedListButton, _src17.BlockquoteButton, _src17.AddLinkButton],
  addLink: addLink,
  theme: { buttonStyles: _InlineToolbarButtonStyles2.default, toolbarStyles: _inlineToolbarStyles2.default }
});

var InlineToolbar = inlineToolbarPlugin.InlineToolbar;

/* Linkify */

var linkifyPlugin = (0, _src19.default)({ theme: _Linkify2.default });
var LinkAdd = linkifyPlugin.LinkAdd;

/* Mentions */

var mentionPlugin = (0, _src21.default)({
  mentions: _mentions2.default,
  positionSuggestions: _mentions.positionSuggestions,
  theme: _Mention2.default
});
var MentionSuggestions = mentionPlugin.MentionSuggestions;

/* Side Toolbar */

var sideToolbarPlugin = (0, _src23.default)({
  theme: { buttonStyles: _ToolbarButtonStyles2.default, toolbarStyles: _ToolbarStyles2.default, blockTypeSelectStyles: _ToolbarBlockTypeSelectStyles2.default },
  addImageFile: addImageFile
});
var SideToolbar = sideToolbarPlugin.SideToolbar;

/* Stickers */

var stickerPlugin = (0, _src25.default)({
  stickers: _stickers2.default,
  theme: _StickerStyles2.default
});
var StickerSelect = stickerPlugin.StickerSelect;

/* init the plugins */

var pluginList = _defineProperty({
  imagePlugin: imagePlugin,
  emojiPlugin: emojiPlugin,
  hashtagPlugin: hashtagPlugin,
  inlineToolbarPlugin: inlineToolbarPlugin,
  linkifyPlugin: linkifyPlugin,
  mentionPlugin: mentionPlugin,
  sideToolbarPlugin: sideToolbarPlugin,
  stickerPlugin: stickerPlugin
}, 'stickerPlugin', stickerPlugin);

/* init the state, either from raw, html or text */


/* from html
const content = ContentState.createFromBlockArray(convertFromHTML(html))
let STATE = EditorState.createWithContent(content)
*/

/* from text
let STATE = createEditorStateWithText(text)
*/

/* from raw */
var content = (0, _draftJs.convertFromRaw)(_raw.raw);
var STATE = _draftJs.EditorState.createWithContent(content);

var Final = function (_Component) {
  _inherits(Final, _Component);

  function Final() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Final);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Final.__proto__ || Object.getPrototypeOf(Final)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      editorState: STATE,
      suggestions: _mentions2.default
    }, _this.onChange = function (editorState) {
      _this.setState({ editorState: editorState });

      var raw = (0, _draftJs.convertToRaw)(editorState.getCurrentContent());
      _this.logState('raw state:', JSON.stringify(raw));

      var html = (0, _draftJsExportHtml.stateToHTML)(editorState.getCurrentContent());
      _this.logState('html state:', html);
    }, _this.focus = function () {
      _this.editor.focus();
    }, _this.onSearchChange = function (_ref2) {
      var value = _ref2.value;

      _this.setState({
        suggestions: (0, _src20.defaultSuggestionsFilter)(value, _mentions2.default)
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Final, [{
    key: 'logState',
    value: function logState(type, raw) {
      console.log(type);
      console.log(JSON.stringify(raw));
    }
  }, {
    key: 'customCountFunction',
    value: function customCountFunction(str) {
      var wordArray = str.match(/\S+/g);
      return wordArray ? wordArray.length : 0;
    }
  }, {
    key: 'getPlugins',
    value: function getPlugins() {
      var _this2 = this;

      var pluginArray = [];
      if (this.props.plugins === undefined) {
        return pluginArray;
      }

      Object.keys(pluginList).map(function (key, index) {
        if (_this2.props.plugins.includes(key)) {
          pluginArray.push(pluginList[key]);
        }
      });

      if (this.props.plugins.includes('imagePlugin')) {
        pluginArray.push(focusPlugin);
        pluginArray.push(resizeablePlugin);
      }
      return pluginArray;
    }
  }, {
    key: 'renderEmoji',
    value: function renderEmoji() {
      if (this.props.plugins.includes('emojiPlugin')) {
        return _react2.default.createElement(EmojiSuggestions, null);
      }
    }
  }, {
    key: 'renderMention',
    value: function renderMention() {
      if (this.props.plugins.includes('mentionPlugin')) {
        return _react2.default.createElement(MentionSuggestions, {
          onSearchChange: this.onSearchChange,
          suggestions: this.state.suggestions,
          entryComponent: _mentions.Entry
        });
      }
    }
  }, {
    key: 'renderInlineToolbar',
    value: function renderInlineToolbar() {
      if (this.props.plugins.includes('inlineToolbarPlugin')) {
        return _react2.default.createElement(InlineToolbar, {
          ref: function ref(element) {
            inlineToolbarElement = element;
          } });
      }
    }
  }, {
    key: 'renderSideToolbar',
    value: function renderSideToolbar() {
      if (this.props.plugins.includes('sideToolbarPlugin')) {
        return _react2.default.createElement(SideToolbar, null);
      }
    }
  }, {
    key: 'renderLinkAdd',
    value: function renderLinkAdd() {
      if (this.props.plugins.includes('linkifyPlugin') && this.props.plugins.includes('inlineToolbarPlugin')) {
        return _react2.default.createElement(LinkAdd, {
          ref: function ref(element) {
            linkAddElement = element;
          },
          editorState: this.state.editorState,
          onChange: this.onChange,
          inlineToolbarElement: inlineToolbarElement
        });
      }
    }
  }, {
    key: 'renderImageAdd',
    value: function renderImageAdd() {
      if (this.props.plugins.includes('imagePlugin') && this.props.plugins.includes('sideToolbarPlugin')) {
        return _react2.default.createElement(ImageAdd, {
          ref: function ref(element) {
            imageAddElement = element;
          },
          editorState: this.state.editorState,
          onChange: this.onChange
        });
      }
    }
  }, {
    key: 'renderSticker',
    value: function renderSticker() {
      if (this.props.plugins.includes('stickerPlugin')) {
        return _react2.default.createElement(StickerSelect, { editor: this });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'editor', onClick: this.focus },
          _react2.default.createElement(_src2.default, _extends({}, this.props, {
            editorState: this.state.editorState,
            onChange: this.onChange,
            plugins: this.getPlugins(),
            ref: function ref(element) {
              _this3.editor = element;
            }
          })),
          this.renderInlineToolbar(),
          this.renderSideToolbar(),
          this.renderEmoji(),
          this.renderMention()
        ),
        _react2.default.createElement(
          'div',
          null,
          this.renderLinkAdd(),
          this.renderImageAdd(),
          this.renderSticker()
        )
      );
    }
  }]);

  return Final;
}(_react.Component);

exports.default = Final;