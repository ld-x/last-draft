'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n              <figure>\n                <img src="', '" alt="', '">\n                <figcaption>', '</figcaption>\n              </figure>\n            '], ['\n              <figure>\n                <img src="', '" alt="', '">\n                <figcaption>', '</figcaption>\n              </figure>\n            ']),
    _templateObject2 = _taggedTemplateLiteral(['\n            <figure>\n              <iframe\n                width="560"\n                height="315"\n                src="', '"\n                className="ld-video-block"\n                frameBorder="0"\n                allowFullScreen>\n              </iframe>\n              <figcaption>', '</figcaption>\n            </figure>\n            '], ['\n            <figure>\n              <iframe\n                width="560"\n                height="315"\n                src="', '"\n                className="ld-video-block"\n                frameBorder="0"\n                allowFullScreen>\n              </iframe>\n              <figcaption>', '</figcaption>\n            </figure>\n            ']);

exports.editorStateFromHtml = editorStateFromHtml;
exports.editorStateToHtml = editorStateToHtml;
exports.editorStateToJSON = editorStateToJSON;
exports.editorStateFromRaw = editorStateFromRaw;

var _draftConvert = require('draft-convert');

var _draftJsExportHtml = require('draft-js-export-html');

var _draftJs = require('draft-js');

var _defaultDecorator = require('../decorators/defaultDecorator');

var _defaultDecorator2 = _interopRequireDefault(_defaultDecorator);

var _commonTags = require('common-tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /*
                                                                                                                                                   * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                   * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
                                                                                                                                                   *
                                                                                                                                                   * License: MIT
                                                                                                                                                   */

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

      if (nodeName === 'figure') {
        if (!node.children.length) {
          return null;
        }

        var caption = '',
            src = '',
            blockType = 'image';
        var captionNode = node.children[1];
        if (captionNode !== undefined) {
          caption = captionNode.innerHTML;
        }
        var blockNode = node.children[0];
        if (blockNode !== undefined) {
          src = blockNode.src;
        }

        var type = blockNode.tagName.toLowerCase();
        if (type === 'iframe') {
          blockType = 'video';
        }

        return {
          type: 'atomic',
          data: { src: src, type: blockType, caption: caption }
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
          var type = data.get('type');
          var url = data.get('src');
          var caption = data.get('caption');
          if (url && type == 'image') {
            return (0, _commonTags.html)(_templateObject, url, caption, caption);
          }
          if (url && type == 'video') {
            return (0, _commonTags.html)(_templateObject2, url, caption);
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