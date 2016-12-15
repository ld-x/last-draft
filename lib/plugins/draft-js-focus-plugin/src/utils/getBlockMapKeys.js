"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (contentState, startKey, endKey) {
  var blockMapKeys = contentState.getBlockMap().keySeq();
  return blockMapKeys.skipUntil(function (key) {
    return key === startKey;
  }).takeUntil(function (key) {
    return key === endKey;
  }).concat([endKey]);
};