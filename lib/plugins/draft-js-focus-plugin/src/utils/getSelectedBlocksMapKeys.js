'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getBlockMapKeys = require('./getBlockMapKeys');

var _getBlockMapKeys2 = _interopRequireDefault(_getBlockMapKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (editorState) {
  var selectionState = editorState.getSelection();
  var contentState = editorState.getCurrentContent();
  return (0, _getBlockMapKeys2.default)(contentState, selectionState.getStartKey(), selectionState.getEndKey());
};