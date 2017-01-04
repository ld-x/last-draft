'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  font-family: Open Sans, sans-serif;\n  color: #181818;\n  font-size: 1.125rem;\n  letter-spacing: -0.037rem;\n  line-height: 1.75rem;\n  background: yellow;\n  height: 0;\n  position: relative;\n  z-index: 10;\n'], ['\n  font-family: Open Sans, sans-serif;\n  color: #181818;\n  font-size: 1.125rem;\n  letter-spacing: -0.037rem;\n  line-height: 1.75rem;\n  background: yellow;\n  height: 0;\n  position: relative;\n  z-index: 10;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  background: ', ';\n  border-radius: 4px;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);\n  left: -50%;\n  position: relative;\n  transition: background-color 0.2s ease-in-out;\n'], ['\n  background: ', ';\n  border-radius: 4px;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);\n  left: -50%;\n  position: relative;\n  transition: background-color 0.2s ease-in-out;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  padding: 0 8px;\n  margin: 0;\n  whiteSpace: nowrap;\n'], ['\n  padding: 0 8px;\n  margin: 0;\n  whiteSpace: nowrap;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  display: inline-block;\n  top: 100%;\n  left: 50%;\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointerEvents: none;\n  borderWidth: 8px;\n  borderStyle: solid;\n  borderColor: #181818 transparent transparent;\n  marginLeft: -8px;\n  transition: border-color 0.2s ease-in-out;\n'], ['\n  display: inline-block;\n  top: 100%;\n  left: 50%;\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointerEvents: none;\n  borderWidth: 8px;\n  borderStyle: solid;\n  borderColor: #181818 transparent transparent;\n  marginLeft: -8px;\n  transition: border-color 0.2s ease-in-out;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  margin: ', ';\n  height: ', ';\n  padding-bottom: ', ';\n  transition: height 0.2s ease-in-out;\n  color: #FFF;\n  font-size: 12px;\n  font-weight: bold;\n'], ['\n  margin: ', ';\n  height: ', ';\n  padding-bottom: ', ';\n  transition: height 0.2s ease-in-out;\n  color: #FFF;\n  font-size: 12px;\n  font-weight: bold;\n']);

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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    value: function toggleEntity(entity) {
      this.setState({ editingEntity: entity });
    }
  }, {
    key: 'cancelEntity',
    value: function cancelEntity() {
      var editor = this.props.editor;

      editor && editor.focus();
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
              toggle = function toggle() {
                return _this2.toggleEntity(entity);
              };
              active = (0, _entity.hasEntity)(entity, editorState);
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
      var editor = this.props.editor;
      var toolbar = this.refs.toolbar;
      var selectionCoords = (0, _selection.getSelectionCoords)(editor, toolbar);

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
          error = _state.error;


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
          { style: { position: 'absolute', bottom: 0 } },
          _react2.default.createElement(
            Toolbar,
            { ref: 'toolbar', error: error, className: 'ld-toolbar' },
            this.state.editingEntity ? _react2.default.createElement(_LinkToolbar2.default, _extends({}, this.props, {
              setError: this.setError.bind(this),
              cancelError: this.cancelError.bind(this),
              cancelEntity: this.cancelEntity.bind(this),
              entityType: this.state.editingEntity })) : this.renderToolList(),
            _react2.default.createElement(
              ToolbarError,
              { error: error, className: 'ld-toolbar-error' },
              this.state.error
            ),
            _react2.default.createElement(ToolbarArrow, { className: 'ld-toolbar-arrow' })
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

var ToolbarArrow = styled.span(_templateObject4);

var ToolbarError = styled.p(_templateObject5, function (props) {
  return props.error ? '-8px 0 0 20px' : '0';
}, function (props) {
  return props.error ? '28px' : '0';
}, function (props) {
  return props.error ? '12px' : '0';
});