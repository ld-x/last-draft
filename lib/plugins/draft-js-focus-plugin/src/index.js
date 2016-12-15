'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _setSelection = require('./modifiers/setSelection');

var _setSelection2 = _interopRequireDefault(_setSelection);

var _setSelectionToBlock = require('./modifiers/setSelectionToBlock');

var _setSelectionToBlock2 = _interopRequireDefault(_setSelectionToBlock);

var _createDecorator = require('./createDecorator');

var _createDecorator2 = _interopRequireDefault(_createDecorator);

var _createBlockKeyStore = require('./utils/createBlockKeyStore');

var _createBlockKeyStore2 = _interopRequireDefault(_createBlockKeyStore);

var _blockInSelection = require('./utils/blockInSelection');

var _blockInSelection2 = _interopRequireDefault(_blockInSelection);

var _getBlockMapKeys = require('./utils/getBlockMapKeys');

var _getBlockMapKeys2 = _interopRequireDefault(_getBlockMapKeys);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var focusableBlockIsSelected = function focusableBlockIsSelected(editorState, blockKeyStore) {
  var selection = editorState.getSelection();
  if (selection.getAnchorKey() !== selection.getFocusKey()) {
    return false;
  }
  var content = editorState.getCurrentContent();
  var block = content.getBlockForKey(selection.getAnchorKey());
  return blockKeyStore.includes(block.getKey());
};

exports.default = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var blockKeyStore = (0, _createBlockKeyStore2.default)({});
  var theme = config.theme ? config.theme : _style2.default;
  var lastSelection = void 0;
  var lastContentState = void 0;

  return {
    onChange: function onChange(editorState) {
      // in case the content changed there is no need to re-render blockRendererFn
      // since if a block was added it will be rendered anyway and if it was text
      // then the change was not a pure selection change
      var contentState = editorState.getCurrentContent();
      if (!contentState.equals(lastContentState)) {
        lastContentState = contentState;
        return editorState;
      }
      lastContentState = contentState;

      // if the selection didn't change there is no need to re-render
      var selection = editorState.getSelection();
      if (lastSelection && selection.equals(lastSelection)) {
        lastSelection = editorState.getSelection();
        return editorState;
      }

      // Note: Only if the previous or current selection contained a focusableBlock a re-render is needed.
      var focusableBlockKeys = blockKeyStore.getAll();
      if (lastSelection) {
        var lastBlockMapKeys = (0, _getBlockMapKeys2.default)(contentState, lastSelection.getStartKey(), lastSelection.getEndKey());
        if (lastBlockMapKeys.some(function (key) {
          return focusableBlockKeys.includes(key);
        })) {
          lastSelection = selection;
          // By forcing the selection the editor will trigger the blockRendererFn which is
          // necessary for the blockProps containing isFocus to be passed down again.
          return _draftJs.EditorState.forceSelection(editorState, editorState.getSelection());
        }
      }

      var currentBlockMapKeys = (0, _getBlockMapKeys2.default)(contentState, selection.getStartKey(), selection.getEndKey());
      if (currentBlockMapKeys.some(function (key) {
        return focusableBlockKeys.includes(key);
      })) {
        lastSelection = selection;
        // By forcing the selection the editor will trigger the blockRendererFn which is
        // necessary for the blockProps containing isFocus to be passed down again.
        return _draftJs.EditorState.forceSelection(editorState, editorState.getSelection());
      }

      return editorState;
    },
    keyBindingFn: function keyBindingFn(evt, _ref) {
      var getEditorState = _ref.getEditorState,
          setEditorState = _ref.setEditorState;

      var editorState = getEditorState();
      // TODO match by entitiy instead of block type
      if (focusableBlockIsSelected(editorState, blockKeyStore)) {
        // arrow left
        if (evt.keyCode === 37) {
          (0, _setSelection2.default)(getEditorState, setEditorState, 'up', evt);
        }
        // arrow right
        if (evt.keyCode === 39) {
          (0, _setSelection2.default)(getEditorState, setEditorState, 'down', evt);
        }
      }

      // Don't manually overwrite in case the shift key is used to avoid breaking
      // native behaviour that works anyway.
      if (evt.shiftKey) {
        return;
      }

      // arrow left
      if (evt.keyCode === 37) {
        // Covering the case to select the before block
        var selection = editorState.getSelection();
        var selectionKey = selection.getAnchorKey();
        var beforeBlock = editorState.getCurrentContent().getBlockBefore(selectionKey);
        // only if the selection caret is a the left most position
        if (beforeBlock && selection.getAnchorOffset() === 0 && blockKeyStore.includes(beforeBlock.getKey())) {
          (0, _setSelection2.default)(getEditorState, setEditorState, 'up', evt);
        }
      }
      // arrow right
      if (evt.keyCode === 39) {
        // Covering the case to select the after block
        var _selection = editorState.getSelection();
        var _selectionKey = _selection.getFocusKey();
        var currentBlock = editorState.getCurrentContent().getBlockForKey(_selectionKey);
        var afterBlock = editorState.getCurrentContent().getBlockAfter(_selectionKey);
        var notAtomicAndLastPost = currentBlock.getType() !== 'atomic' && currentBlock.getLength() === _selection.getFocusOffset();
        if (afterBlock && notAtomicAndLastPost && blockKeyStore.includes(afterBlock.getKey())) {
          (0, _setSelection2.default)(getEditorState, setEditorState, 'down', evt);
        }
      }
    },

    // Wrap all block-types in block-focus decorator
    blockRendererFn: function blockRendererFn(contentBlock, _ref2) {
      var getEditorState = _ref2.getEditorState,
          setEditorState = _ref2.setEditorState;

      // This makes it mandatory to have atomic blocks for focus but also improves performance
      // since all the selection checks are not necessary.
      // In case there is a use-case where focus makes sense for none atomic blocks we can add it
      // in the future.
      if (contentBlock.getType() !== 'atomic') {
        return undefined;
      }

      var editorState = getEditorState();
      var isFocused = (0, _blockInSelection2.default)(editorState, contentBlock.getKey());

      return {
        props: {
          isFocused: isFocused,
          isCollapsedSelection: editorState.getSelection().isCollapsed(),
          setFocusToBlock: function setFocusToBlock() {
            (0, _setSelectionToBlock2.default)(getEditorState, setEditorState, contentBlock);
          }
        }
      };
    },
    // Handle down/up arrow events and set activeBlock/selection if necessary
    onDownArrow: function onDownArrow(event, _ref3) {
      var getEditorState = _ref3.getEditorState,
          setEditorState = _ref3.setEditorState;

      // TODO edgecase: if one block is selected and the user wants to expand the selection using the shift key

      var editorState = getEditorState();
      if (focusableBlockIsSelected(editorState, blockKeyStore)) {
        (0, _setSelection2.default)(getEditorState, setEditorState, 'down', event);
        return;
      }

      // Don't manually overwrite in case the shift key is used to avoid breaking
      // native behaviour that works anyway.
      if (event.shiftKey) {
        return;
      }

      // Covering the case to select the after block with arrow down
      var selectionKey = editorState.getSelection().getAnchorKey();
      var afterBlock = editorState.getCurrentContent().getBlockAfter(selectionKey);
      if (afterBlock && blockKeyStore.includes(afterBlock.getKey())) {
        (0, _setSelection2.default)(getEditorState, setEditorState, 'down', event);
      }
    },
    onUpArrow: function onUpArrow(event, _ref4) {
      var getEditorState = _ref4.getEditorState,
          setEditorState = _ref4.setEditorState;

      // TODO edgecase: if one block is selected and the user wants to expand the selection using the shift key

      var editorState = getEditorState();
      if (focusableBlockIsSelected(editorState, blockKeyStore)) {
        (0, _setSelection2.default)(getEditorState, setEditorState, 'up', event);
      }

      // Don't manually overwrite in case the shift key is used to avoid breaking
      // native behaviour that works anyway.
      if (event.shiftKey) {
        return;
      }

      // Covering the case to select the before block with arrow up
      var selectionKey = editorState.getSelection().getAnchorKey();
      var beforeBlock = editorState.getCurrentContent().getBlockBefore(selectionKey);
      if (beforeBlock && blockKeyStore.includes(beforeBlock.getKey())) {
        (0, _setSelection2.default)(getEditorState, setEditorState, 'up', event);
      }
    },
    decorator: (0, _createDecorator2.default)({ theme: theme, blockKeyStore: blockKeyStore })
  };
};