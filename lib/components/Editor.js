'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

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

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _default = function (_Component) {
  _inherits(_default, _Component);

  _createClass(_default, null, [{
    key: 'defaultProps',
    get: function get() {
      return {
        inline: ['bold', 'italic', 'strikethrough', 'code', 'dropcap'],
        entities: ['link'],
        blocks: ['ul', 'ol', 'h2', 'blockquote'],
        placeholder: 'Enter text...',
        autofocus: false,
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
      uploading: false
    };
    _this.onChange = _this.onChange.bind(_this);
    _this.setReadOnly = _this.setReadOnly.bind(_this);
    _this.uploadFile = _this.uploadFile.bind(_this);
    _this.openToolbar = _this.openToolbar.bind(_this);
    _this.resetStateFromHtml = _this.resetStateFromHtml.bind(_this);
    _this.returnStateAsHtml = _this.returnStateAsHtml.bind(_this);
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

          var action = this.getAction(inline);
          actions.push(action);
        }
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

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.props.entities[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var ent = _step2.value;

          var _action = this.getAction(ent);
          actions.push(_action);
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

      actions.push({ type: "separator" });

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.props.blocks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var block = _step3.value;

          var _action2 = this.getAction(block);
          actions.push(_action2);
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

      actions.push({ type: "separator" });

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.plugins[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var plugin = _step4.value;

          if (plugin.type === 'placeholder') {
            continue;
          }

          if (plugin.modal) {
            actions.push({ type: 'plugin', label: plugin.type, icon: plugin.button, modal: plugin.modal });
          } else {
            actions.push({ type: 'plugin', label: plugin.type, icon: plugin.button });
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

      return actions;
    }
  }, {
    key: 'getAction',
    value: function getAction(label) {
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = _actions2.default[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var action = _step5.value;

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
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.props.plugins[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var plugin = _step6.value;

          if (!plugin || typeof plugin.type !== 'string') {
            console.warn('Plugin: Missing type field: ', plugin);
            continue;
          }
          plugins.push(plugin);
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

      return plugins;
    }
  }, {
    key: 'getPluginsByType',
    value: function getPluginsByType() {
      var pluginsByType = {};
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = this.plugins[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var plugin = _step7.value;

          pluginsByType[plugin.type] = plugin;
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

      return pluginsByType;
    }
  }, {
    key: 'onChange',
    value: function onChange(editorState) {
      this.props.onChange(editorState);
      this.closeToolbar(editorState);
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
    key: 'keyBindingFn',
    value: function keyBindingFn(e) {
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = this.keyBindings[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var kb = _step8.value;

          if (kb.isKeyBound(e)) {
            return kb.name;
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      return (0, _draftJs.getDefaultKeyBinding)(e);
    }
  }, {
    key: 'onTab',
    value: function onTab(event) {
      event.preventDefault();
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
        component = _Media2.default, editable = false;
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
    key: 'uploadFile',
    value: function uploadFile(file, selection) {
      var _this2 = this;

      var _props = this.props,
          uploadImageCallBack = _props.uploadImageCallBack,
          editorState = _props.editorState;
      var uploading = this.state.uploading;


      if (file.type.indexOf('image/') !== 0) {
        return;
      }
      if (uploading) {
        return;
      }

      this.setState({ uploading: true });

      if (uploadImageCallBack !== undefined) {
        /* show placeholder */
        var src = window.URL.createObjectURL(file);
        var imageData = { src: src, type: 'placeholder' };
        this.onChange((0, _insertDataBlock2.default)(editorState, imageData, selection));

        uploadImageCallBack(file).then(function (data) {
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
          theme = _props2.theme;

      var plugins = this.plugins;

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
            showToolbar: this.state.showToolbar,
            readOnly: this.state.readOnly,
            openToolbar: this.openToolbar,
            uploadFile: this.uploadFile,
            uploadImageCallBack: this.props.uploadImageCallBack,
            submitHtmlModal: this.resetStateFromHtml,
            returnStateAsHtml: this.returnStateAsHtml,
            onChange: this.onChange,
            actions: this.actions
          }),
          _react2.default.createElement(_draftJs.Editor, {
            ref: 'editor',
            customStyleMap: _styleMap2.default,
            readOnly: this.state.readOnly,
            blockRenderMap: _block.blockRenderMap,
            blockRendererFn: this.blockRendererFn.bind(this),
            blockStyleFn: _block.blockStyleFn,
            onTab: this.onTab,
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