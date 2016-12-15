'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _draftJs = require('draft-js');

var _createDecorator = require('./createDecorator');

var _createDecorator2 = _interopRequireDefault(_createDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = {
  getEditorRef: undefined,
  getReadOnly: undefined,
  getEditorState: undefined,
  setEditorState: undefined
};

var createSetResizeData = function createSetResizeData(contentBlock, _ref) {
  var getEditorState = _ref.getEditorState,
      setEditorState = _ref.setEditorState;
  return function (data) {
    var entityKey = contentBlock.getEntityAt(0);
    if (entityKey) {
      var editorState = getEditorState();
      _draftJs.Entity.mergeData(entityKey, _extends({}, data));
      setEditorState(_draftJs.EditorState.forceSelection(editorState, editorState.getSelection()));
    }
  };
};

exports.default = function (config) {
  return {
    initialize: function initialize(_ref2) {
      var getEditorRef = _ref2.getEditorRef,
          getReadOnly = _ref2.getReadOnly,
          getEditorState = _ref2.getEditorState,
          setEditorState = _ref2.setEditorState;

      store.getReadOnly = getReadOnly;
      store.getEditorRef = getEditorRef;
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    },
    decorator: (0, _createDecorator2.default)({ config: config, store: store }),
    blockRendererFn: function blockRendererFn(contentBlock, _ref3) {
      var getEditorState = _ref3.getEditorState,
          setEditorState = _ref3.setEditorState;

      var entityKey = contentBlock.getEntityAt(0);
      var resizeData = entityKey ? _draftJs.Entity.get(entityKey).data : {};
      return {
        props: {
          resizeData: resizeData,
          setResizeData: createSetResizeData(contentBlock, { getEditorState: getEditorState, setEditorState: setEditorState })
        }
      };
    }
  };
};