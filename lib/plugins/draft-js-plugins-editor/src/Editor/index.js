'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _immutable = require('immutable');

var _MultiDecorator = require('./MultiDecorator');

var _MultiDecorator2 = _interopRequireDefault(_MultiDecorator);

var _createCompositeDecorator = require('./createCompositeDecorator');

var _createCompositeDecorator2 = _interopRequireDefault(_createCompositeDecorator);

var _moveSelectionToEnd = require('./moveSelectionToEnd');

var _moveSelectionToEnd2 = _interopRequireDefault(_moveSelectionToEnd);

var _proxies = require('./proxies');

var _proxies2 = _interopRequireDefault(_proxies);

var _defaultKeyBindingPlugin = require('./defaultKeyBindingPlugin');

var defaultKeyBindingPlugin = _interopRequireWildcard(_defaultKeyBindingPlugin);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-continue */


/**
 * The main editor component
 */
var PluginEditor = function (_Component) {
  _inherits(PluginEditor, _Component);

  function PluginEditor(props) {
    _classCallCheck(this, PluginEditor);

    var _this = _possibleConstructorReturn(this, (PluginEditor.__proto__ || Object.getPrototypeOf(PluginEditor)).call(this, props));

    _initialiseProps.call(_this);

    var plugins = [_this.props].concat(_toConsumableArray(_this.resolvePlugins()));
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var plugin = _step.value;

        if (typeof plugin.initialize !== 'function') continue;
        plugin.initialize(_this.getPluginMethods());
      }

      // attach proxy methods like `focus` or `blur`
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
      var _loop = function _loop() {
        var method = _step2.value;

        _this[method] = function () {
          var _this$editor;

          return (_this$editor = _this.editor)[method].apply(_this$editor, arguments);
        };
      };

      for (var _iterator2 = _proxies2.default[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop();
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

    _this.state = {}; // TODO for Nik: ask ben why this is relevent
    return _this;
  }

  _createClass(PluginEditor, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var decorators = this.resolveDecorators();
      var compositeDecorator = (0, _createCompositeDecorator2.default)(decorators.filter(function (decorator) {
        return !_this2.decoratorIsCustom(decorator);
      }), this.getEditorState, this.onChange);

      var customDecorators = decorators.filter(function (decorator) {
        return _this2.decoratorIsCustom(decorator);
      });

      var multiDecorator = new _MultiDecorator2.default([].concat(_toConsumableArray(customDecorators), [compositeDecorator]));

      var editorState = _draftJs.EditorState.set(this.props.editorState, { decorator: multiDecorator });
      this.onChange((0, _moveSelectionToEnd2.default)(editorState));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      this.resolvePlugins().forEach(function (plugin) {
        if (plugin.willUnmount) {
          plugin.willUnmount({
            getEditorState: _this3.getEditorState,
            setEditorState: _this3.onChange
          });
        }
      });
    }

    // Cycle through the plugins, changing the editor state with what the plugins
    // changed (or didn't)


    // TODO further down in render we use readOnly={this.props.readOnly || this.state.readOnly}. Ask Ben why readOnly is here just from the props? Why would plugins use this instead of just taking it from getProps?


    // Return true if decorator implements the DraftDecoratorType interface
    // @see https://github.com/facebook/draft-js/blob/master/src/model/decorators/DraftDecoratorType.js

  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var pluginHooks = this.createPluginHooks();
      var customStyleMap = this.resolveCustomStyleMap();
      var accessibilityProps = this.resolveAccessibilityProps();
      var blockRenderMap = this.resolveblockRenderMap();
      return _react2.default.createElement(_draftJs.Editor, _extends({}, this.props, accessibilityProps, pluginHooks, {
        readOnly: this.props.readOnly || this.state.readOnly,
        customStyleMap: customStyleMap,
        blockRenderMap: blockRenderMap,
        onChange: this.onChange,
        editorState: this.props.editorState,
        ref: function ref(element) {
          _this4.editor = element;
        }
      }));
    }
  }]);

  return PluginEditor;
}(_react.Component);

PluginEditor.propTypes = {
  editorState: _react2.default.PropTypes.object.isRequired,
  onChange: _react2.default.PropTypes.func.isRequired,
  plugins: _react2.default.PropTypes.array,
  defaultKeyBindings: _react2.default.PropTypes.bool,
  defaultBlockRenderMap: _react2.default.PropTypes.bool,
  customStyleMap: _react2.default.PropTypes.object,
  decorators: _react2.default.PropTypes.array
};
PluginEditor.defaultProps = {
  defaultBlockRenderMap: true,
  defaultKeyBindings: true,
  customStyleMap: {},
  plugins: [],
  decorators: []
};

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.onChange = function (editorState) {
    var newEditorState = editorState;
    _this5.resolvePlugins().forEach(function (plugin) {
      if (plugin.onChange) {
        newEditorState = plugin.onChange(newEditorState, _this5.getPluginMethods());
      }
    });

    if (_this5.props.onChange) {
      _this5.props.onChange(newEditorState, _this5.getPluginMethods());
    }
  };

  this.getPlugins = function () {
    return _this5.props.plugins.slice(0);
  };

  this.getProps = function () {
    return _extends({}, _this5.props);
  };

  this.getReadOnly = function () {
    return _this5.props.readOnly;
  };

  this.setReadOnly = function (readOnly) {
    if (readOnly !== _this5.state.readOnly) _this5.setState({ readOnly: readOnly });
  };

  this.getEditorRef = function () {
    return _this5.editor;
  };

  this.getEditorState = function () {
    return _this5.props.editorState;
  };

  this.getPluginMethods = function () {
    return {
      getPlugins: _this5.getPlugins,
      getProps: _this5.getProps,
      setEditorState: _this5.onChange,
      getEditorState: _this5.getEditorState,
      getReadOnly: _this5.getReadOnly,
      setReadOnly: _this5.setReadOnly,
      getEditorRef: _this5.getEditorRef
    };
  };

  this.createEventHooks = function (methodName, plugins) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var newArgs = [].slice.apply(args);
      newArgs.push(_this5.getPluginMethods());
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = plugins[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var plugin = _step3.value;

          if (typeof plugin[methodName] !== 'function') continue;
          var result = plugin[methodName].apply(plugin, _toConsumableArray(newArgs));
          if (result === true) return true;
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

      return false;
    };
  };

  this.createHandleHooks = function (methodName, plugins) {
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var newArgs = [].slice.apply(args);
      newArgs.push(_this5.getPluginMethods());
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = plugins[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var plugin = _step4.value;

          if (typeof plugin[methodName] !== 'function') continue;
          var result = plugin[methodName].apply(plugin, _toConsumableArray(newArgs));
          if (result === 'handled') return 'handled';
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

      return 'not-handled';
    };
  };

  this.createFnHooks = function (methodName, plugins) {
    return function () {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var newArgs = [].slice.apply(args);

      newArgs.push(_this5.getPluginMethods());

      if (methodName === 'blockRendererFn') {
        var block = { props: {} };
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = plugins[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var plugin = _step5.value;

            if (typeof plugin[methodName] !== 'function') continue;
            var result = plugin[methodName].apply(plugin, _toConsumableArray(newArgs));
            if (result !== undefined && result !== null) {
              var pluginProps = result.props,
                  pluginRest = _objectWithoutProperties(result, ['props']); // eslint-disable-line no-use-before-define


              var _block = block,
                  props = _block.props,
                  rest = _objectWithoutProperties(_block, ['props']); // eslint-disable-line no-use-before-define


              block = _extends({}, rest, pluginRest, { props: _extends({}, props, pluginProps) });
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

        return block.component ? block : false;
      } else if (methodName === 'blockStyleFn') {
        var styles = void 0;
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = plugins[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var _plugin = _step6.value;

            if (typeof _plugin[methodName] !== 'function') continue;
            var _result = _plugin[methodName].apply(_plugin, _toConsumableArray(newArgs));
            if (_result !== undefined && _result !== null) {
              styles = (styles ? styles + ' ' : '') + _result;
            }
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

        return styles || false;
      }

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = plugins[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _plugin2 = _step7.value;

          if (typeof _plugin2[methodName] !== 'function') continue;
          var _result2 = _plugin2[methodName].apply(_plugin2, _toConsumableArray(newArgs));
          if (_result2 !== undefined) {
            return _result2;
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

      return false;
    };
  };

  this.createPluginHooks = function () {
    var pluginHooks = {};
    var eventHookKeys = [];
    var handleHookKeys = [];
    var fnHookKeys = [];
    var plugins = [_this5.props].concat(_toConsumableArray(_this5.resolvePlugins()));

    plugins.forEach(function (plugin) {
      Object.keys(plugin).forEach(function (attrName) {
        if (attrName === 'onChange') return;

        // if `attrName` has been added as a hook key already, ignore this one
        if (eventHookKeys.indexOf(attrName) !== -1 || fnHookKeys.indexOf(attrName) !== -1) return;

        var isEventHookKey = attrName.indexOf('on') === 0;
        if (isEventHookKey) {
          eventHookKeys.push(attrName);
          return;
        }

        var isHandleHookKey = attrName.indexOf('handle') === 0;
        if (isHandleHookKey) {
          handleHookKeys.push(attrName);
          return;
        }

        // checks if `attrName` ends with 'Fn'
        var isFnHookKey = attrName.length - 2 === attrName.indexOf('Fn');
        if (isFnHookKey) {
          fnHookKeys.push(attrName);
        }
      });
    });

    eventHookKeys.forEach(function (attrName) {
      pluginHooks[attrName] = _this5.createEventHooks(attrName, plugins);
    });

    handleHookKeys.forEach(function (attrName) {
      pluginHooks[attrName] = _this5.createHandleHooks(attrName, plugins);
    });

    fnHookKeys.forEach(function (attrName) {
      pluginHooks[attrName] = _this5.createFnHooks(attrName, plugins);
    });

    return pluginHooks;
  };

  this.resolvePlugins = function () {
    var plugins = _this5.props.plugins.slice(0);
    if (_this5.props.defaultKeyBindings) {
      plugins.push(defaultKeyBindingPlugin);
    }

    return plugins;
  };

  this.resolveDecorators = function () {
    var _props = _this5.props,
        decorators = _props.decorators,
        plugins = _props.plugins;

    return (0, _immutable.List)([{ decorators: decorators }].concat(_toConsumableArray(plugins))).filter(function (plugin) {
      return plugin.decorators !== undefined;
    }).flatMap(function (plugin) {
      return plugin.decorators;
    });
  };

  this.decoratorIsCustom = function (decorator) {
    return typeof decorator.getDecorations === 'function' && typeof decorator.getComponentForKey === 'function' && typeof decorator.getPropsForKey === 'function';
  };

  this.resolveCustomStyleMap = function () {
    return _this5.props.plugins.filter(function (plug) {
      return plug.customStyleMap !== undefined;
    }).map(function (plug) {
      return plug.customStyleMap;
    }).concat([_this5.props.customStyleMap]).reduce(function (styles, style) {
      return _extends({}, styles, style);
    }, {});
  };

  this.resolveblockRenderMap = function () {
    var blockRenderMap = _this5.props.plugins.filter(function (plug) {
      return plug.blockRenderMap !== undefined;
    }).reduce(function (maps, plug) {
      return maps.merge(plug.blockRenderMap);
    }, (0, _immutable.Map)({}));
    if (_this5.props.defaultBlockRenderMap) {
      blockRenderMap = _draftJs.DefaultDraftBlockRenderMap.merge(blockRenderMap);
    }
    if (_this5.props.blockRenderMap) {
      blockRenderMap = blockRenderMap.merge(_this5.props.blockRenderMap);
    }
    return blockRenderMap;
  };

  this.resolveAccessibilityProps = function () {
    var accessibilityProps = {};
    var plugins = [_this5.props].concat(_toConsumableArray(_this5.resolvePlugins()));
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
      for (var _iterator8 = plugins[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
        var plugin = _step8.value;

        if (typeof plugin.getAccessibilityProps !== 'function') continue;
        var props = plugin.getAccessibilityProps();
        var popupProps = {};

        if (accessibilityProps.ariaHasPopup === undefined) {
          popupProps.ariaHasPopup = props.ariaHasPopup;
        } else if (props.ariaHasPopup === 'true') {
          popupProps.ariaHasPopup = 'true';
        }

        if (accessibilityProps.ariaExpanded === undefined) {
          popupProps.ariaExpanded = props.ariaExpanded;
        } else if (props.ariaExpanded === 'true') {
          popupProps.ariaExpanded = 'true';
        }

        accessibilityProps = _extends({}, accessibilityProps, props, popupProps);
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

    return accessibilityProps;
  };
};

exports.default = PluginEditor;