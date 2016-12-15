'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getSelectedBlocksMapKeys = require('./getSelectedBlocksMapKeys');

var _getSelectedBlocksMapKeys2 = _interopRequireDefault(_getSelectedBlocksMapKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (editorState, blockKey) {
  var selectedBlocksKeys = (0, _getSelectedBlocksMapKeys2.default)(editorState);
  return selectedBlocksKeys.includes(blockKey);
};