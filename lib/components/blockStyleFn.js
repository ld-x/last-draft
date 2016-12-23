'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (contentBlock) {
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
};