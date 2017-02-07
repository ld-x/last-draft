'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blockRenderMap = undefined;

var _Map;

exports.blockStyleFn = blockStyleFn;
exports.getPluginTypeForBlock = getPluginTypeForBlock;

var _immutable = require('immutable');

var _draftJs = require('draft-js');

var _DraftOffsetKey = require('draft-js/lib/DraftOffsetKey');

var _DraftOffsetKey2 = _interopRequireDefault(_DraftOffsetKey);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*
                                                                                                                                                                                                                   * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                   * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * License: MIT
                                                                                                                                                                                                                   */

var blockRenderMap = exports.blockRenderMap = (0, _immutable.Map)((_Map = {}, _defineProperty(_Map, 'em', {
  element: 'em'
}), _defineProperty(_Map, 'caption', {
  element: 'cite'
}), _defineProperty(_Map, 'quote', {
  element: 'span'
}), _defineProperty(_Map, 'image', {
  element: 'figure'
}), _defineProperty(_Map, 'break', {
  element: 'div'
}), _defineProperty(_Map, 'span', {
  element: 'span'
}), _defineProperty(_Map, 'section', {
  element: 'section'
}), _defineProperty(_Map, 'break', {
  element: 'div'
}), _Map)).merge(_draftJs.DefaultDraftBlockRenderMap);

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
  if (type === 'quote') {
    return 'ld-quote';
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