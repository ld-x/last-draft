'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blockRenderMap = undefined;
exports.blockStyleFn = blockStyleFn;
exports.getPluginTypeForBlock = getPluginTypeForBlock;

var _immutable = require('immutable');

var _draftJs = require('draft-js');

var _DraftOffsetKey = require('draft-js/lib/DraftOffsetKey');

var _DraftOffsetKey2 = _interopRequireDefault(_DraftOffsetKey);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Wrapper = require('../components/Blocks/Wrapper');

var _Wrapper2 = _interopRequireDefault(_Wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var blockRenderMapCustom = (0, _immutable.Map)({
  'atomic': {
    element: 'div',
    wrapper: _react2.default.createElement(_Wrapper2.default, null)
  }
}); /*
     * Copyright (c) 2016, Globo.com (https://github.com/globocom)
     * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
     *
     * License: MIT
     */

var blockRenderMap = exports.blockRenderMap = _draftJs.DefaultDraftBlockRenderMap.merge(blockRenderMapCustom);

function blockStyleFn(contentBlock) {
  var type = contentBlock.getType();
  if (type === 'unstyled') {
    return 'paragraph';
  }
  if (type === 'blockquote') {
    return 'ld-blockquote';
  }
  if (type === 'header-two') {
    return 'ld-header';
  }
  if (type === 'unordered-list-item') {
    return 'ld-unordered-list';
  }
  if (type === 'ordered-list-item') {
    return 'ld-ordered-list';
  }
}

function getPluginTypeForBlock(editorState, block) {
  /* gets the parent blocks plugin type as the node may not yet be in the dom */
  var selectionState = editorState.getSelection();
  var contentState = editorState.getCurrentContent();

  var prevBlock = contentState.getBlockBefore(block.getKey());
  var offsetKey = _DraftOffsetKey2.default.encode(prevBlock.getKey(), 0, 0);
  var node = document.querySelector('[data-offset-key="' + offsetKey + '"]');
  if (node === undefined || node === null) {
    return null;
  }
  var pluginNode = node.querySelector('div[data-plugin-type]');
  if (pluginNode === undefined || pluginNode === null) {
    return null;
  }
  var pluginType = pluginNode.getAttribute('data-plugin-type');
  if (pluginType === undefined || pluginType === null) {
    return null;
  }
  return pluginType;
}