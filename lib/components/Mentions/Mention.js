'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Search = require('./Search');

var _Search2 = _interopRequireDefault(_Search);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Link = function (_Component) {
  _inherits(Link, _Component);

  function Link() {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).apply(this, arguments));
  }

  _createClass(Link, [{
    key: 'setMention',
    value: function setMention(user) {
      var _props = this.props,
          editorState = _props.editorState,
          onChange = _props.onChange,
          mentionSearchValue = _props.mentionSearchValue;


      if (user === null || user === undefined) {
        this.props.closeMentionList();
        return;
      }

      var selectionState = editorState.getSelection();
      var contentState = editorState.getCurrentContent();
      var block = contentState.getBlockForKey(selectionState.getStartKey());

      var start = selectionState.getEndOffset() - (mentionSearchValue.length + 1);
      var end = selectionState.getEndOffset();

      var targetRange = new _draftJs.SelectionState({
        anchorKey: block.getKey(),
        anchorOffset: start,
        focusKey: block.getKey(),
        focusOffset: end
      });

      var updatedState = _draftJs.Modifier.replaceText(editorState.getCurrentContent(), targetRange, user.name, editorState.getCurrentInlineStyle(), _draftJs.Entity.create('LINK', 'IMMUTABLE', {
        type: 'mention',
        url: user.link,
        avatar: user.avatar,
        name: user.name
      }));
      onChange(_draftJs.EditorState.push(editorState, updatedState, 'insert-characters'));
      this.props.closeMentionList();
    }
  }, {
    key: 'handleItemClick',
    value: function handleItemClick(item) {
      this.setMention(item);
    }
  }, {
    key: 'render',
    value: function render() {
      var _context;

      var theme = this.props.theme;


      return _react2.default.createElement(
        'div',
        { style: { whiteSpace: 'nowrap' } },
        _react2.default.createElement(_Search2.default, {
          searchValue: this.props.mentionSearchValue,
          mentionUsers: this.props.mentionUsers,
          mentionUsersAsync: this.props.mentionUsersAsync,
          searchKey: 'name',
          closeMentionList: (_context = this.props).closeMentionList.bind(_context),
          onClick: this.handleItemClick.bind(this) })
      );
    }
  }]);

  return Link;
}(_react.Component);

exports.default = Link;