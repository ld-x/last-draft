'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  font-family: Open Sans, sans-serif;\n  letter-spacing: -0.037rem;\n  line-height: 1.75rem;\n  height: 0;\n  position: relative;\n  z-index: 10;\n  transform: translateY(8px);\n'], ['\n  font-family: Open Sans, sans-serif;\n  letter-spacing: -0.037rem;\n  line-height: 1.75rem;\n  height: 0;\n  position: relative;\n  z-index: 10;\n  transform: translateY(8px);\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  position: relative;\n  transition: background-color 0.2s ease-in-out;\n'], ['\n  position: relative;\n  transition: background-color 0.2s ease-in-out;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _selection = require('../../utils/selection');

var _Search = require('./Search');

var _Search2 = _interopRequireDefault(_Search);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _default = function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this, props));

    _this.state = {
      position: {},
      rangeLeft: 0
    };
    return _this;
  }

  _createClass(_default, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.setBarPosition();
    }
  }, {
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

      var updatedState = _draftJs.Modifier.replaceText(editorState.getCurrentContent(), targetRange, user.name, editorState.getCurrentInlineStyle(), _draftJs.Entity.create('MENTION', 'IMMUTABLE', {
        url: user.link,
        avatar: user.avatar,
        name: user.name,
        className: 'ld-mention'
      }));
      onChange(_draftJs.EditorState.push(editorState, updatedState, 'insert-characters'));
      this.props.closeMentionList();
    }
  }, {
    key: 'setBarPosition',
    value: function setBarPosition() {
      var editorWrapper = this.props.editorWrapper;
      var selectionCoords = (0, _selection.getSelectionCoords)(editorWrapper, 0, 0);
      var hasFocus = this.props.editorState.getSelection().getHasFocus();

      if (!selectionCoords) {
        return null;
      }
      if (!hasFocus) {
        return null;
      }

      if (selectionCoords && !this.state.position || this.state.position.top !== selectionCoords.offsetTop || this.state.position.left !== selectionCoords.offsetLeft) {
        this.setState({
          rangeLeft: selectionCoords.rangeLeft,
          position: {
            top: selectionCoords.offsetTop,
            left: selectionCoords.offsetLeft
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _context;

      var position = this.state.position;
      var mentionSearchValue = this.props.mentionSearchValue;

      var showMentions = mentionSearchValue.length > 0;

      if (this.props.readOnly) {
        return null;
      }

      var menuStyle = { display: showMentions ? 'block' : 'none' };
      if (position !== undefined) {
        menuStyle = Object.assign(position, menuStyle);
        menuStyle = _extends({}, menuStyle);
      }

      return _react2.default.createElement(
        MentionListWrapper,
        { style: menuStyle, className: 'ld-mention-list-wrapper' },
        _react2.default.createElement(
          'div',
          { style: { position: 'absolute', bottom: '0' } },
          _react2.default.createElement(
            MentionList,
            { className: 'ld-mention-list' },
            showMentions && _react2.default.createElement(
              'div',
              { style: { whiteSpace: 'nowrap' } },
              _react2.default.createElement(_Search2.default, {
                searchValue: this.props.mentionSearchValue,
                mentionUsers: this.props.mentionUsers,
                mentionUsersAsync: this.props.mentionUsersAsync,
                searchKey: 'name',
                closeMentionList: (_context = this.props).closeMentionList.bind(_context),
                onClick: this.setMention.bind(this) })
            )
          )
        )
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;


var MentionListWrapper = _styledComponents2.default.div(_templateObject);

var MentionList = _styledComponents2.default.div(_templateObject2);