"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

var _draftJs = require("draft-js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = _immutable2.default.List,
    Map = _immutable2.default.Map;


function insertDataBlock(editorState, data, selection) {
  var contentState = editorState.getCurrentContent();
  var selectionState = selection !== undefined ? selection : editorState.getSelection();
  var afterRemoval = _draftJs.Modifier.removeRange(contentState, selectionState, 'backward');
  var targetSelection = afterRemoval.getSelectionAfter();
  var afterSplit = _draftJs.Modifier.splitBlock(afterRemoval, targetSelection);
  var insertionTarget = afterSplit.getSelectionAfter();
  var asAtomicBlock = _draftJs.Modifier.setBlockType(afterSplit, insertionTarget, 'atomic');

  var block = new _draftJs.ContentBlock({
    key: (0, _draftJs.genKey)(),
    type: "atomic",
    text: "",
    characterList: List(),
    data: new Map(data)
  });

  var fragmentArray = [block, new _draftJs.ContentBlock({
    key: (0, _draftJs.genKey)(),
    type: "unstyled",
    text: "",
    characterList: List()
  })];

  var fragment = _draftJs.BlockMapBuilder.createFromArray(fragmentArray);

  var withAtomicBlock = _draftJs.Modifier.replaceWithFragment(asAtomicBlock, insertionTarget, fragment);

  var newContent = withAtomicBlock.merge({
    selectionBefore: selectionState,
    selectionAfter: withAtomicBlock.getSelectionAfter().set("hasFocus", true)
  });

  return _draftJs.EditorState.push(editorState, newContent, "insert-fragment");
}

exports.default = insertDataBlock;