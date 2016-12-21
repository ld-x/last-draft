"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ImageButton = require("./ImageButton");

var _ImageButton2 = _interopRequireDefault(_ImageButton);

var _ImageBlock = require("./ImageBlock");

var _ImageBlock2 = _interopRequireDefault(_ImageBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  type: "image",
  button: _ImageButton2.default,
  block: _ImageBlock2.default
};