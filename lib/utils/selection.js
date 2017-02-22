'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSelectedBlockElement = getSelectedBlockElement;
exports.getSelectionCoords = getSelectionCoords;

var _draftJs = require('draft-js');

var _DraftOffsetKey = require('draft-js/lib/DraftOffsetKey');

var _DraftOffsetKey2 = _interopRequireDefault(_DraftOffsetKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

function getSelectedBlockElement(editorState) {
  var selectionState = editorState.getSelection();
  var contentState = editorState.getCurrentContent();
  var block = contentState.getBlockForKey(selectionState.getStartKey());

  var offsetKey = _DraftOffsetKey2.default.encode(block.getKey(), 0, 0);

  var node = document.querySelectorAll('[data-offset-key="' + offsetKey + '"]')[0];

  if (node.getAttribute && node.getAttribute('data-block') === 'true') {
    return node;
  } else {
    return null;
  }
}

function getSelectionCoords(editor) {
  var toolbarHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 34;
  var maxOffsetLeft = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 250;

  var editorBounds = editor.getBoundingClientRect();
  var rangeBounds = (0, _draftJs.getVisibleSelectionRect)(window);
  if (!rangeBounds) {
    return null;
  }
  var rangeWidth = rangeBounds.right - rangeBounds.left;

  var offsetLeft = rangeBounds.left - editorBounds.left + rangeWidth / 2;
  if (offsetLeft < maxOffsetLeft) {
    offsetLeft = maxOffsetLeft;
  }
  var offsetTop = rangeBounds.top - editorBounds.top - toolbarHeight;
  var offsetBottom = editorBounds.bottom - rangeBounds.top;
  var rangeLeft = rangeBounds.left;
  return { offsetLeft: offsetLeft, offsetTop: offsetTop, offsetBottom: offsetBottom, rangeLeft: rangeLeft };
}