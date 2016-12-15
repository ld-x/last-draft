'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _Entry = require('./Entry');

var _Entry2 = _interopRequireDefault(_Entry);

var _addEmoji = require('../modifiers/addEmoji');

var _addEmoji2 = _interopRequireDefault(_addEmoji);

var _getSearchText3 = require('../utils/getSearchText');

var _getSearchText4 = _interopRequireDefault(_getSearchText3);

var _decodeOffsetKey = require('../utils/decodeOffsetKey');

var _decodeOffsetKey2 = _interopRequireDefault(_decodeOffsetKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmojiSuggestions = function (_Component) {
  _inherits(EmojiSuggestions, _Component);

  function EmojiSuggestions() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EmojiSuggestions);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EmojiSuggestions.__proto__ || Object.getPrototypeOf(EmojiSuggestions)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isActive: false,
      focusedOptionIndex: 0
    }, _this.componentDidUpdate = function (prevProps, prevState) {
      if (_this.popover) {
        (function () {
          // In case the list shrinks there should be still an option focused.
          // Note: this might run multiple times and deduct 1 until the condition is
          // not fullfilled anymore.
          var size = _this.filteredEmojis.size;
          if (size > 0 && _this.state.focusedOptionIndex >= size) {
            _this.setState({
              focusedOptionIndex: size - 1
            });
          }

          var decoratorRect = _this.props.store.getPortalClientRect(_this.activeOffsetKey);
          var newStyles = _this.props.positionSuggestions({
            decoratorRect: decoratorRect,
            prevProps: prevProps,
            prevState: prevState,
            props: _this.props,
            state: _this.state,
            filteredEmojis: _this.filteredEmojis,
            popover: _this.popover
          });
          Object.keys(newStyles).forEach(function (key) {
            _this.popover.style[key] = newStyles[key];
          });
        })();
      }
    }, _this.componentWillUnmount = function () {
      _this.props.callbacks.onChange = undefined;
    }, _this.onEditorStateChange = function (editorState) {
      var searches = _this.props.store.getAllSearches();

      // if no search portal is active there is no need to show the popover
      if (searches.size === 0) {
        return editorState;
      }

      var removeList = function removeList() {
        _this.props.store.resetEscapedSearch();
        _this.closeDropdown();
        return editorState;
      };

      // get the current selection
      var selection = editorState.getSelection();
      var anchorOffset = selection.getAnchorOffset();

      // the list should not be visible if a range is selected or the editor has no focus
      if (!selection.isCollapsed() || !selection.getHasFocus()) return removeList();

      // identify the start & end positon of each search-text
      var offsetDetails = searches.map(function (offsetKey) {
        return (0, _decodeOffsetKey2.default)(offsetKey);
      });

      // a leave can be empty when it is removed due e.g. using backspace
      var leaves = offsetDetails.map(function (_ref2) {
        var blockKey = _ref2.blockKey,
            decoratorKey = _ref2.decoratorKey,
            leafKey = _ref2.leafKey;
        return editorState.getBlockTree(blockKey).getIn([decoratorKey, 'leaves', leafKey]);
      });

      // if all leaves are undefined the popover should be removed
      if (leaves.every(function (leave) {
        return leave === undefined;
      })) {
        return removeList();
      }

      // Checks that the cursor is after the @ character but still somewhere in
      // the word (search term). Setting it to allow the cursor to be left of
      // the @ causes troubles due selection confusion.
      var selectionIsInsideWord = leaves.filter(function (leave) {
        return leave !== undefined;
      }).map(function (_ref3) {
        var start = _ref3.start,
            end = _ref3.end;
        return start === 0 && anchorOffset === 1 && anchorOffset <= end || // @ is the first character
        anchorOffset > start + 1 && anchorOffset <= end // @ is in the text or at the end
        ;
      });
      if (selectionIsInsideWord.every(function (isInside) {
        return isInside === false;
      })) return removeList();

      _this.activeOffsetKey = selectionIsInsideWord.filter(function (value) {
        return value === true;
      }).keySeq().first();

      _this.onSearchChange(editorState, selection);

      // make sure the escaped search is reseted in the cursor since the user
      // already switched to another emoji search
      if (!_this.props.store.isEscaped(_this.activeOffsetKey)) {
        _this.props.store.resetEscapedSearch();
      }

      // If none of the above triggered to close the window, it's safe to assume
      // the dropdown should be open. This is useful when a user focuses on another
      // input field and then comes back: the dropdown will again.
      if (!_this.state.isActive && !_this.props.store.isEscaped(_this.activeOffsetKey)) {
        _this.openDropdown();
      }

      // makes sure the focused index is reseted every time a new selection opens
      // or the selection was moved to another emoji search
      if (_this.lastSelectionIsInsideWord === undefined || !selectionIsInsideWord.equals(_this.lastSelectionIsInsideWord)) {
        _this.setState({
          focusedOptionIndex: 0
        });
      }

      _this.lastSelectionIsInsideWord = selectionIsInsideWord;

      return editorState;
    }, _this.onSearchChange = function (editorState, selection) {
      var _getSearchText = (0, _getSearchText4.default)(editorState, selection),
          word = _getSearchText.word;

      var searchValue = word.substring(1, word.length);
      if (_this.lastSearchValue !== searchValue && typeof _this.props.onSearchChange === 'function') {
        _this.lastSearchValue = searchValue;
        _this.props.onSearchChange({ value: searchValue });
      }
    }, _this.onDownArrow = function (keyboardEvent) {
      keyboardEvent.preventDefault();
      var newIndex = _this.state.focusedOptionIndex + 1;
      _this.onEmojiFocus(newIndex >= _this.filteredEmojis.size ? 0 : newIndex);
    }, _this.onTab = function (keyboardEvent) {
      keyboardEvent.preventDefault();
      _this.commitSelection();
    }, _this.onUpArrow = function (keyboardEvent) {
      keyboardEvent.preventDefault();
      if (_this.filteredEmojis.size > 0) {
        var newIndex = _this.state.focusedOptionIndex - 1;
        _this.onEmojiFocus(Math.max(newIndex, 0));
      }
    }, _this.onEscape = function (keyboardEvent) {
      keyboardEvent.preventDefault();

      var activeOffsetKey = _this.lastSelectionIsInsideWord.filter(function (value) {
        return value === true;
      }).keySeq().first();
      _this.props.store.escapeSearch(activeOffsetKey);
      _this.closeDropdown();

      // to force a re-render of the outer component to change the aria props
      _this.props.store.setEditorState(_this.props.store.getEditorState());
    }, _this.onEmojiSelect = function (emoji) {
      _this.closeDropdown();
      var newEditorState = (0, _addEmoji2.default)(_this.props.store.getEditorState(), emoji);
      _this.props.store.setEditorState(newEditorState);
    }, _this.onEmojiFocus = function (index) {
      var descendant = 'emoji-option-' + _this.key + '-' + index;
      _this.props.ariaProps.ariaActiveDescendantID = descendant;
      _this.state.focusedOptionIndex = index;

      // to force a re-render of the outer component to change the aria props
      _this.props.store.setEditorState(_this.props.store.getEditorState());
    }, _this.getEmojisForFilter = function () {
      var selection = _this.props.store.getEditorState().getSelection();

      var _getSearchText2 = (0, _getSearchText4.default)(_this.props.store.getEditorState(), selection),
          word = _getSearchText2.word;

      var emojiValue = word.substring(1, word.length).toLowerCase();
      var filteredValues = _this.props.shortNames.filter(function (emojiShortName) {
        return !emojiValue || emojiShortName.indexOf(emojiValue) > -1;
      });
      var size = filteredValues.size < 9 ? filteredValues.size : 9;
      return filteredValues.setSize(size);
    }, _this.commitSelection = function () {
      _this.onEmojiSelect(_this.filteredEmojis.get(_this.state.focusedOptionIndex));
      return 'handled';
    }, _this.openDropdown = function () {
      // This is a really nasty way of attaching & releasing the key related functions.
      // It assumes that the keyFunctions object will not loose its reference and
      // by this we can replace inner parameters spread over different modules.
      // This better be some registering & unregistering logic. PRs are welcome :)
      _this.props.callbacks.onDownArrow = _this.onDownArrow;
      _this.props.callbacks.onUpArrow = _this.onUpArrow;
      _this.props.callbacks.onEscape = _this.onEscape;
      _this.props.callbacks.handleReturn = _this.commitSelection;
      _this.props.callbacks.onTab = _this.onTab;

      var descendant = 'emoji-option-' + _this.key + '-' + _this.state.focusedOptionIndex;
      _this.props.ariaProps.ariaActiveDescendantID = descendant;
      _this.props.ariaProps.ariaOwneeID = 'emojis-list-' + _this.key;
      _this.props.ariaProps.ariaHasPopup = 'true';
      _this.props.ariaProps.ariaExpanded = 'true';
      _this.setState({
        isActive: true
      });

      if (_this.props.onOpen) {
        _this.props.onOpen();
      }
    }, _this.closeDropdown = function () {
      // make sure none of these callbacks are triggered
      _this.props.callbacks.onDownArrow = undefined;
      _this.props.callbacks.onUpArrow = undefined;
      _this.props.callbacks.onTab = undefined;
      _this.props.callbacks.onEscape = undefined;
      _this.props.callbacks.handleReturn = undefined;
      _this.props.ariaProps.ariaHasPopup = 'false';
      _this.props.ariaProps.ariaExpanded = 'false';
      _this.props.ariaProps.ariaActiveDescendantID = undefined;
      _this.props.ariaProps.ariaOwneeID = undefined;
      _this.setState({
        isActive: false
      });

      if (_this.props.onClose) {
        _this.props.onClose();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EmojiSuggestions, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.key = (0, _draftJs.genKey)();
      this.props.callbacks.onChange = this.onEditorStateChange;
    }

    // Get the first 6 emojis that match

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.state.isActive) {
        return null;
      }

      this.filteredEmojis = this.getEmojisForFilter();

      var _props = this.props,
          _props$theme = _props.theme,
          theme = _props$theme === undefined ? {} : _props$theme,
          cacheBustParam = _props.cacheBustParam,
          imagePath = _props.imagePath,
          imageType = _props.imageType,
          ariaProps = _props.ariaProps,
          callbacks = _props.callbacks,
          store = _props.store,
          positionSuggestions = _props.positionSuggestions,
          shortNames = _props.shortNames,
          restProps = _objectWithoutProperties(_props, ['theme', 'cacheBustParam', 'imagePath', 'imageType', 'ariaProps', 'callbacks', 'store', 'positionSuggestions', 'shortNames']);

      return _react2.default.createElement(
        'div',
        _extends({}, restProps, {
          className: theme.emojiSuggestions,
          role: 'listbox',
          id: 'emojis-list-' + this.key,
          ref: function ref(element) {
            _this2.popover = element;
          }
        }),
        this.filteredEmojis.map(function (emoji, index) {
          return _react2.default.createElement(_Entry2.default, {
            key: emoji,
            onEmojiSelect: _this2.onEmojiSelect,
            onEmojiFocus: _this2.onEmojiFocus,
            isFocused: _this2.state.focusedOptionIndex === index,
            emoji: emoji,
            index: index,
            id: 'emoji-option-' + _this2.key + '-' + index,
            theme: theme,
            imagePath: imagePath,
            imageType: imageType,
            cacheBustParam: cacheBustParam
          });
        }).toJS()
      );
    }
  }]);

  return EmojiSuggestions;
}(_react.Component);

exports.default = EmojiSuggestions;