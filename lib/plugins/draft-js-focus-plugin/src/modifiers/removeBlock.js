'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (store, blockKey) {
  var editorState = store.getEditorState();
  var content = editorState.getCurrentContent();

  var beforeKey = content.getKeyBefore(blockKey);
  var beforeBlock = content.getBlockForKey(beforeKey);

  // Note: if the focused block is the first block then it is reduced to an
  // unstyled block with no character
  if (beforeBlock === undefined) {
    var _targetRange = new _draftJs.SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: blockKey,
      focusOffset: 1
    });
    // change the blocktype and remove the characterList entry with the sticker
    content = _draftJs.Modifier.removeRange(content, _targetRange, 'backward');
    content = _draftJs.Modifier.setBlockType(content, _targetRange, 'unstyled');
    var _newState = _draftJs.EditorState.push(editorState, content, 'remove-block');

    // force to new selection
    var _newSelection = new _draftJs.SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: blockKey,
      focusOffset: 0
    });
    return _draftJs.EditorState.forceSelection(_newState, _newSelection);
  }

  var targetRange = new _draftJs.SelectionState({
    anchorKey: beforeKey,
    anchorOffset: beforeBlock.getLength(),
    focusKey: blockKey,
    focusOffset: 1
  });

  content = _draftJs.Modifier.removeRange(content, targetRange, 'backward');
  var newState = _draftJs.EditorState.push(editorState, content, 'remove-block');

  // force to new selection
  var newSelection = new _draftJs.SelectionState({
    anchorKey: beforeKey,
    anchorOffset: beforeBlock.getLength(),
    focusKey: beforeKey,
    focusOffset: beforeBlock.getLength()
  });
  return _draftJs.EditorState.forceSelection(newState, newSelection);
};

var _draftJs = require('draft-js');