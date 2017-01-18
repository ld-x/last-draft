'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _plugin = require('./image/plugin');

var _plugin2 = require('./video/plugin');

var _plugin3 = _interopRequireDefault(_plugin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

exports.default = [_plugin.image, _plugin.placeholder, _plugin3.default];