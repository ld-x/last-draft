'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _DraftOffsetKey = require('draft-js/lib/DraftOffsetKey');

var _DraftOffsetKey2 = _interopRequireDefault(_DraftOffsetKey);

var _convert = require('../utils/convert');

var _Toolbar = require('./Toolbar/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Sidebar = require('./Sidebar/Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Atomic = require('./Blocks/Atomic');

var _Atomic2 = _interopRequireDefault(_Atomic);

var _Media = require('./Blocks/Media');

var _Media2 = _interopRequireDefault(_Media);

var _plugins = require('../plugins/');

var _actions = require('../actions/');

var _actions2 = _interopRequireDefault(_actions);

var _insertDataBlock = require('../utils/insertDataBlock');

var _insertDataBlock2 = _interopRequireDefault(_insertDataBlock);

var _block = require('../utils/block');

var _styleMap = require('../utils/styleMap');

var _styleMap2 = _interopRequireDefault(_styleMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var autocompleteOffset = 0;

var _default = function (_Component) {
  _inherits(_default, _Component);

  _createClass(_default, null, [{
    key: 'defaultProps',
    get: function get() {
      return {
        inline: ['bold', 'italic', 'underline', 'code', 'dropcap'],
        entities: ['link'],
        blocks: ['ul', 'ol', 'blockquote'],
        placeholder: 'Enter text...',
        autofocus: false,
        separators: true,
        theme: {
          color: '#fff',
          backgroundColor: '#181818',
          highlight: '#9d1d20'
        }
      };
    }
  }]);

  function _default(props) {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this, props));

    _this.state = {
      readOnly: _this.props.readOnly || false,
      uploading: false,
      openToolbar: false,
      mentionSearchValue: '',
      emojiSearchValue: ''
    };
    _this.onChange = _this.onChange.bind(_this);
    _this.setReadOnly = _this.setReadOnly.bind(_this);
    _this.uploadFile = _this.uploadFile.bind(_this);
    _this.openToolbar = _this.openToolbar.bind(_this);
    _this.resetStateFromHtml = _this.resetStateFromHtml.bind(_this);
    _this.returnStateAsHtml = _this.returnStateAsHtml.bind(_this);
    _this.closeMentionList = _this.closeMentionList.bind(_this);
    _this.closeEmojiList = _this.closeEmojiList.bind(_this);
    _this.plugins = _this.getValidPlugins();
    _this.actions = _this.getActions();
    _this.pluginsByType = _this.getPluginsByType();
    _this.keyBindings = _this.props.keyBindings || [];
    return _this;
  }

  _createClass(_default, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var autofocus = this.props.autofocus;

      if (autofocus) {
        this.refs.editor.focus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.readOnly !== nextProps.readOnly) {
        this.setState({ readOnly: nextProps.readOnly });
      }
    }
  }, {
    key: 'getActions',
    value: function getActions() {
      var actions = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.inline[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var inline = _step.value;

          var _action = this.getAction(inline);
          actions.push(_action);
        }

        /* Link entity has an action button */
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var action = this.getAction('link');
      actions.push(action);

      actions.push({ type: 'separator' });

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.props.blocks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var block = _step2.value;

          var _action2 = this.getAction(block);
          actions.push(_action2);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      actions.push({ type: 'separator' });

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.plugins[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var plugin = _step3.value;

          if (plugin.type === 'placeholder') {
            continue;
          }

          if (plugin.modal) {
            actions.push({ type: 'plugin', label: plugin.type, icon: plugin.button, modal: plugin.modal });
          } else {
            if (plugin.button) {
              actions.push({ type: 'plugin', label: plugin.type, icon: plugin.button });
            }
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return actions;
    }
  }, {
    key: 'getAction',
    value: function getAction(label) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = _actions2.default[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var action = _step4.value;

          if (!action || typeof action.type !== 'string') {
            console.warn('Action: Missing type field: ', action);
            continue;
          }

          var actionType = action.label;
          if (action.label.includes('alignment')) {
            actionType = 'alignment';
          }

          if (actionType === label) {
            return action;
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  }, {
    key: 'getValidPlugins',
    value: function getValidPlugins() {
      /* default image plugin */
      var plugins = [_plugins.image, _plugins.placeholder];

      if (!this.props.plugins) {
        return plugins;
      }

      /* props.plugins any extra plugins */
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.props.plugins[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var plugin = _step5.value;

          if (!plugin || typeof plugin.type !== 'string') {
            console.warn('Plugin: Missing type field: ', plugin);
            continue;
          }
          plugins.push(plugin);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return plugins;
    }
  }, {
    key: 'getPluginsByType',
    value: function getPluginsByType() {
      var pluginsByType = {};
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.plugins[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var plugin = _step6.value;

          pluginsByType[plugin.type] = plugin;
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return pluginsByType;
    }
  }, {
    key: 'onChange',
    value: function onChange(editorState) {
      this.props.onChange(editorState);
      this.closeToolbar(editorState);

      this.hideAutocompleteOnMove(editorState);
    }
  }, {
    key: 'hideAutocompleteOnMove',
    value: function hideAutocompleteOnMove(editorState) {
      var plugins = this.getPluginsByType();
      if (plugins.mention === undefined && plugins.emoji === undefined) {
        return;
      }

      var selectionState = editorState.getSelection();
      var focusOffset = selectionState.getFocusOffset();
      if (focusOffset === undefined) {
        return;
      }
      if (focusOffset !== autocompleteOffset) {
        this.closeMentionList();
        this.closeEmojiList();
      }
    }
  }, {
    key: 'openToolbar',
    value: function openToolbar() {
      this.setState({ showToolbar: true });
    }
  }, {
    key: 'closeToolbar',
    value: function closeToolbar(editorState) {
      var hasFocus = editorState.getSelection().getHasFocus();
      if (hasFocus) {
        this.setState({ showToolbar: false });
      }
    }
  }, {
    key: 'closeMentionList',
    value: function closeMentionList() {
      this.setState({ mentionSearchValue: '' });
    }
  }, {
    key: 'closeEmojiList',
    value: function closeEmojiList() {
      this.setState({ emojiSearchValue: '' });
    }
  }, {
    key: 'keyBindingFn',
    value: function keyBindingFn(event) {
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.keyBindings[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var kb = _step7.value;

          if (kb.isKeyBound(e)) {
            return kb.name;
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      this.mentionKeyBinding(event);
      this.emojiKeyBinding(event);
      return (0, _draftJs.getDefaultKeyBinding)(event);
    }
  }, {
    key: 'mentionKeyBinding',
    value: function mentionKeyBinding(event) {
      var plugins = this.getPluginsByType();
      if (plugins.mention === undefined) {
        return;
      }

      var searchValue = this.autocompleteKeyBinding(event, '@');
      if (searchValue === null || searchValue === undefined) {
        this.closeMentionList();
      } else {
        this.setState({ mentionSearchValue: searchValue });
      }
    }
  }, {
    key: 'emojiKeyBinding',
    value: function emojiKeyBinding(event) {
      var plugins = this.getPluginsByType();
      if (plugins.emoji === undefined) {
        return;
      }

      var searchValue = this.autocompleteKeyBinding(event, ':');
      if (searchValue === null || searchValue === undefined) {
        this.closeEmojiList();
      } else {
        this.setState({ emojiSearchValue: searchValue });
      }
    }
  }, {
    key: 'autocompleteKeyBinding',
    value: function autocompleteKeyBinding(event, searchChar) {
      var editorState = this.props.editorState;


      var selectionState = editorState.getSelection();
      var contentState = editorState.getCurrentContent();
      var block = contentState.getBlockForKey(selectionState.getStartKey());
      var text = block.text;
      var focusOffset = selectionState.getFocusOffset();
      var searchValue = null;
      var charOffset = null;

      if (!block.text.includes(searchChar)) {
        return;
      }
      for (var i = focusOffset; i >= 0; i--) {
        var char = text.substr(i, 1);
        if (char === searchChar) {
          charOffset = i;
          break;
        }
      }
      if (charOffset === null) {
        return;
      }

      if (focusOffset > charOffset) {
        /* alphanumeric key or backspace */
        if (event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode === 8 || event.keyCode === 32) {
          var textLength = focusOffset - charOffset;
          var searchText = text.substr(charOffset, textLength);
          if (event.keyCode === 8) {
            searchText = searchText.slice(0, -1);
          } else {
            searchText = searchText + String.fromCharCode(event.keyCode);
          }
          searchValue = searchText.substr(1); /* remove the @ or : */
        }
      }
      if (searchValue !== null) {
        /* Used to check if onChange we moved away */
        autocompleteOffset = event.keyCode === 8 ? focusOffset - 1 : focusOffset + 1;
      }
      return searchValue;
    }
  }, {
    key: 'onTab',
    value: function onTab(event) {
      event.preventDefault();
    }
  }, {
    key: 'onEscape',
    value: function onEscape(event) {
      this.closeEmojiList();
      this.closeMentionList();
    }
  }, {
    key: 'handleKeyCommand',
    value: function handleKeyCommand(command) {
      if (this.keyBindings.length) {
        var kb = this.keyBindings.find(function (k) {
          return k.name === command;
        });
        if (kb) {
          kb.action();
          return true;
        }
      }

      var editorState = this.props.editorState;

      var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.props.onChange(newState);
        return true;
      }
      return false;
    }
  }, {
    key: 'handleReturn',
    value: function handleReturn(event) {
      if (!event.shiftKey) {
        return false;
      }

      var editorState = this.props.editorState;

      var newState = _draftJs.RichUtils.insertSoftNewline(editorState);
      this.props.onChange(newState);
      return true;
    }
  }, {
    key: 'setReadOnly',
    value: function setReadOnly(readOnly) {
      this.setState({ readOnly: readOnly });
    }
  }, {
    key: 'blockRendererFn',
    value: function blockRendererFn(block) {
      if (block.getType() !== 'atomic') {
        return null;
      }

      var type = block.getData().toObject().type;
      var plugin = this.pluginsByType[type] || null;
      if (!plugin) {
        var pluginType = (0, _block.getPluginTypeForBlock)(this.props.editorState, block);
        if (pluginType !== null) {
          plugin = this.pluginsByType[pluginType];
        }
      }
      if (!plugin) {
        return null;
      }

      var component = _Atomic2.default;
      var editable = true;

      if (type === 'image' || type === 'video') {
        component = _Media2.default;
        editable = false;
      }
      if (plugin.editable !== undefined) {
        editable = plugin.editable;
      }

      return {
        component: component,
        editable: editable,
        props: {
          plugin: plugin,
          onChange: this.onChange,
          editorState: this.props.editorState,
          setReadOnly: this.setReadOnly
        }
      };
    }
  }, {
    key: 'renderToolbar',
    value: function renderToolbar(props) {
      return _react2.default.createElement(_Toolbar2.default, props);
    }
  }, {
    key: 'renderSidebar',
    value: function renderSidebar(props) {
      return _react2.default.createElement(_Sidebar2.default, props);
    }
  }, {
    key: 'renderMentionList',
    value: function renderMentionList(props) {
      var plugins = this.getPluginsByType();
      if (plugins.mention === undefined) {
        return null;
      }
      var Autocomplete = plugins.mention.autocomplete;
      return _react2.default.createElement(Autocomplete, props);
    }
  }, {
    key: 'renderEmojiList',
    value: function renderEmojiList(props) {
      var plugins = this.getPluginsByType();
      if (plugins.emoji === undefined) {
        return null;
      }
      var Autocomplete = plugins.emoji.autocomplete;
      return _react2.default.createElement(Autocomplete, props);
    }
  }, {
    key: 'uploadFile',
    value: function uploadFile(file, selection) {
      var _this2 = this;

      var _props = this.props,
          uploadImageAsync = _props.uploadImageAsync,
          editorState = _props.editorState;
      var uploading = this.state.uploading;


      if (file.type.indexOf('image/') !== 0) {
        return;
      }
      if (uploading) {
        return;
      }

      this.setState({ uploading: true });

      if (uploadImageAsync !== undefined) {
        /* show placeholder */
        var src = window.URL.createObjectURL(file);
        var imageData = { src: src, type: 'placeholder' };
        this.onChange((0, _insertDataBlock2.default)(editorState, imageData, selection));

        uploadImageAsync(file).then(function (data) {
          /* show loaded image */
          var srcSet = data.srcSet;
          if (srcSet === undefined) {
            srcSet = data.src;
          }
          var imageData = { src: data.src, srcSet: srcSet, type: 'image' };
          _this2.onChange((0, _insertDataBlock2.default)(editorState, imageData, selection));
          _this2.setState({ uploading: false });
        });
      } else {
        var _src = window.URL.createObjectURL(file);
        var _imageData = { src: _src, type: 'image' };
        this.onChange((0, _insertDataBlock2.default)(editorState, _imageData, selection));
        this.setState({ uploading: false });
      }
    }
  }, {
    key: 'handleDroppedFiles',
    value: function handleDroppedFiles(selection, files) {
      var file = files[0];
      this.uploadFile(file, selection);
    }
  }, {
    key: 'resetStateFromHtml',
    value: function resetStateFromHtml(html) {
      this.onChange((0, _convert.editorStateFromHtml)(html));
    }
  }, {
    key: 'resetStateFromText',
    value: function resetStateFromText(text) {
      this.onChange((0, _convert.editorStateFromText)(text));
    }
  }, {
    key: 'returnStateAsHtml',
    value: function returnStateAsHtml() {
      return (0, _convert.editorStateToHtml)(this.props.editorState);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          editorState = _props2.editorState,
          stripPastedStyles = _props2.stripPastedStyles,
          spellCheck = _props2.spellCheck,
          theme = _props2.theme,
          separators = _props2.separators;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { id: 'editor', ref: 'editorWrapper', className: 'last-draft-editor' },
          this.renderSidebar({
            editorState: editorState,
            openToolbar: this.openToolbar,
            readOnly: this.state.readOnly,
            onChange: this.onChange
          }),
          this.renderToolbar({
            editorWrapper: this.refs.editorWrapper,
            editorState: editorState,
            theme: theme,
            separators: separators,
            showToolbar: this.state.showToolbar,
            readOnly: this.state.readOnly,
            openToolbar: this.openToolbar,
            uploadFile: this.uploadFile,
            uploadImageAsync: this.props.uploadImageAsync,
            submitHtmlModal: this.resetStateFromHtml,
            returnStateAsHtml: this.returnStateAsHtml,
            onChange: this.onChange,
            actions: this.actions
          }),
          this.renderEmojiList({
            editorWrapper: this.refs.editorWrapper,
            editorState: editorState,
            emojiSearchValue: this.state.emojiSearchValue,
            closeEmojiList: this.closeEmojiList,
            onChange: this.onChange
          }),
          this.renderMentionList({
            editorWrapper: this.refs.editorWrapper,
            editorState: editorState,
            mentionUsersAsync: this.props.mentionUsersAsync,
            mentionUsers: this.props.mentionUsers,
            mentionSearchValue: this.state.mentionSearchValue,
            closeMentionList: this.closeMentionList,
            onChange: this.onChange
          }),
          _react2.default.createElement(_draftJs.Editor, {
            ref: 'editor',
            customStyleMap: _styleMap2.default,
            readOnly: this.state.readOnly,
            blockRenderMap: _block.blockRenderMap,
            blockRendererFn: this.blockRendererFn.bind(this),
            blockStyleFn: _block.blockStyleFn,
            onTab: this.onTab.bind(this),
            onEscape: this.onEscape.bind(this),
            handleKeyCommand: this.handleKeyCommand.bind(this),
            handleReturn: this.handleReturn.bind(this),
            handleDroppedFiles: this.handleDroppedFiles.bind(this),
            stripPastedStyles: stripPastedStyles,
            spellCheck: spellCheck,
            keyBindingFn: this.keyBindingFn.bind(this),
            editorState: editorState,
            placeholder: this.props.placeholder,
            onChange: this.onChange })
        )
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;