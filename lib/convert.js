'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editorStateFromHtml = editorStateFromHtml;
exports.editorStateToHtml = editorStateToHtml;
exports.editorStateToJSON = editorStateToJSON;
exports.editorStateFromRaw = editorStateFromRaw;
exports.editorStateFromText = editorStateFromText;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftConvert = require('draft-convert');

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REGEX_LF = new RegExp('\n', 'g'); /*
                                       * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                       * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
                                       *
                                       * License: MIT
                                       */

function editorStateFromHtml(rawHtml) {
  if (rawHtml === null) {
    return _draftJs.EditorState.createEmpty();
  }

  var html = rawHtml.replace(REGEX_LF, '');
  var contentState = (0, _draftConvert.convertFromHTML)({
    htmlToStyle: function htmlToStyle(nodeName, node, currentStyle) {
      if (node.className !== undefined) {
        return currentStyle.add(node.className);
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
        var caption = '',
            title = '',
            alt = '',
            src = '',
            srcSet = '',
            blockType = 'image';
        if (node.title) {
          title = node.title;
        }
        if (node.alt) {
          alt = node.alt;
        }
        if (node.srcset) {
          srcSet = node.srcset;
        } else {
          srcSet = node.src;
        }
        return {
          type: 'atomic',
          data: {
            src: node.src,
            srcSet: srcSet,
            type: blockType,
            title: title,
            alt: alt
          }
        };
      }

      if (nodeName === 'iframe' && node.className !== 'ld-video-block') {
        return {
          type: 'atomic',
          data: {
            src: node.getAttribute('src'),
            type: 'video',
            caption: ''
          }
        };
      }

      if (nodeName === 'figure') {
        if (!node.children.length) {
          return null;
        }

        var _caption = '',
            _title = '',
            _alt = '',
            _src = '',
            _srcSet = '',
            _blockType = 'image';
        var captionNode = node.children[1];
        if (captionNode !== undefined) {
          _caption = captionNode.innerHTML;
        }

        var blockNode = node.children[0];
        var type = blockNode.tagName.toLowerCase();
        if (type === 'iframe') {
          _blockType = 'video';
        }

        if (blockNode !== undefined) {
          _src = _blockType === 'video' ? node.children[0].getAttribute('src') : blockNode.src;
          _srcSet = blockNode.srcset || node.children[0].getAttribute('src');
          _alt = blockNode.alt;
          _title = blockNode.title;
        }

        return {
          type: 'atomic',
          data: {
            src: _src,
            type: _blockType,
            srcSet: _srcSet,
            caption: _caption,
            title: _title,
            alt: _alt
          }
        };
      }

      if (nodeName === 'p') {
        if (node.className === 'ld-quote' || node.className === 'quote') {
          return { type: 'quote' };
        }
      }
    }
  })(html);

  return _draftJs.EditorState.createWithContent(contentState);
}

function editorStateToHtml(editorState) {
  if (!editorState) {
    return;
  }

  return (0, _draftConvert.convertToHTML)({
    styleToHTML: function styleToHTML(style) {
      return _react2.default.createElement('span', {
        style: style === 'UNDERLINE' ? { textDecoration: 'underline' } : style === 'BOLD' ? { fontWeight: 'bold' } : style === 'ITALIC' ? { fontStyle: 'italic' } : {}
      });
    },
    blockToHTML: function blockToHTML(block) {
      var type = block.type;
      if (type === 'atomic') {
        var _type = block.data['type'];
        var src = block.data['src'];
        var alt = block.data['alt'];
        var title = block.data['title'];
        var caption = block.data['caption'];
        if (alt === '') {
          alt = caption;
        }
        if (title === '') {
          title = caption;
        }

        if (src && _type === 'image') {
          return _react2.default.createElement('img', { src: src, alt: alt, title: title });
        }
        if (src && _type === 'embed') {
          return _react2.default.createElement('iframe', { width: '560', height: '315', src: src, frameBorder: '0', allowFullScreen: true });
        }
        return { start: '<span>', end: '</span>' };
      }
      if (type === 'unstyled') {
        return _react2.default.createElement('p', null);
      }
      return _react2.default.createElement('span', null);
    },
    entityToHTML: function entityToHTML(entity, originalText) {
      if (entity.type === 'IMAGE') {
        return '<img src=\'' + entity.data.src + '\' />';
      }
      if (entity.type === 'LINK') {
        return _react2.default.createElement(
          'a',
          { href: entity.data.url },
          originalText
        );
      }
      return originalText;
    }
  })(editorState.getCurrentContent());
}

function editorStateToJSON(editorState) {
  if (editorState) {
    var content = editorState.getCurrentContent();
    return JSON.stringify((0, _draftJs.convertToRaw)(content), null, 2);
  }
}

function editorStateFromRaw(rawContent) {
  if (Object.keys(rawContent).length === 0) {
    return _draftJs.EditorState.createEmpty();
  }
  if (rawContent) {
    var content = (0, _draftJs.convertFromRaw)(rawContent);
    return _draftJs.EditorState.createWithContent(content);
  } else {
    return _draftJs.EditorState.createEmpty();
  }
}

function editorStateFromText(text) {
  if (text) {
    return _draftJs.EditorState.createWithContent(_draftJs.ContentState.createFromText(text));
  } else {
    return _draftJs.EditorState.createEmpty();
  }
}