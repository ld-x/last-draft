'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var cleanupSticker = function cleanupSticker(editorState, blockKey) {
  var content = editorState.getCurrentContent();

  // get range of the broken sticker block
  var targetRange = new _draftJs.SelectionState({
    anchorKey: blockKey,
    anchorOffset: 0,
    focusKey: blockKey,
    focusOffset: 0
  });

  // convert the sticker block to a unstyled block to make text editing work
  var withoutSticker = _draftJs.Modifier.setBlockType(content, targetRange, 'unstyled');
  var newState = _draftJs.EditorState.push(editorState, withoutSticker, 'remove-sticker');
  return _draftJs.EditorState.forceSelection(newState, withoutSticker.getSelectionAfter());
}; /**
    * Adds backspace support to stickers
    */

exports.default = function (editorState) {
  var newEditorState = editorState;

  // If there is an empty sticker block we remove it.
  // This can happen if a user hits the backspace button and removes the sticker.
  // In this case the block will still be of type sticker.
  editorState.getCurrentContent().get('blockMap').forEach(function (block) {
    if (block.get('type') === 'sticker' && block.getEntityAt(0) === null) {
      newEditorState = cleanupSticker(editorState, block.get('key'));
    }
  });
  return newEditorState;
};