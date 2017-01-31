'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _draftJs = require('draft-js');

/*
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

var addEmptyBlock = function addEmptyBlock(editorState) {
  var newBlock = new _draftJs.ContentBlock({
    key: (0, _draftJs.genKey)(),
    type: 'unstyled',
    text: '',
    characterList: (0, _immutable.List)()
  });

  var contentState = editorState.getCurrentContent();
  var newBlockMap = contentState.getBlockMap().set(newBlock.key, newBlock);

  return _draftJs.EditorState.push(editorState, _draftJs.ContentState.createFromBlockArray(newBlockMap.toArray()).set('selectionBefore', contentState.getSelectionBefore()).set('selectionAfter', contentState.getSelectionAfter()));
};

exports.default = addEmptyBlock;