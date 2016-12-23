'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icons = require('../icons');

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{ type: 'inline', label: 'B', style: 'BOLD', icon: _icons2.default.BoldIcon }, { type: 'inline', label: 'I', style: 'ITALIC', icon: _icons2.default.ItalicIcon }, { type: 'entity', label: 'Link', style: 'link', entity: 'LINK', icon: _icons2.default.LinkIcon }, { type: 'separator' }, { type: 'block', label: 'UL', style: 'unordered-list-item', icon: _icons2.default.ULIcon }, { type: 'block', label: 'OL', style: 'ordered-list-item', icon: _icons2.default.OLIcon }, { type: 'block', label: 'H2', style: 'header-two', icon: _icons2.default.H2Icon }, { type: 'block', label: 'QT', style: 'blockquote', icon: _icons2.default.BlockQuoteIcon }];