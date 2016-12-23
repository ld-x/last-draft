'use strict';

var _insertDataBlock = require('./utils/insertDataBlock');

var _insertDataBlock2 = _interopRequireDefault(_insertDataBlock);

var _Editor = require('./components/Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

var _convert = require('./utils/convert');

var convert = _interopRequireWildcard(_convert);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Final = {
  editorStateFromRaw: convert.editorStateFromRaw,
  editorStateFromHtml: convert.editorStateFromHtml,
  editorStateToJSON: convert.editorStateToJSON,
  editorStateToHtml: convert.editorStateToHtml,
  insertDataBlock: _insertDataBlock2.default,
  Editor: _Editor2.default,
  Icons: _icons2.default
};

module.exports = Final;