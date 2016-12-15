'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _addSticker = require('./modifiers/addSticker');

var _addSticker2 = _interopRequireDefault(_addSticker);

var _removeSticker = require('./modifiers/removeSticker');

var _removeSticker2 = _interopRequireDefault(_removeSticker);

var _cleanupEmptyStickers = require('./modifiers/cleanupEmptyStickers');

var _cleanupEmptyStickers2 = _interopRequireDefault(_cleanupEmptyStickers);

var _blockRendererFn = require('./blockRendererFn');

var _blockRendererFn2 = _interopRequireDefault(_blockRendererFn);

var _Sticker = require('./Sticker');

var _Sticker2 = _interopRequireDefault(_Sticker);

var _StickerSelect = require('./StickerSelect');

var _StickerSelect2 = _interopRequireDefault(_StickerSelect);

var _stickerStyles = require('./stickerStyles.css');

var _stickerStyles2 = _interopRequireDefault(_stickerStyles);

var _selectStyles = require('./selectStyles.css');

var _selectStyles2 = _interopRequireDefault(_selectStyles);

var _selectStickerStyles = require('./selectStickerStyles.css');

var _selectStickerStyles2 = _interopRequireDefault(_selectStickerStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTheme = {
  sticker: _stickerStyles2.default.sticker,
  stickerImage: _stickerStyles2.default.stickerImage,
  stickerRemoveButton: _stickerStyles2.default.stickerRemoveButton,

  select: _selectStyles2.default.select,
  selectPopover: _selectStyles2.default.selectPopover,
  selectClosedPopover: _selectStyles2.default.selectClosedPopover,
  selectBottomGradient: _selectStyles2.default.selectBottomGradient,
  selectButton: _selectStyles2.default.selectButton,
  selectPressedButton: _selectStyles2.default.selectPressedButton,
  selectStickerList: _selectStyles2.default.selectStickerList,

  selectSticker: _selectStickerStyles2.default.selectSticker,
  selectStickerImage: _selectStickerStyles2.default.selectStickerImage
};

exports.default = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // Styles are overwritten instead of merged as merging causes a lot of confusion.
  //
  // Why? Because when merging a developer needs to know all of the underlying
  // styles which needs a deep dive into the code. Merging also makes it prone to
  // errors when upgrading as basically every styling change would become a major
  // breaking change. 1px of an increased padding can break a whole layout.
  var theme = config.theme ? config.theme : defaultTheme;
  var stickers = config.stickers;
  var selectButtonContent = config.selectButtonContent ? config.selectButtonContent : '☺';

  // default to true if not explicitly set to false
  var attachRemoveButton = config.attachRemoveButton !== false;
  var stickerSelectProps = {
    selectButtonContent: selectButtonContent,
    stickers: stickers,
    theme: theme
  };
  var stickerProps = {
    attachRemoveButton: attachRemoveButton,
    stickers: stickers,
    theme: theme
  };
  var blockRendererConfig = _extends({}, config, {
    Sticker: (0, _decorateComponentWithProps2.default)(_Sticker2.default, stickerProps)
  });
  return {
    blockRendererFn: (0, _blockRendererFn2.default)(blockRendererConfig),
    onChange: _cleanupEmptyStickers2.default,
    add: _addSticker2.default,
    remove: _removeSticker2.default,
    blockRenderMap: (0, _immutable.Map)({ sticker: { element: 'div' } }),
    StickerSelect: (0, _decorateComponentWithProps2.default)(_StickerSelect2.default, stickerSelectProps)
  };
};