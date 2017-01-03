'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blockRenderMap = undefined;

var _Map;

exports.blockStyleFn = blockStyleFn;

var _immutable = require('immutable');

var _draftJs = require('draft-js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var blockRenderMap = exports.blockRenderMap = (0, _immutable.Map)((_Map = {}, _defineProperty(_Map, 'caption', {
  element: 'cite'
}), _defineProperty(_Map, 'pullquote', {
  element: 'span'
}), _defineProperty(_Map, 'alignment-left', {
  element: 'div'
}), _defineProperty(_Map, 'alignment-center', {
  element: 'div'
}), _defineProperty(_Map, 'alignment-right', {
  element: 'div'
}), _defineProperty(_Map, 'image', {
  element: 'figure'
}), _defineProperty(_Map, 'break', {
  element: 'div'
}), _Map)).merge(_draftJs.DefaultDraftBlockRenderMap);

function blockStyleFn(contentBlock) {
  var type = contentBlock.getType();
  if (type === 'unstyled') {
    return 'paragraph';
  }
  if (type === 'blockquote') {
    return 'blockquote';
  }
  if (type === 'pullquote') {
    return 'pullquote';
  }
  if (type === 'header-two') {
    return 'header';
  }
  if (type === 'unordered-list-item') {
    return 'unordered-list';
  }
  if (type === 'ordered-list-item') {
    return 'ordered-list';
  }
}

/* TODO: export function blockRendererFn here */