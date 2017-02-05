'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _templateObject = _taggedTemplateLiteral(['\n              <figure>\n                <img src="', '" srcset="', '" alt="', '" title="', '" class="ld-image-block">\n                <figcaption class="ld-image-caption">', '</figcaption>\n              </figure>\n            '], ['\n              <figure>\n                <img src="', '" srcset="', '" alt="', '" title="', '" class="ld-image-block">\n                <figcaption class="ld-image-caption">', '</figcaption>\n              </figure>\n            ']),
    _templateObject2 = _taggedTemplateLiteral(['\n            <figure>\n              <iframe\n                width="560"\n                height="315"\n                src="', '"\n                class="ld-video-block"\n                frameBorder="0"\n                allowFullScreen>\n              </iframe>\n              <figcaption class="ld-video-caption">', '</figcaption>\n            </figure>\n            '], ['\n            <figure>\n              <iframe\n                width="560"\n                height="315"\n                src="', '"\n                class="ld-video-block"\n                frameBorder="0"\n                allowFullScreen>\n              </iframe>\n              <figcaption class="ld-video-caption">', '</figcaption>\n            </figure>\n            ']);

exports.editorStateFromHtml = editorStateFromHtml;
exports.editorStateToHtml = editorStateToHtml;
exports.editorStateToJSON = editorStateToJSON;
exports.editorStateFromRaw = editorStateFromRaw;
exports.editorStateFromText = editorStateFromText;

var _draftConvert = require('draft-convert');

var _draftJsExportHtml = require('draft-js-export-html');

var _draftJs = require('draft-js');

var _defaultDecorator = require('../decorators/defaultDecorator');

var _defaultDecorator2 = _interopRequireDefault(_defaultDecorator);

var _commonTags = require('common-tags');

var _linkifyIt = require('linkify-it');

var _linkifyIt2 = _interopRequireDefault(_linkifyIt);

var _tlds = require('tlds');

var _tlds2 = _interopRequireDefault(_tlds);

var _hashtag = require('./hashtag');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /*
                                                                                                                                                   * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                   * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
                                                                                                                                                   *
                                                                                                                                                   * License: MIT
                                                                                                                                                   */

var linkify = (0, _linkifyIt2.default)();
linkify.tlds(_tlds2.default);

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

        var blockNode = node.children[0];
        if (blockNode !== undefined) {
          _src = blockNode.src;
          _srcSet = blockNode.srcset;
          _alt = blockNode.alt;
          _title = blockNode.title;
        }

        var type = blockNode.tagName.toLowerCase();
        if (type === 'iframe') {
          _blockType = 'video';
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
    var _ret = function () {
      var content = editorState.getCurrentContent();

      var convertedHTML = (0, _draftJsExportHtml.stateToHTML)(content, {
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
            var src = data.get('src');
            var srcSet = data.get('srcSet');
            var alt = data.get('alt');
            var title = data.get('title');
            var caption = data.get('caption');
            if (alt === '') {
              alt = caption;
            }
            if (title === '') {
              title = caption;
            }

            if (src && type == 'image') {
              return (0, _commonTags.html)(_templateObject, src, srcSet, alt, title, caption);
            }
            if (src && type == 'video') {
              return (0, _commonTags.html)(_templateObject2, src, caption);
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

      /* logic for linkify due to no Entity support in stateToHTML */
      var convertedHTMLLinkify = convertedHTML;
      var linkifyMatch = linkify.match(convertedHTML);
      if (linkifyMatch !== null) {
        convertedHTMLLinkify = linkifyMatch.filter(function (match) {
          if (/(src|ref)=('|")/.test(convertedHTML.slice(match.index - 5, match.index))) {
            return;
          } else {
            return match;
          }
        }).reduce(function (current, match) {
          return current.replace(match.url, '<a href="' + match.url + '">' + match.url + '</a>');
        }, convertedHTML);
      }

      /* logic for hashtags due to no Entity support in stateToHTML */
      var convertedHTMLHash = convertedHTMLLinkify;
      var hashMatch = (0, _hashtag.extractHashtagsWithIndices)(convertedHTMLHash);
      if (hashMatch !== null) {
        convertedHTMLHash = hashMatch.reduce(function (current, match) {
          return current.replace('#' + match.hashtag, '<span class="hashtag">' + ('#' + match.hashtag) + '</span>');
        }, convertedHTMLLinkify);
      }

      return {
        v: convertedHTMLHash
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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

  if (Object.keys(rawContent).length === 0) {
    return _draftJs.EditorState.createEmpty(decorator);
  }
  if (rawContent) {
    var content = (0, _draftJs.convertFromRaw)(rawContent);
    return _draftJs.EditorState.createWithContent(content, decorator);
  } else {
    return _draftJs.EditorState.createEmpty(decorator);
  }
}

function editorStateFromText(text) {
  var decorator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaultDecorator2.default;

  if (text) {
    return _draftJs.EditorState.createWithContent(_draftJs.ContentState.createFromText(text), decorator);
  } else {
    return _draftJs.EditorState.createEmpty(decorator);
  }
}