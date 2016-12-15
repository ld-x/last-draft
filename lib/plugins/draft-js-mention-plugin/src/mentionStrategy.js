'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _getTypeByTrigger = require('./utils/getTypeByTrigger');

var _getTypeByTrigger2 = _interopRequireDefault(_getTypeByTrigger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findMention = function findMention(trigger) {
  return function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && _draftJs.Entity.get(entityKey).getType() === (0, _getTypeByTrigger2.default)(trigger);
  };
};

var findMentionEntities = function findMentionEntities(trigger) {
  return function (contentBlock, callback) {
    contentBlock.findEntityRanges(findMention(trigger), callback);
  };
};

exports.default = findMentionEntities;