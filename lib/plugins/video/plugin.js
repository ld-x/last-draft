'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VideoButton = require('./VideoButton');

var _VideoButton2 = _interopRequireDefault(_VideoButton);

var _VideoBlock = require('./VideoBlock');

var _VideoBlock2 = _interopRequireDefault(_VideoBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

exports.default = {
  type: 'video',
  button: _VideoButton2.default,
  block: _VideoBlock2.default
};