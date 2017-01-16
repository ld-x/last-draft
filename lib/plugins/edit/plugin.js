'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EditButton = require('./EditButton');

var _EditButton2 = _interopRequireDefault(_EditButton);

var _EditBlock = require('./EditBlock');

var _EditBlock2 = _interopRequireDefault(_EditBlock);

var _EditModal = require('./EditModal');

var _EditModal2 = _interopRequireDefault(_EditModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  type: 'edit',
  button: _EditButton2.default,
  block: _EditBlock2.default,
  modal: _EditModal2.default
};