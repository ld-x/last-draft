'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _removeSticker = require('./modifiers/removeSticker');

var _removeSticker2 = _interopRequireDefault(_removeSticker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (config) {
  return function (contentBlock, _ref) {
    var getEditorState = _ref.getEditorState,
        setEditorState = _ref.setEditorState;

    var type = contentBlock.getType();
    if (type === 'sticker') {
      return {
        component: config.Sticker,
        props: {
          onRemove: function onRemove(blockKey) {
            setEditorState((0, _removeSticker2.default)(getEditorState(), blockKey));
          }
        }
      };
    }

    return undefined;
  };
};