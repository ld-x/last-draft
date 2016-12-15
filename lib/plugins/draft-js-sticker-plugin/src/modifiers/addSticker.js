'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _immutable = require('immutable');

/**
 * Adds a sticker to an editor state
 */

exports.default = function (editorState, stickerId) {
  var currentContentState = editorState.getCurrentContent();
  var currentSelectionState = editorState.getSelection();

  // in case text is selected it is removed and then the sticker is appended
  var afterRemovalContentState = _draftJs.Modifier.removeRange(currentContentState, currentSelectionState, 'backward');

  // deciding on the postion to split the text
  var targetSelection = afterRemovalContentState.getSelectionAfter();
  var blockKeyForTarget = targetSelection.get('focusKey');
  var block = currentContentState.getBlockForKey(blockKeyForTarget);
  var insertionTargetSelection = void 0;
  var insertionTargetBlock = void 0;

  // In case there are no characters or entity or the selection is at the start it
  // is safe to insert the sticker in the current block.
  // Otherwise a new block is created (the sticker is always its own block)
  var isEmptyBlock = block.getLength() === 0 && block.getEntityAt(0) === null;
  var selectedFromStart = currentSelectionState.getStartOffset() === 0;
  if (isEmptyBlock || selectedFromStart) {
    insertionTargetSelection = targetSelection;
    insertionTargetBlock = afterRemovalContentState;
  } else {
    // the only way to insert a new seems to be by splitting an existing in to two
    insertionTargetBlock = _draftJs.Modifier.splitBlock(afterRemovalContentState, targetSelection);

    // the position to insert our blocks
    insertionTargetSelection = insertionTargetBlock.getSelectionAfter();
  }

  // TODO not sure why we need it …
  var newContentStateAfterSplit = _draftJs.Modifier.setBlockType(insertionTargetBlock, insertionTargetSelection, 'sticker');

  // creating a new ContentBlock including the entity with data
  var entityKey = _draftJs.Entity.create('sticker', 'IMMUTABLE', { id: stickerId });
  var charDataOfSticker = _draftJs.CharacterMetadata.create({ entity: entityKey });

  var fragmentArray = [new _draftJs.ContentBlock({
    key: (0, _draftJs.genKey)(),
    type: 'sticker',
    text: '',
    characterList: (0, _immutable.List)((0, _immutable.Repeat)(charDataOfSticker, 1)) }),

  // new contentblock so we can continue wrting right away after inserting the sticker
  new _draftJs.ContentBlock({
    key: (0, _draftJs.genKey)(),
    type: 'unstyled',
    text: '',
    characterList: (0, _immutable.List)() })];

  // create fragment containing the two content blocks
  var fragment = _draftJs.BlockMapBuilder.createFromArray(fragmentArray);

  // replace the contentblock we reserved for our insert
  var contentStateWithSticker = _draftJs.Modifier.replaceWithFragment(newContentStateAfterSplit, insertionTargetSelection, fragment);

  // update editor state with our new state including the sticker
  var newState = _draftJs.EditorState.push(editorState, contentStateWithSticker, 'insert-sticker');
  return _draftJs.EditorState.forceSelection(newState, contentStateWithSticker.getSelectionAfter());
};