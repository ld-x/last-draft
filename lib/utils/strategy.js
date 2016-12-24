'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTypeStrategy = createTypeStrategy;
exports.hashtagStrategy = hashtagStrategy;

var _draftJs = require('draft-js');

var _hashtag = require('./hashtag');

function createTypeStrategy(type) {
  return function (contentBlock, callback) {
    contentBlock.findEntityRanges(function (character) {
      var entityKey = character.getEntity();
      return entityKey !== null && _draftJs.Entity.get(entityKey).getType() === type;
    }, callback);
  };
}

function hashtagStrategy(contentBlock, callback) {
  var text = contentBlock.getText();
  var results = (0, _hashtag.extractHashtagsWithIndices)(text);

  results.forEach(function (hashtag) {
    callback(hashtag.indices[0], hashtag.indices[1]);
  });
}