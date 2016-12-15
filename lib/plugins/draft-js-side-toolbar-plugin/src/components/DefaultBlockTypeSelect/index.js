'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _src = require('../../../../draft-js-buttons/src/');

var _BlockTypeSelect = require('../BlockTypeSelect');

var _BlockTypeSelect2 = _interopRequireDefault(_BlockTypeSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultBlockTypeSelect = function DefaultBlockTypeSelect(_ref) {
  var getEditorState = _ref.getEditorState,
      setEditorState = _ref.setEditorState,
      theme = _ref.theme,
      store = _ref.store;

  var structure = [_src.HeadlineOneButton, _src.HeadlineTwoButton, _src.UnorderedListButton, _src.OrderedListButton, _src.BlockquoteButton, _src.CodeBlockButton];

  if (store.getItem('addImageFile') !== undefined) {
    structure.push(_src.AddImageButton);
  }

  return _react2.default.createElement(_BlockTypeSelect2.default, {
    getEditorState: getEditorState,
    setEditorState: setEditorState,
    theme: theme,
    store: store,
    structure: structure
  });
}; // eslint-disable-line import/no-unresolved

exports.default = DefaultBlockTypeSelect;