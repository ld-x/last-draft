'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editorStateFromHtml = editorStateFromHtml;
exports.editorStateToHtml = editorStateToHtml;
exports.editorStateToJSON = editorStateToJSON;
exports.editorStateFromRaw = editorStateFromRaw;
exports.getSelectedBlockElement = getSelectedBlockElement;
exports.getSelectionCoords = getSelectionCoords;
exports.createTypeStrategy = createTypeStrategy;

var _draftConvert = require('draft-convert');

var _draftJsExportHtml = require('draft-js-export-html');

var _draftJs = require('draft-js');

var _defaultDecorator = require('./decorators/defaultDecorator');

var _defaultDecorator2 = _interopRequireDefault(_defaultDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function editorStateFromHtml(html) {
  var decorator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaultDecorator2.default;

  if (html === null) {
    return _draftJs.EditorState.createEmpty(decorator);
  }

  var contentState = (0, _draftConvert.convertFromHTML)({
    htmlToEntity: function htmlToEntity(nodeName, node) {
      if (nodeName === 'a') {
        return _draftJs.Entity.create('LINK', 'MUTABLE', { url: node.href, target: node.target });
      }
    },
    htmlToBlock: function htmlToBlock(nodeName, node) {
      if (nodeName === 'img') {
        return {
          type: 'atomic',
          data: { src: node.src, type: 'image' }
        };
      }
    }
  })(html);

  return _draftJs.EditorState.createWithContent(contentState, decorator);
}

function editorStateToHtml(editorState) {
  if (editorState) {
    var content = editorState.getCurrentContent();
    return (0, _draftJsExportHtml.stateToHTML)(content, {
      blockRenderers: {
        atomic: function atomic(block) {
          var data = block.getData();
          var url = data.get('src');
          if (url) {
            return '<img src="' + url + '" />';
          }
        }
      }
    });
  }
}

function editorStateToJSON(editorState) {
  if (editorState) {
    var content = editorState.getCurrentContent();
    return JSON.stringify((0, _draftJs.convertToRaw)(content), null, 2);
  }
}

function editorStateFromRaw(rawContent) {
  var decorator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaultDecorator2.default;

  if (rawContent) {
    var content = (0, _draftJs.convertFromRaw)(rawContent);
    return _draftJs.EditorState.createWithContent(content, decorator);
  } else {
    return _draftJs.EditorState.createEmpty(decorator);
  }
}

function getSelectedBlockElement(range) {
  var node = range.startContainer;
  do {
    var nodeIsDataBlock = node.getAttribute ? node.getAttribute("data-block") : null;
    if (nodeIsDataBlock) {
      return node;
    }
    node = node.parentNode;
  } while (node !== null);
  return null;
}

function getSelectionCoords(editor, toolbar) {
  var editorBounds = editor.getBoundingClientRect();
  var rangeBounds = (0, _draftJs.getVisibleSelectionRect)(window);

  if (!rangeBounds || !toolbar) {
    return null;
  }

  var rangeWidth = rangeBounds.right - rangeBounds.left;
  var toolbarHeight = toolbar.offsetHeight;
  var offsetLeft = rangeBounds.left - editorBounds.left + rangeWidth / 2;
  var offsetTop = rangeBounds.top - editorBounds.top - toolbarHeight;
  var offsetBottom = editorBounds.bottom - rangeBounds.top;
  return { offsetLeft: offsetLeft, offsetTop: offsetTop, offsetBottom: offsetBottom };
}

function createTypeStrategy(type) {
  return function (contentBlock, callback) {
    contentBlock.findEntityRanges(function (character) {
      var entityKey = character.getEntity();
      return entityKey !== null && _draftJs.Entity.get(entityKey).getType() === type;
    }, callback);
  };
}