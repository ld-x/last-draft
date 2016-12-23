'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _plugin = require('./image/plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _plugin3 = require('./video/plugin');

var _plugin4 = _interopRequireDefault(_plugin3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_plugin2.default, _plugin4.default];