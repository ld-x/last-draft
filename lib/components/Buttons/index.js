'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Bold = require('./Bold');

var _Bold2 = _interopRequireDefault(_Bold);

var _Italic = require('./Italic');

var _Italic2 = _interopRequireDefault(_Italic);

var _Ul = require('./Ul');

var _Ul2 = _interopRequireDefault(_Ul);

var _Ol = require('./Ol');

var _Ol2 = _interopRequireDefault(_Ol);

var _H = require('./H2');

var _H2 = _interopRequireDefault(_H);

var _Blockquote = require('./Blockquote');

var _Blockquote2 = _interopRequireDefault(_Blockquote);

var _Pullquote = require('./Pullquote');

var _Pullquote2 = _interopRequireDefault(_Pullquote);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _Cross = require('./Cross');

var _Cross2 = _interopRequireDefault(_Cross);

var _Image = require('./Image');

var _Image2 = _interopRequireDefault(_Image);

var _Video = require('./Video');

var _Video2 = _interopRequireDefault(_Video);

var _Crop = require('./Crop');

var _Crop2 = _interopRequireDefault(_Crop);

var _Error = require('./Error');

var _Error2 = _interopRequireDefault(_Error);

var _Emoji = require('./Emoji');

var _Emoji2 = _interopRequireDefault(_Emoji);

var _Unlink = require('./Unlink');

var _Unlink2 = _interopRequireDefault(_Unlink);

var _Close = require('./Close');

var _Close2 = _interopRequireDefault(_Close);

var _Align = require('./Align');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var icons = {
  BoldIcon: _Bold2.default,
  ItalicIcon: _Italic2.default,
  ULIcon: _Ul2.default,
  OLIcon: _Ol2.default,
  H2Icon: _H2.default,
  BlockQuoteIcon: _Blockquote2.default,
  PullQuoteIcon: _Pullquote2.default,
  LinkIcon: _Link2.default,
  CrossIcon: _Cross2.default,
  ImageIcon: _Image2.default,
  VideoIcon: _Video2.default,
  CropIcon: _Crop2.default,
  ErrorIcon: _Error2.default,
  EmojiIcon: _Emoji2.default,
  UnlinkIcon: _Unlink2.default,
  CloseIcon: _Close2.default,
  AlignLeft: _Align.AlignLeft,
  AlignCenter: _Align.AlignCenter,
  AlignRight: _Align.AlignRight
};

exports.default = icons;