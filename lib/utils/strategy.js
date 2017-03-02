'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTypeStrategy = createTypeStrategy;
exports.hashtagStrategy = hashtagStrategy;
exports.linkifyStrategy = linkifyStrategy;

var _hashtag = require('./hashtag');

var _linkifyIt = require('linkify-it');

var _linkifyIt2 = _interopRequireDefault(_linkifyIt);

var _tlds = require('tlds');

var _tlds2 = _interopRequireDefault(_tlds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var linkify = (0, _linkifyIt2.default)(); /*
                                           * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
                                           *
                                           * License: MIT
                                           */

linkify.tlds(_tlds2.default);

function createTypeStrategy(type) {
  return function (contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(function (character) {
      var entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === type;
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

function linkifyStrategy(contentBlock, callback) {
  var links = linkify.match(contentBlock.get('text'));
  if (typeof links !== 'undefined' && links !== null) {
    for (var i = 0; i < links.length; i += 1) {
      if (links[i].schema !== '') {
        callback(links[i].index, links[i].lastIndex);
      }
    }
  }
}