'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _getSearchText2 = require('../utils/getSearchText');

var _getSearchText3 = _interopRequireDefault(_getSearchText2);

var _emojiList = require('../utils/emojiList');

var _emojiList2 = _interopRequireDefault(_emojiList);

var _convertShortNameToUnicode = require('../utils/convertShortNameToUnicode');

var _convertShortNameToUnicode2 = _interopRequireDefault(_convertShortNameToUnicode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addEmoji = function addEmoji(editorState, emojiShortName) {
  var currentSelectionState = editorState.getSelection();

  var _getSearchText = (0, _getSearchText3.default)(editorState, currentSelectionState),
      begin = _getSearchText.begin,
      end = _getSearchText.end;

  // Get the selection of the :emoji: search text


  var emojiTextSelection = currentSelectionState.merge({
    anchorOffset: begin,
    focusOffset: end
  });

  var unicode = _emojiList2.default.list[emojiShortName][0];
  var emoji = (0, _convertShortNameToUnicode2.default)(unicode);
  var entityKey = _draftJs.Entity.create('emoji', 'IMMUTABLE', { emojiUnicode: emoji });

  var emojiReplacedContent = _draftJs.Modifier.replaceText(editorState.getCurrentContent(), emojiTextSelection, emoji, null, entityKey);

  // If the emoji is inserted at the end, a space is appended right after for
  // a smooth writing experience.
  var blockKey = emojiTextSelection.getAnchorKey();
  var blockSize = editorState.getCurrentContent().getBlockForKey(blockKey).getLength();
  if (blockSize === end) {
    emojiReplacedContent = _draftJs.Modifier.insertText(emojiReplacedContent, emojiReplacedContent.getSelectionAfter(), ' ');
  }

  var newEditorState = _draftJs.EditorState.push(editorState, emojiReplacedContent, 'insert-emoji');
  return _draftJs.EditorState.forceSelection(newEditorState, emojiReplacedContent.getSelectionAfter());
};

exports.default = addEmoji;