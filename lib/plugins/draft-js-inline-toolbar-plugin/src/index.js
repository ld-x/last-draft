'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Separator = undefined;

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _draftJs = require('draft-js');

var _draftJsButtons = require('../../draft-js-buttons');

var _createStore = require('./utils/createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _Toolbar = require('./components/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Separator = require('./components/Separator');

var _Separator2 = _interopRequireDefault(_Separator);

var _buttonStyles = require('./buttonStyles.css');

var _buttonStyles2 = _interopRequireDefault(_buttonStyles);

var _toolbarStyles = require('./toolbarStyles.css');

var _toolbarStyles2 = _interopRequireDefault(_toolbarStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createInlineToolbarPlugin = function createInlineToolbarPlugin() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var defaultTheme = { buttonStyles: _buttonStyles2.default, toolbarStyles: _toolbarStyles2.default };

  var defaultaddLink = undefined;

  var _config$theme = config.theme,
      theme = _config$theme === undefined ? defaultTheme : _config$theme,
      _config$addLink = config.addLink,
      addLink = _config$addLink === undefined ? defaultaddLink : _config$addLink,
      _config$structure = config.structure,
      structure = _config$structure === undefined ? [_draftJsButtons.BoldButton, _draftJsButtons.ItalicButton, _draftJsButtons.UnderlineButton, _draftJsButtons.CodeButton] : _config$structure;


  var store = (0, _createStore2.default)({
    isVisible: false,
    addLink: addLink
  });

  var toolbarProps = {
    store: store,
    structure: structure,
    theme: theme
  };

  return {
    initialize: function initialize(_ref) {
      var getEditorState = _ref.getEditorState,
          setEditorState = _ref.setEditorState;

      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
    },
    // Re-Render the text-toolbar on selection change
    onChange: function onChange(editorState) {
      var selection = editorState.getSelection();
      if (selection.getHasFocus() && !selection.isCollapsed()) {
        store.updateItem('isVisible', true);
      } else {
        store.updateItem('isVisible', false);
      }
      return editorState;
    },
    handleKeyCommand: function handleKeyCommand(command, _ref2) {
      var getEditorState = _ref2.getEditorState,
          setEditorState = _ref2.setEditorState;

      var editorState = getEditorState();
      var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        setEditorState(newState);
        return true;
      }
      return false;
    },

    InlineToolbar: (0, _decorateComponentWithProps2.default)(_Toolbar2.default, toolbarProps)
  };
}; // eslint-disable-line import/no-unresolved
exports.default = createInlineToolbarPlugin;
exports.Separator = _Separator2.default;