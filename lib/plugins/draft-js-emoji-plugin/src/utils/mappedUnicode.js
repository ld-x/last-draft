'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emojiList = require('./emojiList');

var _emojiList2 = _interopRequireDefault(_emojiList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapUnicode = function mapUnicode() {
  var unicodes = {};
  // eslint-disable-next-line no-restricted-syntax
  for (var shortname in _emojiList2.default.list) {
    // eslint-disable-next-line no-continue, no-prototype-builtins
    if (!_emojiList2.default.list.hasOwnProperty(shortname)) {
      continue; // eslint-disable-line no-continue
    }

    for (var i = 0, len = _emojiList2.default.list[shortname].length; i < len; i += 1) {
      unicodes[_emojiList2.default.list[shortname][i]] = shortname;
    }
  }

  return unicodes;
};

exports.default = mapUnicode();