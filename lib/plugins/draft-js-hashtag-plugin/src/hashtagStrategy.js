'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

exports.default = function (contentBlock, callback) {
  var text = contentBlock.getText();
  var results = (0, _utils.extractHashtagsWithIndices)(text);

  results.forEach(function (hashtag) {
    callback(hashtag.indices[0], hashtag.indices[1]);
  });
};