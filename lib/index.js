'use strict';

var _Editor = require('./components/Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _convert = require('./utils/convert');

var convert = _interopRequireWildcard(_convert);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

var LD = {
  editorStateFromRaw: convert.editorStateFromRaw,
  editorStateFromHtml: convert.editorStateFromHtml,
  editorStateFromText: convert.editorStateFromText,
  editorStateToJSON: convert.editorStateToJSON,
  editorStateToHtml: convert.editorStateToHtml,
  Editor: _Editor2.default
};

module.exports = LD;
// MARKDOWN!!!