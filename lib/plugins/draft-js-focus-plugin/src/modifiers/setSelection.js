'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _DraftOffsetKey = require('draft-js/lib/DraftOffsetKey');

var _DraftOffsetKey2 = _interopRequireDefault(_DraftOffsetKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set selection of editor to next/previous block
exports.default = function (getEditorState, setEditorState, mode, event) {
  var editorState = getEditorState();
  var selectionKey = editorState.getSelection().getAnchorKey();
  var newActiveBlock = mode === 'up' ? editorState.getCurrentContent().getBlockBefore(selectionKey) : editorState.getCurrentContent().getBlockAfter(selectionKey);

  if (newActiveBlock && newActiveBlock.get('key') === selectionKey) {
    return;
  }

  if (newActiveBlock) {
    // TODO verify that always a key-0-0 exists
    var offsetKey = _DraftOffsetKey2.default.encode(newActiveBlock.getKey(), 0, 0);
    var node = document.querySelectorAll('[data-offset-key="' + offsetKey + '"]')[0];
    // set the native selection to the node so the caret is not in the text and
    // the selectionState matches the native selection
    var selection = window.getSelection();
    var range = document.createRange();
    range.setStart(node, 0);
    range.setEnd(node, 0);
    selection.removeAllRanges();
    selection.addRange(range);

    var offset = mode === 'up' ? newActiveBlock.getLength() : 0;
    event.preventDefault();
    setEditorState(_draftJs.EditorState.forceSelection(editorState, new _draftJs.SelectionState({
      anchorKey: newActiveBlock.getKey(),
      anchorOffset: offset,
      focusKey: newActiveBlock.getKey(),
      focusOffset: offset,
      isBackward: false
    })));
  }
};