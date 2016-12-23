'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSelectedBlockElement = getSelectedBlockElement;
exports.getSelectionCoords = getSelectionCoords;

var _draftJs = require('draft-js');

function getSelectedBlockElement() {
  var selection = window.getSelection();
  if (selection.rangeCount === 0) {
    return null;
  }
  var node = selection.getRangeAt(0).startContainer;

  do {
    if (node.getAttribute && node.getAttribute('data-block') === 'true') {
      return node;
    }
    node = node.parentNode;
  } while (node != null);
}

function getSelectionCoords(editor, toolbar) {
  var editorBounds = editor.getBoundingClientRect();
  var rangeBounds = (0, _draftJs.getVisibleSelectionRect)(window);

  if (!rangeBounds || !toolbar) {
    return null;
  }

  var rangeWidth = rangeBounds.right - rangeBounds.left;
  var toolbarHeight = toolbar.offsetHeight;
  var offsetLeft = rangeBounds.left - editorBounds.left + rangeWidth / 2;
  var offsetTop = rangeBounds.top - editorBounds.top - toolbarHeight;
  var offsetBottom = editorBounds.bottom - rangeBounds.top;
  return { offsetLeft: offsetLeft, offsetTop: offsetTop, offsetBottom: offsetBottom };
}