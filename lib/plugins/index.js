'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _plugin = require('./image/plugin');

Object.keys(_plugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _plugin[key];
    }
  });
});