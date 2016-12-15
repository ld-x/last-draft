'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _addBlock = require('./modifiers/addBlock');

var _addBlock2 = _interopRequireDefault(_addBlock);

var _removeBlock = require('./modifiers/removeBlock');

var _removeBlock2 = _interopRequireDefault(_removeBlock);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (selection, dataTransfer, isInternal, _ref) {
  var getEditorState = _ref.getEditorState,
      setEditorState = _ref.setEditorState;

  var editorState = getEditorState();

  // Get data 'text' (anything else won't move the cursor) and expecting kind of data (text/key)
  var raw = dataTransfer.data.getData('text');
  var data = raw ? raw.split(':') : [];

  if (data.length !== 2) {
    return undefined;
  }

  // Existing block dropped
  if (data[0] === _constants.DRAFTJS_BLOCK_KEY) {
    var blockKey = data[1];

    // Get content, selection, block
    var block = editorState.getCurrentContent().getBlockForKey(blockKey);
    var entity = _draftJs.Entity.get(block.getEntityAt(0));
    var contentStateAfterInsert = (0, _addBlock2.default)(editorState, selection, block.getType(), entity.data, entity.type);
    var contentStateAfterRemove = (0, _removeBlock2.default)(contentStateAfterInsert, blockKey);

    // force to new selection
    var newSelection = new _draftJs.SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: blockKey,
      focusOffset: 0
    });
    var newState = _draftJs.EditorState.push(editorState, contentStateAfterRemove, 'move-block');
    setEditorState(_draftJs.EditorState.forceSelection(newState, newSelection));
  }

  return 'handled';
};