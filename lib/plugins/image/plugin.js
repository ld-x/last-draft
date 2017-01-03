'use strict';

var _ImageButton = require('./ImageButton');

var _ImageButton2 = _interopRequireDefault(_ImageButton);

var _ImageBlock = require('./ImageBlock');

var _ImageBlock2 = _interopRequireDefault(_ImageBlock);

var _PlaceholderBlock = require('./PlaceholderBlock');

var _PlaceholderBlock2 = _interopRequireDefault(_PlaceholderBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var image = {
  type: 'image',
  button: _ImageButton2.default,
  block: _ImageBlock2.default
};

var placeholder = {
  type: 'placeholder',
  block: _PlaceholderBlock2.default
};

var plugin = {
  image: image,
  placeholder: placeholder
};

module.exports = plugin;