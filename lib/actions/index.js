'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Buttons = require('../components/Buttons/');

var _Buttons2 = _interopRequireDefault(_Buttons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{ type: 'inline', label: 'B', style: 'BOLD', icon: _Buttons2.default.BoldIcon }, { type: 'inline', label: 'I', style: 'ITALIC', icon: _Buttons2.default.ItalicIcon }, { type: 'entity', label: 'Link', style: 'link', entity: 'LINK', icon: _Buttons2.default.LinkIcon }, { type: 'separator' }, { type: 'block', label: 'UL', style: 'unordered-list-item', icon: _Buttons2.default.ULIcon }, { type: 'block', label: 'OL', style: 'ordered-list-item', icon: _Buttons2.default.OLIcon }, { type: 'block', label: 'H2', style: 'header-two', icon: _Buttons2.default.H2Icon }, { type: 'block', label: 'QT', style: 'blockquote', icon: _Buttons2.default.BlockQuoteIcon }, { type: 'block', label: 'PQ', style: 'pullquote', icon: _Buttons2.default.PullQuoteIcon }, { type: 'block', label: 'AL', style: 'alignment-left', icon: _Buttons2.default.AlignLeft }, { type: 'block', label: 'AC', style: 'alignment-center', icon: _Buttons2.default.AlignCenter }, { type: 'block', label: 'AR', style: 'alignment-right', icon: _Buttons2.default.AlignRight }];