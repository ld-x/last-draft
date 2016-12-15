'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _DraftOffsetKey = require('draft-js/lib/DraftOffsetKey');

var _DraftOffsetKey2 = _interopRequireDefault(_DraftOffsetKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set selection of editor to next/previous block
exports.default = function (getEditorState, setEditorState, newActiveBlock) {
  var editorState = getEditorState();

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

  setEditorState(_draftJs.EditorState.forceSelection(editorState, new _draftJs.SelectionState({
    anchorKey: newActiveBlock.getKey(),
    anchorOffset: 0,
    focusKey: newActiveBlock.getKey(),
    focusOffset: 0,
    isBackward: false
  })));
};