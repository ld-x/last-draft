'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emojiButton = require('./emojiButton');

var _emojiButton2 = _interopRequireDefault(_emojiButton);

var _emojiBlock = require('./emojiBlock');

var _emojiBlock2 = _interopRequireDefault(_emojiBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

exports.default = {
  type: 'emoji',
  button: _emojiButton2.default,
  block: _emojiBlock2.default
};