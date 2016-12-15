'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _draftJs = require('draft-js');

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _createDecorator = require('./createDecorator');

var _createDecorator2 = _interopRequireDefault(_createDecorator);

var _AlignmentTool = require('./AlignmentTool');

var _AlignmentTool2 = _interopRequireDefault(_AlignmentTool);

var _createStore = require('./utils/createStore');

var _createStore2 = _interopRequireDefault(_createStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _createStore2.default)({
  isVisible: false
});

var createSetAlignment = function createSetAlignment(contentBlock, _ref) {
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
  var alignmentToolProps = {
    store: store
  };
  return {
    initialize: function initialize(_ref2) {
      var getReadOnly = _ref2.getReadOnly,
          getEditorState = _ref2.getEditorState,
          setEditorState = _ref2.setEditorState;

      store.updateItem('getReadOnly', getReadOnly);
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
    },
    decorator: (0, _createDecorator2.default)({ config: config, store: store }),
    blockRendererFn: function blockRendererFn(contentBlock, _ref3) {
      var getEditorState = _ref3.getEditorState,
          setEditorState = _ref3.setEditorState;

      var entityKey = contentBlock.getEntityAt(0);
      var alignmentData = entityKey ? _draftJs.Entity.get(entityKey).data : {};
      return {
        props: {
          alignment: alignmentData.alignment || 'default',
          setAlignment: createSetAlignment(contentBlock, { getEditorState: getEditorState, setEditorState: setEditorState })
        }
      };
    },
    AlignmentTool: (0, _decorateComponentWithProps2.default)(_AlignmentTool2.default, alignmentToolProps)
  };
};