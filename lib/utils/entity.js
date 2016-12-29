'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasEntity = hasEntity;
exports.setEntity = setEntity;
exports.getCurrentEntityKey = getCurrentEntityKey;
exports.getCurrentEntity = getCurrentEntity;

var _draftJs = require('draft-js');

function hasEntity(entityType, editorState) {
  var entity = getCurrentEntity(editorState);
  if (entity && entity.getType() === entityType) {
    return true;
  }
  return false;
}

function setEntity(entityType, data, editorState, onChange) {
  var entityKey = _draftJs.Entity.create(entityType, 'MUTABLE', data);
  var newState = _draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
  var selectionState = _draftJs.EditorState.forceSelection(newState, editorState.getSelection());

  onChange(selectionState);
}

function getCurrentEntityKey(editorState) {
  var selection = editorState.getSelection();
  var anchorKey = selection.getAnchorKey();
  var contentState = editorState.getCurrentContent();
  var anchorBlock = contentState.getBlockForKey(anchorKey);
  var offset = selection.anchorOffset;
  var index = selection.isBackward ? offset - 1 : offset;
  return anchorBlock.getEntityAt(index);
}

function getCurrentEntity(editorState) {
  var entityKey = getCurrentEntityKey(editorState);
  if (entityKey) {
    return _draftJs.Entity.get(entityKey);
  }
  return null;
}