'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  font-family: Open Sans, sans-serif;\n  color: #181818;\n  letter-spacing: -0.037rem;\n  line-height: 1.75rem;\n  height: 0;\n  position: relative;\n  z-index: 10;\n  transform: translateY(8px);\n'], ['\n  font-family: Open Sans, sans-serif;\n  color: #181818;\n  letter-spacing: -0.037rem;\n  line-height: 1.75rem;\n  height: 0;\n  position: relative;\n  z-index: 10;\n  transform: translateY(8px);\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  background: ', ';\n  box-shadow: 0 1px 18px 0 rgba(0, 0, 0, 0.3);\n  left: -50%;\n  position: relative;\n  transition: background-color 0.2s ease-in-out;\n'], ['\n  background: ', ';\n  box-shadow: 0 1px 18px 0 rgba(0, 0, 0, 0.3);\n  left: -50%;\n  position: relative;\n  transition: background-color 0.2s ease-in-out;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  padding: 4px 6px;\n  margin: 0;\n  whiteSpace: nowrap;\n'], ['\n  padding: 4px 6px;\n  margin: 0;\n  whiteSpace: nowrap;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  margin: ', ';\n  height: ', ';\n  padding-bottom: ', ';\n  transition: height 0.2s ease-in-out;\n  color: #FFF;\n  font-size: 12px !important;\n  font-weight: bold;\n'], ['\n  margin: ', ';\n  height: ', ';\n  padding-bottom: ', ';\n  transition: height 0.2s ease-in-out;\n  color: #FFF;\n  font-size: 12px !important;\n  font-weight: bold;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _ToolbarButton = require('./ToolbarButton');

var _ToolbarButton2 = _interopRequireDefault(_ToolbarButton);

var _LinkToolbar = require('./LinkToolbar');

var _LinkToolbar2 = _interopRequireDefault(_LinkToolbar);

var _selection = require('../../utils/selection');

var _entity = require('../../utils/entity');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var styled = require('styled-components').default;

var _default = function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this, props));

    _this.state = {
      editingEntity: null,
      link: '',
      error: null
    };
    _this.renderButton = _this.renderButton.bind(_this);
    return _this;
  }

  _createClass(_default, [{
    key: 'setError',
    value: function setError(errorMsg) {
      this.setState({ error: errorMsg });
    }
  }, {
    key: 'cancelError',
    value: function cancelError() {
      this.setState({ error: null });
    }
  }, {
    key: 'toggleInlineStyle',
    value: function toggleInlineStyle(inlineStyle) {
      var newEditorState = _draftJs.RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle);
      this.props.onChange(newEditorState);
    }
  }, {
    key: 'toggleBlockStyle',
    value: function toggleBlockStyle(blockType) {
      this.props.onChange(_draftJs.RichUtils.toggleBlockType(this.props.editorState, blockType));
    }
  }, {
    key: 'toggleEntity',
    value: function toggleEntity(entity, active) {
      this.setState({ editingEntity: entity });
    }
  }, {
    key: 'removeEntity',
    value: function removeEntity() {
      var _props = this.props,
          editorState = _props.editorState,
          onChange = _props.onChange;

      var selection = editorState.getSelection();
      if (!selection.isCollapsed()) {
        onChange(_draftJs.RichUtils.toggleLink(editorState, selection, null));
      }
      this.cancelEntity();
    }
  }, {
    key: 'cancelEntity',
    value: function cancelEntity() {
      var editorWrapper = this.props.editorWrapper;

      editorWrapper && editorWrapper.focus();
      this.setState({ editingEntity: null, error: null });
    }
  }, {
    key: 'renderButton',
    value: function renderButton(item, position) {
      var _this2 = this;

      var editorState = this.props.editorState;

      var current = null;
      var toggle = null;
      var active = null;
      var key = item.label;

      switch (item.type) {
        case 'inline':
          {
            current = editorState.getCurrentInlineStyle();
            toggle = function toggle() {
              return _this2.toggleInlineStyle(item.style);
            };
            active = current.has(item.style);
            break;
          }
        case 'block':
          {
            var selection = editorState.getSelection();
            current = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
            toggle = function toggle() {
              return _this2.toggleBlockStyle(item.style);
            };
            active = item.style === current;
            break;
          }
        case 'separator':
          {
            key = 'sep-' + position;
            break;
          }
        case 'entity':
          {
            var _ret = function () {
              var _item$entity = item.entity,
                  entity = _item$entity === undefined ? 'LINK' : _item$entity;

              key = 'entity-' + entity;
              active = (0, _entity.hasEntity)(entity, editorState);
              toggle = function toggle() {
                return _this2.toggleEntity(entity, active);
              };
              return 'break';
            }();

            if (_ret === 'break') break;
          }
      }

      return _react2.default.createElement(_ToolbarButton2.default, { key: key, active: active, toggle: toggle, item: item });
    }
  }, {
    key: 'setBarPosition',
    value: function setBarPosition() {
      var editorWrapper = this.props.editorWrapper;
      var toolbar = this.refs.toolbar;
      var selectionCoords = (0, _selection.getSelectionCoords)(editorWrapper, toolbar);

      if (!selectionCoords) {
        return null;
      }

      if (selectionCoords && !this.state.position || this.state.position.bottom !== selectionCoords.offsetBottom || this.state.position.left !== selectionCoords.offsetLeft) {
        this.setState({
          position: {
            bottom: selectionCoords.offsetBottom,
            left: selectionCoords.offsetLeft
          }
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (!this.props.editorState.getSelection().isCollapsed()) {
        return this.setBarPosition();
      }
    }
  }, {
    key: 'renderToolList',
    value: function renderToolList() {
      return _react2.default.createElement(
        ToolbarList,
        { onMouseDown: function onMouseDown(e) {
            e.preventDefault();
          } },
        this.props.actions.map(this.renderButton)
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          position = _state.position,
          error = _state.error,
          editingEntity = _state.editingEntity;


      if (this.props.readOnly) {
        return null;
      }

      var showToolbar = true;
      if (this.props.editorState.getSelection().isCollapsed()) {
        showToolbar = false;
      }

      var toolbarStyle = { display: showToolbar ? 'block' : 'none' };
      if (position !== undefined) {
        toolbarStyle = Object.assign(position, toolbarStyle);
        toolbarStyle = _extends({}, toolbarStyle);
      }

      return _react2.default.createElement(
        ToolbarWrapper,
        { ref: 'toolbarWrapper', style: toolbarStyle, className: 'ld-toolbar-wrapper' },
        _react2.default.createElement(
          'div',
          { style: { position: 'absolute', bottom: '0' } },
          _react2.default.createElement(
            Toolbar,
            { ref: 'toolbar', error: error, className: 'ld-toolbar' },
            editingEntity === 'LINK' ? _react2.default.createElement(_LinkToolbar2.default, _extends({}, this.props, {
              setError: this.setError.bind(this),
              cancelError: this.cancelError.bind(this),
              cancelEntity: this.cancelEntity.bind(this),
              removeEntity: this.removeEntity.bind(this),
              entityType: this.state.editingEntity })) : this.renderToolList(),
            this.state.error && _react2.default.createElement(
              ToolbarError,
              { error: error, className: 'ld-toolbar-error' },
              this.state.error
            )
          )
        )
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;


var ToolbarWrapper = styled.div(_templateObject);

var Toolbar = styled.div(_templateObject2, function (props) {
  return props.error ? '#E83F26' : '#181818';
});

var ToolbarList = styled.ul(_templateObject3);

var ToolbarError = styled.p(_templateObject4, function (props) {
  return props.error ? '-8px 0 0 20px' : '0';
}, function (props) {
  return props.error ? '28px' : '0';
}, function (props) {
  return props.error ? '12px' : '0';
});