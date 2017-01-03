'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Buttons = require('../components/Buttons/');

var _Buttons2 = _interopRequireDefault(_Buttons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{ type: 'inline', label: 'bold', style: 'BOLD', icon: _Buttons2.default.BoldIcon }, { type: 'inline', label: 'italic', style: 'ITALIC', icon: _Buttons2.default.ItalicIcon }, { type: 'entity', label: 'link', style: 'link', entity: 'LINK', icon: _Buttons2.default.LinkIcon }, { type: 'separator', label: 'separator' }, { type: 'block', label: 'ul', style: 'unordered-list-item', icon: _Buttons2.default.ULIcon }, { type: 'block', label: 'ol', style: 'ordered-list-item', icon: _Buttons2.default.OLIcon }, { type: 'block', label: 'h2', style: 'header-two', icon: _Buttons2.default.H2Icon }, { type: 'block', label: 'blockquote', style: 'blockquote', icon: _Buttons2.default.BlockQuoteIcon }, { type: 'block', label: 'pullquote', style: 'pullquote', icon: _Buttons2.default.PullQuoteIcon }, { type: 'block', label: 'alignment-left', style: 'alignment-left', icon: _Buttons2.default.AlignLeft }, { type: 'block', label: 'alignment-center', style: 'alignment-center', icon: _Buttons2.default.AlignCenter }, { type: 'block', label: 'alignment-right', style: 'alignment-right', icon: _Buttons2.default.AlignRight }];