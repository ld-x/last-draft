'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editorStateFromHtml = editorStateFromHtml;
exports.editorStateToHtml = editorStateToHtml;
exports.editorStateToJSON = editorStateToJSON;
exports.editorStateFromRaw = editorStateFromRaw;

var _draftConvert = require('draft-convert');

var _draftJsExportHtml = require('draft-js-export-html');

var _draftJs = require('draft-js');

var _defaultDecorator = require('../decorators/defaultDecorator');

var _defaultDecorator2 = _interopRequireDefault(_defaultDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function editorStateFromHtml(html) {
  var decorator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaultDecorator2.default;

  if (html === null) {
    return _draftJs.EditorState.createEmpty(decorator);
  }

  var contentState = (0, _draftConvert.convertFromHTML)({
    htmlToStyle: function htmlToStyle(nodeName, node, currentStyle) {
      if (nodeName === 'span' && node.className === 'ld-dropcap') {
        return currentStyle.add('DROPCAP');
      } else {
        return currentStyle;
      }
    },
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

      if (nodeName === 'span') {
        if (node.className === 'ld-quote') {
          return {
            type: 'quote'
          };
        }
      }

      if (nodeName === 'blockquote') {
        if (node.className === 'ld-blockquote') {
          return {
            type: 'blockquote'
          };
        }
      }
    }
  })(html);

  return _draftJs.EditorState.createWithContent(contentState, decorator);
}

function editorStateToHtml(editorState) {
  if (editorState) {
    var content = editorState.getCurrentContent();
    return (0, _draftJsExportHtml.stateToHTML)(content, {
      inlineStyles: {
        'DROPCAP': {
          element: 'span',
          attributes: { class: 'ld-dropcap' }
        }
      },
      blockRenderers: {
        atomic: function atomic(block) {
          var data = block.getData();
          var url = data.get('src');
          if (url) {
            return '<img src=\'' + url + '\' />';
          }
        },
        blockquote: function blockquote(block) {
          var text = block.getText();
          return '<blockquote class=\'ld-blockquote\' >' + text + '</blockquote>';
        },
        quote: function quote(block) {
          var text = block.getText();
          return '<span class=\'ld-quote\' >' + text + '</span>';
        },
        'header-two': function headerTwo(block) {
          var text = block.getText();
          return '<h2 class=\'ld-header\' >' + text + '</h2>';
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