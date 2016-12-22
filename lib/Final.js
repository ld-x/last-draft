"use strict";

var _draftJs = require("draft-js");

var _draftJs2 = _interopRequireDefault(_draftJs);

var _insertDataBlock = require("./insertDataBlock");

var _insertDataBlock2 = _interopRequireDefault(_insertDataBlock);

var _Media = require("./components/Media");

var _Media2 = _interopRequireDefault(_Media);

var _Editor = require("./components/Editor");

var _Editor2 = _interopRequireDefault(_Editor);

var _icons = require("./icons");

var _icons2 = _interopRequireDefault(_icons);

var _Sidebar = require("./components/Sidebar");

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Toolbar = require("./components/Toolbar");

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _utils = require("./utils");

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Final = {
  DraftJS: _draftJs2.default,
  editorStateFromRaw: utils.editorStateFromRaw,
  editorStateFromHtml: utils.editorStateFromHtml,
  editorStateToJSON: utils.editorStateToJSON,
  editorStateToHtml: utils.editorStateToHtml,
  createTypeStrategy: utils.createTypeStrategy,
  insertDataBlock: _insertDataBlock2.default,
  Media: _Media2.default,
  Editor: _Editor2.default,
  Icons: _icons2.default,
  Sidebar: _Sidebar2.default,
  Toolbar: _Toolbar2.default
};

module.exports = Final;