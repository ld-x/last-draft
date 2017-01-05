'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _Toolbar = require('./Toolbar/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Sidebar = require('./Sidebar/Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Media = require('./Blocks/Media');

var _Media2 = _interopRequireDefault(_Media);

var _Pullquote = require('./Blocks/Pullquote');

var _Pullquote2 = _interopRequireDefault(_Pullquote);

var _Alignment = require('./Blocks/Alignment');

var _Alignment2 = _interopRequireDefault(_Alignment);

var _plugin = require('../plugins/not-found/plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _plugins = require('../plugins/');

var _plugins2 = _interopRequireDefault(_plugins);

var _actions = require('../actions/');

var _actions2 = _interopRequireDefault(_actions);

var _insertDataBlock = require('../utils/insertDataBlock');

var _insertDataBlock2 = _interopRequireDefault(_insertDataBlock);

var _block = require('../utils/block');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import blockRendererFn from '../utils/block'


var _default = function (_Component) {
  _inherits(_default, _Component);

  _createClass(_default, null, [{
    key: 'defaultProps',
    get: function get() {
      return {
        sideToolbar: ['image', 'video', 'emoji'],
        inlineToolbar: ['bold', 'italic', 'code', 'strikethrough', 'dropcaps', 'link', 'ul', 'ol', 'h2', 'blockquote', 'pullquote'],
        placeholder: 'Enter text...'
      };
    }
  }]);

  function _default(props) {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this, props));

    _this.state = { readOnly: _this.props.readOnly || false };
    _this.onChange = _this.onChange.bind(_this);
    _this.setReadOnly = _this.setReadOnly.bind(_this);
    _this.actions = _this.getActions();
    _this.plugins = _this.getValidPlugins();
    _this.pluginsByType = _this.getPluginsByType();
    _this.keyBindings = _this.props.keyBindings || [];
    return _this;
  }

  _createClass(_default, [{
    key: 'getActions',
    value: function getActions() {
      var actions = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _actions2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var action = _step.value;

          if (!action || typeof action.type !== 'string') {
            console.warn('Action: Missing `type` field. Details: ', action);
            continue;
          }

          var actionType = action.label;
          if (action.label.includes('alignment')) {
            actionType = 'alignment';
          }

          if (this.props.inlineToolbar.includes(actionType)) {
            actions.push(action);
          }
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

      return actions;
    }
  }, {
    key: 'getValidPlugins',
    value: function getValidPlugins() {
      var plugins = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _plugins2.default[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var plugin = _step2.value;

          if (!plugin || typeof plugin.type !== 'string') {
            console.warn('Plugin: Missing `type` field. Details: ', plugin);
            continue;
          }
          var pluginType = plugin.type;
          if (plugin.type.includes('placeholder')) {
            pluginType = 'image';
          }

          if (this.props.sideToolbar.includes(pluginType)) {
            plugins.push(plugin);
          }
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

      return plugins;
    }
  }, {
    key: 'getPluginsByType',
    value: function getPluginsByType() {
      var pluginsByType = {};
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.plugins[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var plugin = _step3.value;

          pluginsByType[plugin.type] = plugin;
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

      return pluginsByType;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.readOnly !== nextProps.readOnly) {
        this.setState({ readOnly: nextProps.readOnly });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(editorState) {
      this.props.onChange(editorState);
    }
  }, {
    key: 'externalKeyBindings',
    value: function externalKeyBindings(e) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.keyBindings[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var kb = _step4.value;

          if (kb.isKeyBound(e)) {
            return kb.name;
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
    key: 'handleBlockNotFound',
    value: function handleBlockNotFound(block) {
      if (this.props.handleBlockNotFound) {
        return this.props.handleBlockNotFound(block);
      }
      return _plugin2.default;
    }
  }, {
    key: 'blockRendererFn',
    value: function blockRendererFn(block) {
      if (block.getType() === 'pullquote') {
        return { component: _Pullquote2.default };
      }
      if (block.getType() === 'alignment-left') {
        return { component: _Alignment2.default, props: { alignment: 'alignment-left' } };
      }
      if (block.getType() === 'alignment-center') {
        return { component: _Alignment2.default, props: { alignment: 'center' } };
      }
      if (block.getType() === 'alignment-right') {
        return { component: _Alignment2.default, props: { alignment: 'alignment-right' } };
      }

      if (block.getType() !== 'atomic') {
        return null;
      }

      var type = block.getData().toObject().type;
      var plugin = this.pluginsByType[type] || this.handleBlockNotFound(block);
      if (!plugin) {
        return null;
      }

      return {
        component: _Media2.default,
        editable: false,
        props: {
          plugin: plugin,
          onChange: this.onChange,
          editorState: this.props.editorState,
          setReadOnly: this.setReadOnly
        }
      };
    }
  }, {
    key: 'renderSidebar',
    value: function renderSidebar(props) {
      var sidebarRendererFn = this.props.sidebarRendererFn;

      if (typeof sidebarRendererFn === 'function') {
        return sidebarRendererFn(props);
      }
      return _react2.default.createElement(_Sidebar2.default, props);
    }
  }, {
    key: 'renderToolbar',
    value: function renderToolbar(props) {
      return _react2.default.createElement(_Toolbar2.default, props);
    }
  }, {
    key: 'handleDroppedFiles',
    value: function handleDroppedFiles(selection, files) {
      var _this2 = this;

      var _props = this.props,
          uploadImageCallBack = _props.uploadImageCallBack,
          editorState = _props.editorState;

      var file = files[0];
      if (file.type.indexOf('image/') !== 0) {
        return;
      }

      if (uploadImageCallBack !== undefined) {
        /* show placeholder */
        var src = window.URL.createObjectURL(file);
        var imageData = { src: src, type: 'placeholder' };
        this.onChange((0, _insertDataBlock2.default)(editorState, imageData, selection));

        uploadImageCallBack(file).then(function (data) {
          /* show loaded image */
          var imageData = { src: data.src, type: 'image' };
          _this2.onChange((0, _insertDataBlock2.default)(editorState, imageData, selection));
        });
      } else {
        var _src = window.URL.createObjectURL(file);
        var _imageData = { src: _src, type: 'image' };
        this.onChange((0, _insertDataBlock2.default)(editorState, _imageData, selection));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          editorState = _props2.editorState,
          stripPastedStyles = _props2.stripPastedStyles,
          spellCheck = _props2.spellCheck;

      var plugins = this.plugins;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { id: 'editor', ref: 'editor', className: 'last-draft-editor' },
          this.renderSidebar({
            plugins: plugins,
            editorState: editorState,
            readOnly: this.state.readOnly,
            onChange: this.onChange,
            uploadImageCallBack: this.props.uploadImageCallBack
          }),
          _react2.default.createElement(_draftJs.Editor, {
            customStyleMap: _block.styleMap,
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
            keyBindingFn: this.externalKeyBindings.bind(this),
            editorState: editorState,
            placeholder: this.props.placeholder,
            onChange: this.onChange }),
          this.renderToolbar({
            editor: this.refs.editor,
            editorState: editorState,
            readOnly: this.state.readOnly,
            onChange: this.onChange,
            actions: this.actions
          })
        )
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;