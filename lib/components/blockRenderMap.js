'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Map;

var _immutable = require('immutable');

var _draftJs = require('draft-js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RenderMap = (0, _immutable.Map)((_Map = {}, _defineProperty(_Map, 'caption', {
  element: 'cite'
}), _defineProperty(_Map, 'pullquote', {
  element: 'span'
}), _defineProperty(_Map, 'image', {
  element: 'figure'
}), _defineProperty(_Map, 'break', {
  element: 'div'
}), _Map)).merge(_draftJs.DefaultDraftBlockRenderMap);

exports.default = RenderMap;