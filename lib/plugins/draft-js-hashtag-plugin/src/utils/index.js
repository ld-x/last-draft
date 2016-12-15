'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractHashtagsWithIndices = extractHashtagsWithIndices;

var _hashtagRegex = require('./hashtagRegex');

var _hashtagRegex2 = _interopRequireDefault(_hashtagRegex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
function extractHashtagsWithIndices(text) {
  if (!text || !text.match(_hashtagRegex2.default.hashSigns)) {
    return [];
  }

  var tags = [];

  text.replace(_hashtagRegex2.default.validHashtag, function (match, before, hash, hashText, offset, chunk) {
    var after = chunk.slice(offset + match.length);
    if (after.match(_hashtagRegex2.default.endHashtagMatch)) {
      return;
    }
    var startPosition = offset + before.length;
    var endPosition = startPosition + hashText.length + 1;
    tags.push({
      hashtag: hashText,
      indices: [startPosition, endPosition]
    });
  });

  return tags;
}