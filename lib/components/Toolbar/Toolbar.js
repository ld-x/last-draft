'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  font-family: Open Sans, sans-serif;\n  color: ', ';\n  letter-spacing: -0.037rem;\n  line-height: 1.75rem;\n  height: 0;\n  position: relative;\n  z-index: 10;\n  transform: translateY(8px);\n'], ['\n  font-family: Open Sans, sans-serif;\n  color: ', ';\n  letter-spacing: -0.037rem;\n  line-height: 1.75rem;\n  height: 0;\n  position: relative;\n  z-index: 10;\n  transform: translateY(8px);\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  background: ', ';\n  box-shadow: 0 1px 18px 0 rgba(0, 0, 0, 0.3);\n  left: -50%;\n  position: relative;\n  transition: background-color 0.2s ease-in-out;\n'], ['\n  background: ', ';\n  box-shadow: 0 1px 18px 0 rgba(0, 0, 0, 0.3);\n  left: -50%;\n  position: relative;\n  transition: background-color 0.2s ease-in-out;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  padding: 4px 6px;\n  margin: 0;\n  whiteSpace: nowrap;\n'], ['\n  padding: 4px 6px;\n  margin: 0;\n  whiteSpace: nowrap;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  margin: ', ';\n  height: ', ';\n  padding-bottom: ', ';\n  transition: height 0.2s ease-in-out;\n  color: #FFF;\n  font-size: 12px !important;\n  font-weight: bold;\n'], ['\n  margin: ', ';\n  height: ', ';\n  padding-bottom: ', ';\n  transition: height 0.2s ease-in-out;\n  color: #FFF;\n  font-size: 12px !important;\n  font-weight: bold;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _draftJs = require('draft-js');

var _ToolbarButton = require('./ToolbarButton');

var _LinkToolbar = require('./LinkToolbar');

var _LinkToolbar2 = _interopRequireDefault(_LinkToolbar);

var _selection = require('../../utils/selection');

var _entity = require('../../utils/entity');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

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

var _default = function (_Component) {
  _inherits(_default, _Component);

  function _default(props) {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this, props));

    _this.state = {
      editingEntity: null,
      link: '',
      error: null,
      position: {},
      rangeLeft: 250
    };
    _this.renderButton = _this.renderButton.bind(_this);
    return _this;
  }

  _createClass(_default, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.setBarPosition();
    }
  }, {
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

    /* entity */

  }, {
    key: 'toggleEntity',
    value: function toggleEntity(entity, active) {
      this.setState({ editingEntity: entity });
    }
  }, {
    key: 'removeEntity',
    value: function removeEntity() {
      var selection = this.props.editorState.getSelection();
      if (!selection.isCollapsed()) {
        this.props.onChange(_draftJs.RichUtils.toggleLink(this.props.editorState, selection, null));
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

    /* plugin modal */

  }, {
    key: 'submitHtmlModal',
    value: function submitHtmlModal(html) {
      this.props.submitHtmlModal(html);
      this.closeModal();
    }
  }, {
    key: 'toggleModal',
    value: function toggleModal(modal) {
      this.setState({ modal: modal });
      this.setState({ showModal: !this.state.showModal });
    }
  }, {
    key: 'closeModal',
    value: function closeModal() {
      var editorWrapper = this.props.editorWrapper;

      editorWrapper && editorWrapper.focus();
      this.setState({ showModal: false });
    }
  }, {
    key: 'setBarPosition',
    value: function setBarPosition() {
      var editorWrapper = this.props.editorWrapper;
      var selectionCoords = (0, _selection.getSelectionCoords)(editorWrapper);
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
    key: 'openToolbar',
    value: function openToolbar() {
      //this.setState({ position: { bottom: this.state.position.bottom, left: 220 } })
      this.props.openToolbar();
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
        case 'plugin':
          {
            var _context;

            if (item.modal) {
              toggle = function toggle() {
                return _this2.toggleModal(item.modal);
              };
              break;
            }

            return _react2.default.createElement(_ToolbarButton.PluginButton, {
              uploadImageCallBack: this.props.uploadImageCallBack,
              uploadFile: this.props.uploadFile,
              editorState: this.props.editorState,
              onChange: (_context = this.props).onChange.bind(_context),
              key: key,
              item: item });
            break;
          }
      }

      return _react2.default.createElement(_ToolbarButton.ToolbarButton, { key: key, active: active, toggle: toggle, item: item });
    }
  }, {
    key: 'renderToolbar',
    value: function renderToolbar() {
      var _state = this.state,
          editingEntity = _state.editingEntity,
          showModal = _state.showModal;


      var toolbar = null;
      if (editingEntity === 'LINK') {
        toolbar = _react2.default.createElement(_LinkToolbar2.default, _extends({}, this.props, {
          setError: this.setError.bind(this),
          cancelError: this.cancelError.bind(this),
          cancelEntity: this.cancelEntity.bind(this),
          removeEntity: this.removeEntity.bind(this),
          entityType: this.state.editingEntity }));
      } else if (showModal) {
        var Modal = this.state.modal;
        toolbar = _react2.default.createElement(Modal, _extends({}, this.props, {
          closeModal: this.closeModal.bind(this),
          submitHtmlModal: this.submitHtmlModal.bind(this),
          rangeLeft: this.state.rangeLeft }));
      } else {
        toolbar = _react2.default.createElement(
          ToolbarList,
          { onMouseDown: function onMouseDown(e) {
              e.preventDefault();
            } },
          this.props.actions.map(this.renderButton)
        );
      }
      return toolbar;
    }
  }, {
    key: 'renderError',
    value: function renderError() {
      return _react2.default.createElement(
        ToolbarError,
        { error: this.state.error, className: 'ld-toolbar-error' },
        this.state.error
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          position = _state2.position,
          error = _state2.error,
          editingEntity = _state2.editingEntity;
      var theme = this.props.theme;


      if (this.props.readOnly) {
        return null;
      }

      var show = true;
      if (this.props.editorState.getSelection().isCollapsed()) {
        show = false;
      }

      if (this.props.showToolbar) {
        show = true;
      }

      var toolbarStyle = { display: show ? 'block' : 'none' };
      if (position !== undefined) {
        toolbarStyle = Object.assign(position, toolbarStyle);
        toolbarStyle = _extends({}, toolbarStyle);
      }

      return _react2.default.createElement(
        ToolbarWrapper,
        { theme: theme, ref: 'toolbarWrapper', style: toolbarStyle, className: 'ld-toolbar-wrapper' },
        _react2.default.createElement(
          'div',
          { style: { position: 'absolute', bottom: '0' } },
          _react2.default.createElement(
            Toolbar,
            { ref: 'toolbar', error: error, theme: theme, className: 'ld-toolbar' },
            this.renderToolbar(),
            this.state.error && this.renderError()
          )
        )
      );
    }
  }]);

  return _default;
}(_react.Component);

exports.default = _default;


var ToolbarWrapper = _styledComponents2.default.div(_templateObject, function (props) {
  return props.theme.color;
});

var Toolbar = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.error ? '#E83F26' : props.theme.backgroundColor;
});

var ToolbarList = _styledComponents2.default.ul(_templateObject3);

var ToolbarError = _styledComponents2.default.p(_templateObject4, function (props) {
  return props.error ? '-8px 0 0 20px' : '0';
}, function (props) {
  return props.error ? '28px' : '0';
}, function (props) {
  return props.error ? '12px' : '0';
});