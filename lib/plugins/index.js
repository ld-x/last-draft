'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _plugin = require('./image/plugin');

var _plugin2 = require('./emoji/plugin');

var _plugin3 = _interopRequireDefault(_plugin2);

var _plugin4 = require('./video/plugin');

var _plugin5 = _interopRequireDefault(_plugin4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_plugin.image, _plugin.placeholder, _plugin3.default, _plugin5.default];