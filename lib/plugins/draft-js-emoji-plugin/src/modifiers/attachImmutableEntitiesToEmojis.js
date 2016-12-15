'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = attachImmutableEntitiesToEmojis;

var _draftJs = require('draft-js');

var _findWithRegex = require('find-with-regex');

var _findWithRegex2 = _interopRequireDefault(_findWithRegex);

var _emojione = require('emojione');

var _emojione2 = _interopRequireDefault(_emojione);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unicodeRegex = new RegExp(_emojione2.default.unicodeRegexp, 'g');

/*
 * Attaches Immutable DraftJS Entities to the Emoji text.
 *
 * This is necessary as emojis consist of 2 characters (unicode). By making them
 * immutable the whole Emoji is removed when hitting backspace.
 */
function attachImmutableEntitiesToEmojis(editorState) {
  var contentState = editorState.getCurrentContent();
  var blocks = contentState.getBlockMap();
  var newContentState = contentState;

  blocks.forEach(function (block) {
    var plainText = block.getText();

    var addEntityToEmoji = function addEntityToEmoji(start, end) {
      var existingEntityKey = block.getEntityAt(start);
      if (existingEntityKey) {
        // avoid manipulation in case the emoji already has an entity
        var entity = _draftJs.Entity.get(existingEntityKey);
        if (entity && entity.get('type') === 'emoji') {
          return;
        }
      }

      var selection = _draftJs.SelectionState.createEmpty(block.getKey()).set('anchorOffset', start).set('focusOffset', end);
      var emojiText = plainText.substring(start, end);
      var entityKey = _draftJs.Entity.create('emoji', 'IMMUTABLE', { emojiUnicode: emojiText });
      newContentState = _draftJs.Modifier.replaceText(newContentState, selection, emojiText, null, entityKey);
    };

    (0, _findWithRegex2.default)(unicodeRegex, block, addEntityToEmoji);
  });

  if (!newContentState.equals(contentState)) {
    return _draftJs.EditorState.push(editorState, newContentState, 'convert-to-immutable-emojis');
  }

  return editorState;
}