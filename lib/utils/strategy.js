'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTypeStrategy = createTypeStrategy;

var _draftJs = require('draft-js');

function createTypeStrategy(type) {
  return function (contentBlock, callback) {
    contentBlock.findEntityRanges(function (character) {
      var entityKey = character.getEntity();
      return entityKey !== null && _draftJs.Entity.get(entityKey).getType() === type;
    }, callback);
  };
}