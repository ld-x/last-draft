'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _linkifyIt = require('linkify-it');

var _linkifyIt2 = _interopRequireDefault(_linkifyIt);

var _tlds = require('tlds');

var _tlds2 = _interopRequireDefault(_tlds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var linkify = (0, _linkifyIt2.default)();
linkify.tlds(_tlds2.default);

// Gets all the links in the text, and returns them via the callback
var linkifyStrategy = function linkifyStrategy(contentBlock, callback) {
  var links = linkify.match(contentBlock.get('text'));
  if (typeof links !== 'undefined' && links !== null) {
    for (var i = 0; i < links.length; i += 1) {
      callback(links[i].index, links[i].lastIndex);
    }
  }
};

exports.default = linkifyStrategy;